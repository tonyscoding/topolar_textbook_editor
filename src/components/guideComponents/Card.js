import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import 'assets/sass/Guide/Card.scss';

export const Card = ({children, width, imgSrc, imgHover, onClick, style, mediaStyle, contentStyle, hoverType, hideLine, hideExtend}) => {

    const cardRef = useRef(null);
    const [hide, setHide] = useState(true);
    const [extend, setExtend] = useState(false);

    const toggleHide = (e) => {
        e.stopPropagation();
        setHide(!hide)
    }

    useEffect(()=>{
        const { current }  = cardRef;
        let myElement = current.querySelector(".check-line");
        if(!myElement) return;
        let divHeight = myElement.offsetHeight;
        let divLineHeight = Math.floor(parseInt(window.getComputedStyle(myElement).getPropertyValue('line-height')));

        if (divHeight&&divHeight/divLineHeight>hideLine) {
            setExtend(true)
        }
    },[])

    return (
        <div className={classNames("guide-card", hoverType, width)} style={style} onClick={onClick}>
            {imgSrc?
            <div className='card-media' style={mediaStyle}>
                <img src={imgSrc}/>
                {imgHover?
                <div className='card-media-hover'>
                </div>:null}
            </div>
            :
            null}
            <div ref={cardRef} className={classNames('card-content', !hideExtend&&extend?"extend":"", extend?hide?"hide"+hideLine: "show":null)} style={contentStyle}>
                {children}
            </div>
            {!hideExtend&&extend?
            <div className='card-show-more' onClick={(e)=>toggleHide(e)}>
                {hide?'더보기':'닫기'}
            </div>
            :null}
        </div>
    )
}

Card.defaultProps = {
    width: "guide-col6",
    hideLine: 2,
}

export const LineBreak = ({children, className, style}) => {

    return (
        <div id={'check-line'} className={classNames(className, 'check-line')} style={style}>
            {children}
        </div>

    )
}

// export default Card;

//width -> guide-col1 ~ guide-col12 (check ColWidth.scss)
//extend -> bool
//hideLine -> int between 1~9
//hoverType -> guide-border // shift