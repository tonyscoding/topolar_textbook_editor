import React, {useEffect, useState} from 'react';
import {useRecoilState} from "recoil";
import {curriculumState, levelItemState} from "@/utils/States";
import {useGetJSONTextbookCallback, useGetTextbookListByLevelCallback} from "@/apis/apiCallbackes";

const headerItem = {
    "001": "모험가",
    "002": "개척가",
    "003": "숙련가",
}

const ServerTextbookBrowser = () => {
    const [curriculum, setCurriculum] = useRecoilState(curriculumState);
    const [levelItem, setLevelItem] = useRecoilState(levelItemState);

    const [selectedCourse, setSelectedCourse] = useState('002');
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [selectedLevel, setSelectedLevel] = useState();
    const [selectedJSONBookId, setSelectedJSONBookId] = useState(null);

    const getTextbookListByLevel = useGetTextbookListByLevelCallback();
    const getJSONTextbook = useGetJSONTextbookCallback();

    useEffect(() => {
        if (selectedLevel) {
            getTextbookListByLevel(selectedLanguage, selectedLevel);
        }
    }, [selectedLevel]);

    useEffect(() => {
        if (selectedJSONBookId) {
            getJSONTextbook(selectedJSONBookId);
        }
    }, [selectedJSONBookId]);


    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.headerItems}>
                {
                    Object.keys(curriculum).sort().map((item, index) => {
                        return (
                            <div
                                key={item.id}
                                style={selectedCourse === item ? styles.selected : null}
                                onClick={() => {
                                    setSelectedCourse(item);
                                    setSelectedLanguage(null);
                                    setSelectedLevel(null);
                                    setLevelItem({});
                                }}
                            >
                                {headerItem[item]}
                            </div>
                        )
                    })
                }
                </div>
            </div>

            {
                selectedCourse && selectedLanguage && levelItem ? (
                    <div>
                        <div>
                            <div>{levelItem.description}</div>
                            <div>
                                {
                                    levelItem.data ? (
                                        Object.keys(levelItem.data).map((item, index) => {
                                            return (
                                                <div>
                                                    {
                                                        levelItem.data[item].map((itemIndex, index) => {
                                                            return (
                                                                <div onClick={() => setSelectedJSONBookId(levelItem.data[item][index].id)}>
                                                                    {levelItem.data[item][index].name}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        })
                                    ) : null
                                }
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={styles.courseContainer}>
                        <div>
                        {
                            curriculum[selectedCourse] ?
                                Object.keys(curriculum[selectedCourse]).sort().map((level, index) => {
                                    return (
                                        <div key={level.id} style={styles.courseItem}>
                                            <div style={styles.courseText}>
                                                {curriculum[selectedCourse][level].name}
                                            </div>

                                            <div>
                                                {
                                                    Object.keys(curriculum[selectedCourse][level].content).map((textbook, index) => {
                                                        return (
                                                            <div key={textbook.id} style={styles.levelItem} onClick={() => {
                                                                setSelectedLanguage(level);
                                                                setSelectedLevel(textbook);
                                                            }}>
                                                                <div>lv. {textbook}</div>
                                                                <div style={styles.textbookText}>
                                                                    {curriculum[selectedCourse][level].content[textbook]}
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                }) : null
                        }
                        </div>
                    </div>
                )
            }

        </div>
    );
};

const styles = {
    container: {
        marginTop: '20%',
    },
    header: {
        display: 'flex',
        width: '100%',
        borderBottom: '1px solid #c9c9c9',
    },
    headerItems: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '40%',
        paddingBottom: '10px',
        marginLeft: '5%',
        cursor: 'pointer',
    },
    selected: {
        fontWeight: 'bold',
    },
    courseContainer: {
        display: 'flex',
        marginLeft: '5%',
        marginRight: '5%',
    },
    courseItem: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    courseText: {
        fontSize: '20px',
        fontWeight: 'bold',
    },
    levelItem: {
        display: 'flex',
        flexDirection: 'row'
    },
    levelHeader: {
        fontSize: '20px',
        fontWeight: 'bold',
    }
}

export default ServerTextbookBrowser;
