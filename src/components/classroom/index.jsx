import React, { useEffect, useState } from 'react';

import '@/assets/sass/Curriculum/TextbookSidebar.scss';
import '@/assets/sass/Classroom/NewClassroom.scss';
import ClassroomFooter from "@/components/classroom/ClassroomFooter";

import TextbookSidebar from '@/components/textbooks/TextbookSidebar';
import TextbookContentView from '@/components/textbooks/TextbookContentView';

import {useRecoilState, useRecoilValue} from "recoil";
import {stepIndexState, itemIndexState, serverTextbookOpenState, languageListState} from "@/utils/States";
import { JSONbookState, userState } from '@/utils/States';
import {useCurriculumCallback, useGetCourseListCallback, useLoginCallback} from "@/apis/apiCallbackes";
import ServerTextbookSidebar from "@/components/serverTextbook/ServerTextbookSidebar";
import useApi from "@/apis/useApi";
import {getLanguage} from "@/apis/apiServices";
import {KR_LANGUAGE_TO_ENG} from "@/utils/Utils";

const NewClassroom = () =>{
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [serverTextbookOpen, setServerTextbookOpen] = useRecoilState(serverTextbookOpenState);

    const [JSONBook, setJSONBook] = useRecoilState(JSONbookState);
    const [stepIndex, setStepIndex] = useRecoilState(stepIndexState);
    const [itemIndex, setItemIndex] = useRecoilState(itemIndexState);
    const [languageList, setLanguageList] = useRecoilState(languageListState);

    const user = useRecoilValue(userState);

    const login = useLoginCallback();
    const getCurriculum = useCurriculumCallback();
    const getCourseList = useGetCourseListCallback();
    const [languageLoading, languageResolved, getLanguageApi] = useApi(getLanguage, true);


    useEffect(() => {
        login({username: "admin1", password: "xhsltmzheld"})
    },[])

    useEffect(() => {
        getCurriculum();
        getCourseList();
        getLanguageApi()
            .then((res) => {
                let languageList = res;
                for (let i = 0; i < languageList.length; i++) {
                    languageList[i].name = KR_LANGUAGE_TO_ENG[languageList[i].name] ? KR_LANGUAGE_TO_ENG[languageList[i].name] : languageList[i].name;
                }
                setLanguageList(res);
            })
    }, [user?.token]);

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
        movePage(nowStepIndex, lastItemIndex + 1);
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

    const addProblem = (nowStepIndex, lastItemIndex, number) => {
        let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
        newJSONBook.textbook_contents[nowStepIndex].step_items.splice(lastItemIndex + 1, 0, {
            "title": "#"+number,
            "tags": [],
            "collapse": false,
            "components": []
        })

        setJSONBook(newJSONBook);
        movePage(nowStepIndex, lastItemIndex + 1);
    }

    return (
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
                addProblem={addProblem}
            />

            <ServerTextbookSidebar />

            <div className="classroom-textbook-header">
                <span onClick={()=>{setSidebarOpen(true)}} className="material-icons-outlined textbook-sidebar-toggle">open</span>
                <span onClick={()=>{setServerTextbookOpen(true)}} className="material-icons-outlined textbook-sidebar-toggle">open server</span>
            </div>

            {
                JSONBook.textbook_contents ? (
                    <div>
                        <ClassroomFooter JSONBook={JSONBook} />
                        <TextbookContentView
                            JSONLoading={false}
                            data={JSONBook.textbook_contents[stepIndex]?.step_items[itemIndex] ? JSONBook.textbook_contents[stepIndex].step_items[itemIndex] : null}
                        />
                    </div>
                ) : null
            }
        </div>
    )
}

export default NewClassroom
