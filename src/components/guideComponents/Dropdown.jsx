import React, { useState, useEffect, useCallback, useRef } from 'react';
import classNames from 'classnames';
import "@/assets/sass/Guide/Dropdown.scss";
import * as $ from 'jquery';

export const Option = ({children, value}) => {
    return (
        <button className="dropdown-button" value={value}>{children}</button>
    )
}

export const Dropdown = ({value, children ,onChange, className, style, placeholder, showLine, font, disabled}) => {
    const containerRef = useRef(null);
    const dropdownRef = useRef(null);
    const listRef = useRef(null);
    const arrowRef = useRef(null);
    const selectedRef = useRef(null);
    const [open, setOpen] = useState(false);

    const clickSurrounding = (e) => {
        if (e.target !== dropdownRef.current&&e.target !== arrowRef.current&&e.target !== containerRef.current&&e.target.tagName !== 'OPTION'&&e.target !== listRef.current) {
            setOpen(false)
            document.removeEventListener('click', clickSurrounding)
        }
    }

    useEffect(()=>{
        let dropdownDiv = dropdownRef.current;
        let selectedDiv = selectedRef.current;
        selectedDiv.style.width = (dropdownDiv.offsetWidth - 50) + "px";
        selectedDiv.style.height = Math.floor(parseInt(window.getComputedStyle(dropdownDiv).getPropertyValue("font-size")) * 1.3) + "px";
    },[])

    useEffect(() => {
        if (open) {
            //set click event for click outside dropdown
            document.addEventListener('click', clickSurrounding)
            //calculate height of the dropdown list
            let lineHeight = Math.floor(parseInt($(listRef.current).css("line-height")))  
            let linePadding = parseInt($(listRef.current).find(">:first-child").css("padding-bottom"))                   //12px
            let paddingTop = parseInt($(listRef.current).css("padding-top"))            //10px
            let border = parseInt($(listRef.current).css("border-width"))               //1px
            let ulHeight = lineHeight*showLine + linePadding*(showLine-1) + paddingTop*2 + border*2
            $('.dropdown-list').css('max-height', ulHeight+"px")
        }
    }, [open])

    const clickDropdown = () => {
        if (!disabled){
            if (open) document.removeEventListener('click', clickSurrounding);
            setOpen(!open)
        }
    }

    const onListSelected = (e) => {
        if (!e.target.value) return;
        let tempValue = {
            name: e.target.innerHTML,
            value: e.target.value
        }
        onChange(tempValue)
        setOpen(false)
        document.removeEventListener('click', clickSurrounding);
    }

    return (
        <div ref={containerRef} className={classNames('guide-dropdown-container', className, {disabled})} style={style}>
            
            <div ref={listRef} className={classNames("dropdown-list", font, open?'open':'')} onClick={(e)=>onListSelected(e)}>
                {children}
            </div>
            <div ref={dropdownRef} className={classNames('guide-dropdown', font)} onClick={()=>clickDropdown()}>
                <div ref={selectedRef}>{value?value.name:placeholder}</div>
                <div ref={arrowRef} className={classNames('arrow', 'material-icons')}>{open?'expand_less':'expand_more'}</div>
            </div>
        </div>
    )
}

Dropdown.defaultProps = {
    onChange: (value)=>console.log("onChange is not defined", value),
    placeholder: "선택",
    name: '테스트',
    font: 'body-1',
    showLine: 5,
}