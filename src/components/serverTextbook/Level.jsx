import React, {useEffect, useRef, useState} from 'react';
import { confirmAlert } from "react-confirm-alert";
import TextbookUploadAlert from "@/components/serverTextbook/TextbookUploadAlert";
import { useRecoilValue } from "recoil";
import { courseListState, levelItemState } from "@/utils/States";
import {
    useDeleteTextbookCallback,
    useGetTextbookListByLevelCallback,
    useUploadTextbookCallback
} from "@/apis/apiCallbackes";
import {FiMinus, FiPlus, FiRefreshCw} from "react-icons/all";
import CustomAlert from "@/components/textbooks/CustomAlert";
import {Tooltip} from "@nextui-org/react";

const TextbookToolTip = ({textbook}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 80}}>
            <div>아이디</div>
            <div>{textbook.id}</div>
        </div>
    )
}

const Level = ({
    selectedCourse,
    selectedLanguage,
    selectedLevel,
    setSelectedJSONBookId,
}) => {
    const uploadTextbook =  useUploadTextbookCallback();
    const deleteTextbook = useDeleteTextbookCallback();
    const getTextbookListByLevel = useGetTextbookListByLevelCallback();


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
            if (courseList[item].id == selectedLanguage) {
                setNowLanguage(courseList[item].language_code);
                break;
            }
        }
    }, []);

    /**
     * @description 교재 업로드 함수
     * @param {string, number} order
     */
    const uploadAlert = (order) => {
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
                            })
                                .then(() => {
                                    setTimeout(() => {
                                        getTextbookListByLevel(selectedLanguage, selectedLevel);
                                    }, 7000);
                                })
                        }}
                        orderRef={orderRef}
                        titleRef={titleRef}
                    />
                );
            }
        })
    }

    const deleteAlert = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <CustomAlert
                        message={"정말로 삭제하시겠습니까?"}
                        onClose={onClose}
                        onConfirm={() => {
                            deleteTextbook(id)
                                .then(() => {
                                    getTextbookListByLevel(selectedLanguage, selectedLevel);
                                });
                        }}
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
            >
                <div
                    style={{cursor: 'pointer'}}
                    onClick={() => uploadAlert()}
                >
                    교재 리스트
                    <FiPlus size={20} style={{marginLeft: 10}} />
                </div>

                <div
                    style={{cursor: 'pointer'}}
                    onClick={() => {
                        getTextbookListByLevel(selectedLanguage, selectedLevel);
                    }}
                >
                    <FiRefreshCw size={20} />
                </div>
            </div>
            <div>
                {
                    levelItem.data ? (
                        Object.keys(levelItem.data).map((item, index) => {
                            return (
                                <div
                                    key={item.id}
                                    style={{...styles.textbookListContainer, backgroundColor: languageColor[nowLanguage]?.backgroundColor ? languageColor[nowLanguage].backgroundColor : "#d3d3d3"}}
                                >
                                    {
                                        levelItem.data[item].map((itemIndex, index) => {
                                            // 첫 아이템만 들여쓰기 없이 표시
                                            if (index === 0) {
                                                return (
                                                    <div
                                                        key={itemIndex.id}
                                                        style={styles.textbookListItem}
                                                    >
                                                        <div
                                                            style={styles.textbookListItemInfo}
                                                            onClick={() => setSelectedJSONBookId(levelItem.data[item][index].id)}
                                                        >
                                                            <div style={{...styles.textbookListItemIndex, backgroundColor: languageColor[nowLanguage]?.indexColor ? languageColor[nowLanguage].indexColor : "#252525"}}>
                                                                {item.padStart(2, '0')}
                                                            </div>
                                                            <Tooltip
                                                                content={<TextbookToolTip textbook={itemIndex} />}
                                                                placement={"right"}
                                                                shadow={false}
                                                            >
                                                                <div style={{cursor: 'pointer'}}>
                                                                    {levelItem.data[item][index].name}
                                                                </div>
                                                            </Tooltip>
                                                        </div>
                                                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                                            <div
                                                                onClick={() => {
                                                                    deleteAlert(levelItem.data[item][index].id);
                                                                }}
                                                            >
                                                                <FiMinus size={20} color={"red"} style={{marginRight: 10}} />
                                                            </div>
                                                            <div
                                                                onClick={() => {
                                                                    uploadAlert(item);
                                                                }}
                                                            >
                                                                <FiPlus size={20} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                            // 나머지는 서브 교재 -> 들여쓰기 적용
                                            else {
                                                return (
                                                    <div
                                                        style={{...styles.textbookListItem, width: '80%', marginLeft: '8%'}}
                                                        key={itemIndex.id}
                                                        onClick={() => setSelectedJSONBookId(levelItem.data[item][index].id)}
                                                    >
                                                        <Tooltip
                                                            content={<TextbookToolTip textbook={itemIndex} />}
                                                            placement={"right"}
                                                            shadow={false}
                                                        >
                                                            <div style={{cursor: 'pointer'}}>
                                                            {levelItem.data[item][index].name}
                                                            </div>
                                                        </Tooltip>
                                                        <div
                                                            onClick={() => {
                                                                deleteAlert(levelItem.data[item][index].id);
                                                            }}
                                                        >
                                                            <FiMinus size={20} color={"red"} style={{marginRight: 18}} />
                                                        </div>
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
        marginTop: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textbookList: {
        marginTop: 40,
        fontSize: 16,
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
