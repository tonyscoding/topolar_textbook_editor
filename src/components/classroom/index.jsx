import React, { useCallback, useEffect, useRef, useState, useMemo, useReducer } from 'react';

import '@/assets/sass/Curriculum/TextbookSidebar.scss';
import '@/assets/sass/Classroom/NewClassroom.scss';
import ClassroomFooter from "@/components/classroom/ClassroomFooter";

import TextbookSidebar from '@/components/textbooks/TextbookSidebar';
import TextbookContentView from '@/components/textbooks/TextbookContentView';

import { TextbookContext } from "@/contexts/TextbookContext";
import { ImageContext } from "@/contexts/ImageContext";

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
            step_title: newStepTitle,
            step_no: -1,
            step_items: []
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
            title: newItemTitle,
            tags: [],
            collapse: false,
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

                <ClassroomFooter />
                {
                    <TextbookContentView
                        JSONLoading={false}
                        data={JSONBook.textbook_contents[stepIndex].step_items[itemIndex]}
                    />
                }
            </div>
        </>
    )
}

export default NewClassroom
