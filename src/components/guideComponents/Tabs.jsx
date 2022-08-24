import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import '@/assets/sass/Guide/Tabs.scss';
import * as $ from 'jquery';

const Tabs = ({children, type, style, tabStyle, tabTextStyle, borderStyle='', setParentActiveTab, initIndex=0, font, vertical, tabColor, activeColor}) => {

    const [tabItem, setTabItem] = useState([]);
    const [activeTab, setActiveTab] = useState(initIndex);

    useEffect(() => {
        let tempArr = children.split(',')
        let tabArr = [];
        tempArr.forEach((item, index) => {
            tabArr.push({
                name: item,
                tabIndex: index
            })
            if (type==="text" && vertical && index < tempArr.length - 1) tabArr.push("vert")
        })
        setTabItem(tabArr)
    }, [])

    useEffect(() => {
        setActiveTab(initIndex)
    },[initIndex])
    
    useEffect(()=>{
        if (type === "box-slider"){
            let initialLeft;
            if (tabStyle&&tabStyle["width"]){
                initialLeft = 2 + activeTab*parseInt(tabStyle["width"]) + "px";
                $('.box-slider-box').css("left", initialLeft).css("width", tabStyle["width"]).css("height", tabStyle["height"])
            }
            else {
                initialLeft = 2 + activeTab*125 + "px";
                $('.box-slider-box').css("left", initialLeft)
            }
        }
    },[JSON.stringify(tabStyle)])

    useEffect(() => {
        if (type === "box-slider") {
            let leftStr;
            if (tabStyle&&tabStyle["width"]){
                leftStr = 2 + activeTab*parseInt(tabStyle["width"]) + "px";
            }
            else {
                leftStr = 2 + 125 * activeTab + "px";
            }
            $('.box-slider-box').animate({left: leftStr}, 100)
            
        }
    }, [activeTab])

    const clickArrow = (direction) => {
        if (direction === "left") {
            if (activeTab > 0) {
                setActiveTab(activeTab - 1);
                setParentActiveTab(activeTab - 1);
            }
        }
        if (direction === "right") {
            if (activeTab < tabItem.length - 1) {
                setActiveTab(activeTab + 1);
                setParentActiveTab(activeTab + 1);
            }
        }
    }

    return (
        <div className={classNames('guide-tabs-container-' + type, font)} style={style}>
            {type==="arrow"?
            <>
                <div className="arrow-left material-icons" onClick={()=>clickArrow("left")}>
                    chevron_left
                </div>
                <div className="arrow-text">{activeTab+1}/{tabItem.length}</div>
                <div className="arrow-right material-icons" onClick={()=>clickArrow("right")}>
                    chevron_right
                </div>
            </>
            :
            
            tabItem.map((tab, index) => {
                if (tab === 'vert'){
                    return (
                        <div key={'vert-'+index} className={classNames("tabs-vl")}></div>
                    )
                }
                return (
                    <div 
                        key={'tab-'+index}
                        id={'tab-'+index} 
                        className={classNames('guide-tabs', tabColor, activeTab===tab.tabIndex?'active '+activeColor:'', type)}
                        onClick={()=>{setActiveTab(tab.tabIndex);setParentActiveTab(tab.tabIndex)}}
                        style={tabStyle}
                    >
                        <div id={'tab-text-' + index} style={tabTextStyle} className={borderStyle}>{tab.name}</div>
                    </div>
                )
            })
            }
            {type==="box-slider"?
            <div className='box-slider-box'></div>:null}
            
        </div>
    )
}

Tabs.defaultProps = ({
    type: "line",
    setParentActiveTab: (index)=>console.log("setParentActiveTab is not defined", index),
    initIndex: 0,
    font: "subhead-2",
    activeColor: "",
    tabColor: "",
})

export default Tabs;

// usage example
{/* <GuideTab
    type="text"
    setParentActiveTab={setActiveTab}
    initIndex={1}
    vertical={true}
    font={"body-2"}
>
    텍스트 후기,영상 후기
</GuideTab> */}