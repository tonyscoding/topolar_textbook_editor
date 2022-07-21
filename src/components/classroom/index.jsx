import React, { useCallback, useEffect, useRef, useState, useMemo, useReducer } from 'react';

import '@/assets/sass/Curriculum/TextbookSidebar.scss';
import '@/assets/sass/Classroom/NewClassroom.scss';
import ClassroomFooter from "@/components/classroom/ClassroomFooter";

import TextbookSidebar from '@/components/textbooks/TextbookSidebar';
import TextbookContentView from '@/components/textbooks/TextbookContentView';

import { saveTextbook, loadTextbook } from "@/helpers/electronFileSystem";

import tutorial from "@/textbook/Textbook_lv0_0_tutorial/Textbook_lv0_0_tutorial.json";

import {useRecoilState} from "recoil";
import { stepIndexState, itemIndexState } from "@/utils/States";

const NewClassroom = () =>{
    const [JSONBook, setJSONBook] = useState(tutorial);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [stepIndex, setStepIndex] = useRecoilState(stepIndexState);
    const [itemIndex, setItemIndex] = useRecoilState(itemIndexState);

    useEffect(() => {
        console.log(JSONBook.textbook_contents[stepIndex].step_items[itemIndex]);
    }, [stepIndex, itemIndex]);

    // 새로운 stepIndex와 itemIndex가 들어오면 화면 업데이트
    const movePage = (newStepIndex, newItemIndex) => {
        setStepIndex(newStepIndex);
        setItemIndex(newItemIndex);
    }

    const fitStepIndex = (newJSONBook) => {
        for (let i = 0; i < newJSONBook.textbook_contents.length; i++) {
            newJSONBook.textbook_contents[i].step_no = i + 1;
        }

        return newJSONBook;
    }

    // 필요한 것
    // 1. step 추가
    const addStep = (lastStepIndex, newStepTitle) => {
        let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
        newJSONBook.textbook_contents.splice(lastStepIndex + 1, 0, {
            "step_title": newStepTitle,
            "step_no": stepIndex,
            "step_items": []
        })

        newJSONBook = fitStepIndex(newJSONBook);
        setJSONBook(newJSONBook);
    }
    // 2. step 삭제
    const deleteStep = (deleteStepIndex) => {
        let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
        newJSONBook.textbook_contents.splice(deleteStepIndex, 1);

        newJSONBook = fitStepIndex(newJSONBook);
        setJSONBook(newJSONBook);
    }
    // 3. step 이름 변경
    const changeStepTitle = (changeStepIndex, newStepTitle) => {
        let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
        newJSONBook.textbook_contents[changeStepIndex].step_title = newStepTitle;

        newJSONBook = fitStepIndex(newJSONBook);
        setJSONBook(newJSONBook);
    }
    // 4. item 추가
    const addItem = (nowStepIndex, lastItemIndex, newItemTitle) => {
        let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
        newJSONBook.textbook_contents[nowStepIndex].step_items.splice(lastItemIndex + 1, 0, {
            "title": newItemTitle,
            "tags": [],
            "collapse": false,
            "components": []
        })

        setJSONBook(newJSONBook);
    }
    // 5. item 삭제
    const deleteItem = (nowStepIndex, deleteItemIndex) => {
        let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
        newJSONBook.textbook_contents[nowStepIndex].step_items.splice(deleteItemIndex, 1);
        setJSONBook(newJSONBook);
    }
    // 6. item 이름 변경
    const changeItemTitle = (nowStepIndex, changeItemIndex, newItemTitle) => {
        let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
        newJSONBook.textbook_contents[nowStepIndex].step_items[changeItemIndex].title = newItemTitle;
        setJSONBook(newJSONBook);
    }
    // 7. desc 추가
    const addDesc = (nowStepIndex, nowItemIndex, index, newDesc, cardIndex=null) => {
        let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
        const content = {
            "type": "desc",
            "description": newDesc
        }
        console.log("add", nowStepIndex, nowItemIndex, index, cardIndex)
        if(cardIndex == null) {
            newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components.splice(index, 0, content);
        } else {
            newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components[index].components.splice(cardIndex, 0, content);
        }
        
        setJSONBook(newJSONBook);
    }
    // 8. desc 수정
    const changeDesc = (nowStepIndex, nowItemIndex, index, newDesc, cardIndex=null) => {
        let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
        
        if(cardIndex == null) {
            newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components[index].description = newDesc;
        } else {
            newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components[index].components[cardIndex].description = newDesc;
        }

        setJSONBook(newJSONBook);
    }
    // 9. code 추가
    const addCode = (nowStepIndex, nowItemIndex, index, newCode, language, cardIndex=null) => {
        let newJSONBook = JSON.parse(JSON.stringify(JSONBook));

        const content = {
            "type": "code",
            "code": "~~~" + language + " \n" + newCode + "\n ~~~"
        }

        console.log("add", nowStepIndex, nowItemIndex, index, cardIndex)
        if(cardIndex == null) {
            newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components.splice(index, 0, content);
        } else {
            newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components[index].components.splice(cardIndex, 0, content);
        }

        setJSONBook(newJSONBook);
    }
    // 10. code 수정(미완성)
    const changeCode = (nowStepIndex, nowItemIndex, changeCodeIndex, newCode) => {
        let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
        newJSONBook.textbook_contents[nowStepIndex].step_items[nowItemIndex][changeCodeIndex] = newCode;
        setJSONBook(newJSONBook);
    }
    // 11. content 삭제
    const deleteJSONBookItem = (nowStepIndex, nowItemIndex, deleteIndex, cardIndex=null) => {
        let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
        console.log("delete", nowStepIndex, nowItemIndex, deleteIndex, cardIndex)
        if(cardIndex==null) {
            newJSONBook.textbook_contents[nowStepIndex].step_items[nowItemIndex].components.splice(deleteIndex, 1);
        } else {
            newJSONBook.textbook_contents[nowStepIndex].step_items[nowItemIndex].components[deleteIndex].components.splice(cardIndex, 1);
        }
        
        setJSONBook(newJSONBook);
    }
    // 12.single_card 추가
    const addSingleCard = (nowStepIndex, nowItemIndex, index) => {
        let newJSONBook = JSON.parse(JSON.stringify(JSONBook));

        newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components.splice(index, 0, {
            "type": "single_card",
            "title" : "제목",
            "components": [
                {
                    "type": "desc",
                    "description": "수정하세요"
                }
            ]
        })
        setJSONBook(newJSONBook);
    }

    // 13.double_card 추가
    const addDoubleCard = (nowStepIndex, nowItemIndex, index) => {
        let newJSONBook = JSON.parse(JSON.stringify(JSONBook));

        newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components.splice(index, 0, {
            "type": "double_card",
            "first_components": [
                {
                    "type": "desc",
                    "description": "수정하세요"
                }
            ],
            "second_components": [
                {
                    "type": "desc",
                    "description": "수정하세요"
                }
            ]
        })
        setJSONBook(newJSONBook);
    }

    // 14. cardtitle 수정
    const changeCardTitle = (nowStepIndex, nowItemIndex, index, newDesc) => {
        let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
        newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components[index].title = newDesc;
        setJSONBook(newJSONBook);
    }

    return (
        <>
            <div className="new-classroom fit-app">
                <TextbookSidebar
                    toggleSidebar={setSidebarOpen}
                    textbookOnClickCallback={null}
                    isOpen={sidebarOpen}
                    JSONBook={JSONBook}
                    setJSONBook={setJSONBook}
                    movePage={movePage}
                    addStep={addStep}
                    deleteStep={deleteStep}
                    changeStepTitle={changeStepTitle}
                    addItem={addItem}
                    deleteItem={deleteItem}
                    changeItemTitle={changeItemTitle}
                />

                <div className="classroom-textbook-header">
                    <span onClick={()=>{setSidebarOpen(true)}} className="material-icons-outlined textbook-sidebar-toggle">open</span>
                </div>

                <ClassroomFooter JSONBook={JSONBook} />
                {
                    <TextbookContentView
                        JSONLoading={false}
                        data={JSONBook.textbook_contents[stepIndex]?.step_items[itemIndex] ? JSONBook.textbook_contents[stepIndex].step_items[itemIndex] : null}
                        addDesc={addDesc}
                        changeDesc={changeDesc}
                        addCode={addCode}
                        addSingleCard={addSingleCard}
                        changeCode={changeCode}
                        deleteJSONBookItem={deleteJSONBookItem}
                        changeCardTitle={changeCardTitle}
                    />
                }
            </div>
        </>
    )
}

export default NewClassroom
