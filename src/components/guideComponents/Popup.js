import React, { useState, useContext, useEffect, useCallback, useMemo, useRef } from 'react';
import 'assets/sass/Guide/Modal.scss';
import classNames from 'classnames';
import * as $ from 'jquery';

const Popup = ({children, isOpen, toggle=()=>{}, size, title, button1, button2, className}) => {
    
    const popupFrameRef = useRef(null);
    const popupRef = useRef(null);

    const closePopup = (button) => {
        if (button.onClick) button.onClick();
        $(popupRef.current).addClass('guide-popup-disappear').delay(450).promise().done(function() {
            $(popupRef.current).removeClass('guide-popup-disappear');
            toggle();
        })
    }

    return (
        <>
        {isOpen ? 
        <div ref={popupFrameRef} className={classNames('popup-frame')} onClick={(e)=>{e.stopPropagation()}}>
            <div ref={popupRef} className={classNames('guide-popup', size, className)}>
                {
                    title && <div className={classNames('header')}>{title}</div>
                }
                {/* <div className={classNames('header')}>
                    {title}
                </div> */}
                <div className={classNames('body')}>
                    {children}
                </div>
                <div className={classNames('footer')}>
                    {button2?
                    <>
                        <div className={classNames('footer-button', 'left', button1.color)} onClick={()=>{closePopup(button1)}}>{button1.name}</div>
                        <div className={classNames('footer-button', 'right', button2.color)} onClick={()=>{closePopup(button2)}}>{button2.name}</div>
                    </>
                    :
                    <div className={classNames('footer-button', button1.color)} onClick={()=>{closePopup(button1)}}>{button1.name}</div>
                    }
                </div>
            </div>
        </div>
        :
        null 
        }
        </>
    )
}

Popup.defaultProps = {
    isOpen: false,
    size: 'sm',
    // title: 'Title',
    button1: {name: 'button', onClick:()=>console.log("button1 is not defined"), color: "grey"}
}

export default Popup;