import React, {useEffect, useRef, useState} from 'react';
import "@/assets/css/PDFViewer.css";

import {useRecoilState} from "recoil";
import { stepIndexState, itemIndexState, pageIndicatorState } from "@/utils/States";

const ClassroomFooter = (JSONBook) => {
    const [stepIndex, setStepIndex] = useRecoilState(stepIndexState);
    const [itemIndex, setItemIndex] = useRecoilState(itemIndexState);
    const [pageIndicator, setPageIndicator] = useRecoilState(pageIndicatorState);

    const [maxIndex, setMaxIndex] = useState(0);

    useEffect(() => {
        let tempMaxIndex = 0;
        console.log(JSONBook.JSONBook);
        for (let i = 0; i < JSONBook.JSONBook.textbook_contents.length; i++) {
            for (let j = 0; j < JSONBook.JSONBook.textbook_contents[i].step_items.length; j++) {
                if (i === stepIndex && j === itemIndex) {
                    setPageIndicator(tempMaxIndex);
                }
                tempMaxIndex++;
            }
        }
        setMaxIndex(tempMaxIndex);
    }, [stepIndex, itemIndex, JSONBook]);

    const movePageByIndicator = (newPageIndicator) => {
        let tempPageIndicator = 0;
        for (let i = 0; i < JSONBook.JSONBook.textbook_contents.length; i++) {
            for (let j = 0; j < JSONBook.JSONBook.textbook_contents[i].step_items.length; j++) {
                if (tempPageIndicator === newPageIndicator) {
                    setStepIndex(i);
                    setItemIndex(j);
                    setPageIndicator(tempPageIndicator);
                    return;
                }
                tempPageIndicator++;
            }
        }
    }

    const progressBarRef = useRef(null);

    useEffect(()=>{
        progressBarRef.current.style.width="0%";
    },[]);

    useEffect(()=>{
        if(progressBarRef){
            let progress = ((pageIndicator+1) / maxIndex) * 100;
            progressBarRef.current.style.width= Math.round(progress) + "%";
        }
    },[pageIndicator, maxIndex]);

    return(
        <div className="classroom-footer">
            <div className="progress-bar-container">
                <div className="progress-bar" ref={progressBarRef}/>
            </div>
            <div className="nav-bar">
                <div className={"prev-button" + (pageIndicator===0? " disabled" : "")} onClick={()=>{movePageByIndicator(pageIndicator-1)}}>이전</div>
                <div className="offset-container">{maxIndex? ((pageIndicator + 1) + '/' + maxIndex) : null}</div>
                <div className={"next-button" + (pageIndicator===maxIndex-1? " disabled" : "")} onClick={()=>{movePageByIndicator(pageIndicator+1)}}>다음</div>
            </div>
        </div>
    )

};

export default ClassroomFooter;
