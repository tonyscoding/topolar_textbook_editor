import React, { useState, useContext, useEffect, useCallback, useMemo, useRef } from 'react';
import 'assets/sass/Guide/Modal.scss';
import classNames from 'classnames';
import * as $ from 'jquery';
import { useSelector } from 'react-redux';

// const Modal = ({children, isOpen, size='sm', title, toggle}) => {

//     const escKeyDown = (e) => {
//         if(e.key==="Escape") {
//             toggle();
//         }
//     }

//     useEffect(() => {
//         document.addEventListener('keydown', escKeyDown)
//         return () => {
//             document.removeEventListener('keydown', escKeyDown)
//         }
//     },[])

const Modal = ({children, isOpen, size, title, toggle, centered=false, childOnly, maxHeight}) => {

    const modalFrameRef = useRef(null);
    const modalRef = useRef(null);

    const screenSize = useSelector(state => state.auth.screen_size);

    const closeModal = () => {
        $(modalRef.current).addClass('guide-modal-disappear').delay(450).promise().done(function() {
            toggle();
            $(modalRef.current).removeClass('guide-modal-disappear');
            $('.modal-frame').trigger("focus");
        })
    }

    const toggleModalByClick = useCallback(event => {
        if(event.target === modalFrameRef.current && isOpen) {
            closeModal();
            document.removeEventListener("click", toggleModalByClick, false);
            document.removeEventListener('keydown', toggleModalByEsc, false);
        }
    })

    const toggleModalByEsc = useCallback((event) => {
        if (event.key === "Escape"&&modalFrameRef.current.contains(document.activeElement)) {
            closeModal();
            document.removeEventListener("click", toggleModalByClick, false);
            document.removeEventListener('keydown', toggleModalByEsc, false);
        }
    })

    useEffect(() => {
        if(isOpen) {
            modalFrameRef.current.focus();
            document.addEventListener("click", toggleModalByClick, false);
            document.addEventListener('keydown', toggleModalByEsc, false);
        }
    }, [isOpen])

    useEffect(()=>{
        return ()=>{
            document.removeEventListener("click", toggleModalByClick, false);
            document.removeEventListener("keydown", toggleModalByEsc, false);
        }
    },[])

    
    return (
        <>
        {isOpen ? 
        <div tabIndex="-1" ref={modalFrameRef} className={classNames('modal-frame')}>
            <div ref={modalRef} className={classNames('guide-modal', size, {childOnly}, {maxHeight})}>
                <div className={classNames('header')}>
                    {centered ? <div style={{opacity: '0', width: '24px'}}>.</div> : null} 
                    <div className={classNames("title",{centered})}>{title}</div>
                    <div className="material-icons" style={screenSize==='desktop'?{fontSize:"36px"}:{fontSize:"24px"}} onClick={closeModal}>close</div>
                </div>
                <div className={classNames('body')}>
                    {children}
                </div>
            </div>
        </div>
        :
        null 
        }
        </>
    )
}

Modal.defaultProps = {
    isOpen: false,
    size: 'sm',
    title: 'Title',
    toggle: ()=>{console.log("button1 is not defined")}
}

export default Modal;