import React, { useEffect, useRef } from 'react';
import "@/assets/css/PDFViewer.css";

const ClassroomFooter = ({maxIndex, stepIndicator, setStepIndicator}) => {
    const progressBarRef = useRef(null);
    
    const handleIndicator = (index)=>{
        if (index >=0 && index < maxIndex){
            setStepIndicator(index);
        }
    }

    useEffect(()=>{
        progressBarRef.current.style.width="0%";
    },[]);

    useEffect(()=>{
        if(progressBarRef){
            let progress = ((stepIndicator+1) / maxIndex) * 100;
            progressBarRef.current.style.width= Math.round(progress) + "%";
        }
    },[stepIndicator, maxIndex]);
    
    return(
        <div className="classroom-footer">
            <div className="progress-bar-container">
                <div className="progress-bar" ref={progressBarRef}/>
            </div>
            <div className="nav-bar">
                <div className={"prev-button" + (stepIndicator===0? " disabled" : "")} onClick={()=>{handleIndicator(stepIndicator-1)}}>이전</div>
                <div className="offset-container">{maxIndex? ((stepIndicator + 1) + '/' + maxIndex) : null}</div>
                <div className={"next-button" + (stepIndicator===maxIndex-1? " disabled" : "")} onClick={()=>{handleIndicator(stepIndicator+1)}}>다음</div>
            </div>
        </div>
    )
    
};

export default ClassroomFooter;
