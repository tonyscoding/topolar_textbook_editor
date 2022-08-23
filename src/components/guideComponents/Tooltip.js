import React, { useState, useContext, useEffect, useCallback, useMemo, useRef } from 'react';
import classNames from 'classnames';
import * as $ from 'jquery';
import { useSelector } from 'react-redux';
import 'assets/sass/Guide/Tooltip.scss';

const Tooltip = ({children, isOpen, color, placement, className, ...rest}) => {

    const tooltipContainerRef = useRef(null);
    const tooltipRef = useRef(null);
    const screenSize = useSelector(state => state.auth.screen_size)

    useEffect(()=>{
        // MUST set parent div relative in order to use position:absolute properly
        let parentDiv = $(tooltipContainerRef.current.parentNode);
        parentDiv.css({'position':'relative', 'display':'flex', 'width':'fit-content'})

        let tooltipContainerDiv = $(tooltipContainerRef.current);
        let tooltipDiv = $(tooltipRef.current)
        let tooltipWidth = tooltipDiv.width() + 2 * parseInt(tooltipDiv.css('padding-left'));
        let tooltipHeight = tooltipDiv.height() + 2 * parseInt(tooltipDiv.css('padding-top'));
        if (placement==='right') {
            let tooltipLeft = parentDiv.width() + 4
            tooltipContainerDiv.css({'left': tooltipLeft + 'px'})
        }
        else if (placement==='bottom'){
            let tooltipTop = parentDiv.height() + 4
            tooltipContainerDiv.css({'top': tooltipTop + 'px'})
        }
        else if (placement==='left') {
            let tooltipLeft = tooltipWidth + 4;
            tooltipContainerDiv.css({'left': "-"+tooltipLeft + 'px', 'width':tooltipWidth + 'px'})
        }
        else if (placement==='top') {
            let tooltipTop = tooltipHeight + 4;
            tooltipContainerDiv.css({'top': "-"+tooltipTop + 'px', 'height':tooltipHeight + 'px'})
        }

    },[screenSize, isOpen])
    
    return (
        <div ref={tooltipContainerRef} className={classNames('guide-tooltip-container', color, isOpen?'':'hide')}>
            <div ref={tooltipRef} className={classNames('guide-tooltip', placement, className)} {...rest}>
                {children}
            </div>
            <div className={classNames('guide-tooltip-arrow', placement)}>

            </div>
        </div>
    )
}

export default Tooltip;

Tooltip.defaultProps = {
    isOpen: true,
    color: "black",
    placement: "right"
}