import React, {useEffect, useRef} from 'react';
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

    useEffect(() => {
        console.log(selectedCourse);
        console.log(selectedLanguage);
        console.log(selectedLevel);
    }, [selectedCourse, selectedLanguage, selectedLevel]);

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
        <div>
            <div>{levelItem.description}</div>
            <div
                style={{marginBottom: 20}}
                onClick={() => alert()}
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
    );
};

export default Level;
