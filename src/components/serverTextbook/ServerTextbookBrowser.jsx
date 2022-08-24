import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from "recoil";
import {courseListState, curriculumState, levelItemState} from "@/utils/States";
import {useGetJSONTextbookCallback, useGetTextbookListByLevelCallback} from "@/apis/apiCallbackes";
import {confirmAlert} from "react-confirm-alert";
import TextbookUploadAlert from "@/components/serverTextbook/TextbookUploadAlert";

const headerItem = {
    "001": "모험가",
    "002": "개척가",
    "003": "숙련가",
}

const ServerTextbookBrowser = () => {
    const [curriculum, setCurriculum] = useRecoilState(curriculumState);
    const [levelItem, setLevelItem] = useRecoilState(levelItemState);
    const courseList = useRecoilValue(courseListState);

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
                    // 코스, 언어, 레벨이 선택되었을 때 레벨에 해당하는 교재 리스트를 보여준다.
                    <div>
                        <div>
                            <div>{levelItem.description}</div>
                            <div
                                style={{marginBottom: 20}}
                                onClick={() => {
                                    confirmAlert({
                                        customUI: ({ onClose }) => {
                                            return (
                                                <TextbookUploadAlert
                                                    onClose={onClose}
                                                    data={{
                                                        "language": selectedLanguage,
                                                        "level": selectedLevel,
                                                        "courseList": courseList
                                                    }}
                                                />
                                            );
                                        }
                                    })
                                }}
                            >
                                교재 리스트 +
                            </div>
                            <div>
                                {
                                    levelItem.data ? (
                                        Object.keys(levelItem.data).map((item, index) => {
                                            return (
                                                <div>
                                                    {
                                                        levelItem.data[item].map((itemIndex, index) => {
                                                            // 첫 아이템만 들여쓰기 없이 표시
                                                            if (index === 0) {
                                                                return (
                                                                    <div
                                                                        onClick={() => setSelectedJSONBookId(levelItem.data[item][index].id)}
                                                                        style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}
                                                                    >
                                                                        <div>
                                                                            {levelItem.data[item][index].name}
                                                                        </div>
                                                                        <div
                                                                            onClick={() => {

                                                                            }}
                                                                        >
                                                                            +
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }

                                                            // 나머지는 서브 교재 -> 들여쓰기 적용
                                                            else {
                                                                return (
                                                                    <div
                                                                        onClick={() => setSelectedJSONBookId(levelItem.data[item][index].id)}
                                                                        style={{marginLeft: 20}}
                                                                    >
                                                                        {levelItem.data[item][index].name}
                                                                    </div>
                                                                )
                                                            }
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
                    // 아닐 때에는 언어, 레벨을 선택할 수 있도록 해준다.
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
