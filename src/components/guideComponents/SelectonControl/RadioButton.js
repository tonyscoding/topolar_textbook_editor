import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import 'assets/sass/Guide/SelectionControl.scss';

const RadioButton = ({children, name, value, onClick, color, size, checked, ...rest}) => {

    useEffect(() => {
        if (!name || !value){
            console.log("invalid name / value!")
        }
    }, [])

    if (!name||!value){
        return (
            <div>invalid name/value</div>
        )
    }
    return (
        <div className={"radio-container-" + size} onClick={(e)=>{onClick(e, name, value);e.stopPropagation()}}>
            {children?
            <div className='radio-text' style={{color: "var(--" + color +")"}}>{children}</div>
            :null}
            <input type="radio" name={name} value={value} onChange={(e)=>{onClick(e, name, value);e.stopPropagation()}} id={value} checked={checked} {...rest}/>
            <label className={classNames('radio-label')}>
                <div className="radio-label-inner"></div>
            </label>
        </div>
    )
}

RadioButton.defaultProps = ({
    onClick: (e, name, value) => console.log("radio click is not defined", name, value),
    size: 'large',
    color: "grey90"
})

export default RadioButton;