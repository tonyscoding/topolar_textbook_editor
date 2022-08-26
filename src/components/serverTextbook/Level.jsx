import React, {useEffect, useRef, useState} from 'react';
import { confirmAlert } from "react-confirm-alert";
import TextbookUploadAlert from "@/components/serverTextbook/TextbookUploadAlert";
import { useRecoilValue } from "recoil";
import { courseListState, levelItemState } from "@/utils/States";
import {useUploadTextbookCallback} from "@/apis/apiCallbackes";

const Level = ({
    selectedCourse,
    selectedLanguage,
    selectedLevel,
    setSelectedJSONBookId,
}) => {
    const uploadTextbook =  useUploadTextbookCallback();

    const levelItem = useRecoilValue(levelItemState);
    const courseList = useRecoilValue(courseListState);

    const orderRef = useRef();
    const titleRef = useRef();

    const [nowLanguage, setNowLanguage] = useState('001');

    const languageColor = {
        "001": {
            'indexColor': '#F2961D',
            'backgroundColor': '#FFFCF2',
        },
        "002": {
            'indexColor': '#6548E5',
            'backgroundColor': '#F6F2FF',
        },
        "003": {
            'indexColor': '#2DCC5C',
            'backgroundColor': '#F2FFF3',
        },
        "005": {
            'indexColor': '#006CE8',
            'backgroundColor': '#EEF8FF',
        },
        "006": {
            'indexColor': '#E9C200',
            'backgroundColor': '#FFFEF2',
        },
        "007": {
            'indexColor': '#006CE8',
            'backgroundColor': '#EEF8FF',
        }
    }

    useEffect(() => {
        for (const item in courseList) {
            console.log(courseList[item].id, selectedLanguage);
            if (courseList[item].id == selectedLanguage) {
                console.log("!", courseList[item].language_code)
                setNowLanguage(courseList[item].language_code);
                break;
            }
        }
    }, []);

    const alert = (order) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <TextbookUploadAlert
                        onClose={onClose}
                        data={{
                            "language": selectedLanguage,
                            "level": selectedLevel,
                            "order": order,
                            "courseList": courseList
                        }}
                        upload={() => {
                            uploadTextbook({
                                name: titleRef.current.value,
                                level: selectedLevel,
                                course: selectedLanguage,
                                language_code: selectedCourse,
                                language: 2,
                                order_num: orderRef.current.value,
                            });
                        }}
                        orderRef={orderRef}
                        titleRef={titleRef}
                    />
                );
            }
        })
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>{levelItem.description}</div>
            <div
                style={styles.textbookList}
                onClick={() => alert()}
            >
                교재 리스트 +
            </div>
            <div>
                {
                    levelItem.data ? (
                        Object.keys(levelItem.data).map((item, index) => {
                            return (
                                <div style={{...styles.textbookListContainer, backgroundColor: languageColor[nowLanguage]?.backgroundColor ? languageColor[nowLanguage].backgroundColor : "#d3d3d3"}}>
                                    {
                                        levelItem.data[item].map((itemIndex, index) => {
                                            // 첫 아이템만 들여쓰기 없이 표시
                                            if (index === 0) {
                                                return (
                                                    <div
                                                        onClick={() => setSelectedJSONBookId(levelItem.data[item][index].id)}
                                                        style={styles.textbookListItem}
                                                    >
                                                        <div style={styles.textbookListItemInfo}>
                                                            <div style={{...styles.textbookListItemIndex, backgroundColor: languageColor[nowLanguage]?.indexColor ? languageColor[nowLanguage].indexColor : "#252525"}}>
                                                                {item.padStart(2,'0')}
                                                            </div>
                                                            <div>
                                                                {levelItem.data[item][index].name}
                                                            </div>
                                                        </div>
                                                        <div
                                                            onClick={() => {
                                                                alert(item);
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
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '5%',
        marginRight: '5%',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textbookList: {
        marginTop: 40,
        fontSize: 16,
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    textbookListContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10,
        width: '100%',
        height: 'auto',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
    },
    textbookListItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
    },
    textbookListItemInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textbookListItemIndex: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        color: 'white',
        borderRadius: 7,
        marginRight: 10,
        fontWeight: 600,
    }
};

export default Level;
