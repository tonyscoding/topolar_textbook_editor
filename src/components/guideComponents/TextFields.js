import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import 'assets/sass/Guide/TextFields.scss';

export const Input = ({className, onChange, name, value, search, onClick, checkValid, validMsg, disabled, font, style, inputStyle, viewPasswordIcon, togglePassword, ...rest}) => {
    const [inputValue, setInputValue] = useState(value);
    
    const onChangeInput = (e) => {
        setInputValue(e.target.value)
        onChange(e)
    }

    useEffect(()=>{
        if (value !== inputValue) {
            setInputValue(value)
        }
    },[value])

    const onClickSearch = () => {
        onClick(inputValue);
    }

    return (
        <div className={classNames('guide-input-container', className)} style={style}>
            <div>
                {search?
                <div className={classNames('material-icons', 'search-button', {disabled})} style={{fontSize:"18px"}} onClick={!disabled?onClickSearch:null}>
                    search
                </div>:null}
                {
                    (viewPasswordIcon!==undefined) ? 
                    <div className={`${viewPasswordIcon ? 'viewPasswordIcon off' : 'viewPasswordIcon'}`} onClick={togglePassword}></div>
                    :
                    null
                }
                <input
                    className={classNames('guide-input', font, checkValid&&value?"valid":checkValid===false&&value?"invalid":"", !value?"no-value":"")}
                    onChange={onChangeInput}
                    name={name}
                    value={value?value:value===0?0:''}
                    disabled={disabled}
                    style={inputStyle}
                    {...rest}
                />
            </div>
            {checkValid && value?
            <div className="valid-msg">
                <div className="material-icons-outlined" style={{fontSize:"18px"}}>check_circle</div>
                {validMsg[checkValid]}
            </div>
            :checkValid===false && value?
            <div className="invalid-msg">
                <div className='material-icons-outlined' style={{fontSize:"18px"}}>error_outline</div>
                {validMsg[checkValid]}
            </div>
            :null}
        </div>
    )
}

Input.defaultProps = {
    font: "body-2-fix",
    value: "",
    validMsg: {true: '성공 내용 기재', false: '오류 원인 기재'},
    onChange: (e)=>console.log("")
}

export const Textarea = ({className, onChange, maxLength, autoResize, ...rest}) =>{

    const textareaRef = useRef(null);

    const [count, setCount] = useState(0);
    
    useEffect(()=>{
        if (rest.value) {
            let valueStr = rest.value.toString()
            setCount(valueStr.length)
        }
    },[])

    const onTextareaChange = (e) => {
        const {value} = e.target;
        setCount(value.length)
        onChange(e)

        if (autoResize) {
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 2 + "px"
        }
    }

    return (
        <div className={classNames('guide-textarea-container')}>
            <textarea
                ref={textareaRef}
                className={classNames("textarea", className)}
                {...rest}
                maxLength={maxLength}
                onChange={(e)=>onTextareaChange(e)}
            />
            <div className='text-count'>{count}/{maxLength}</div>
        </div>
    )
}

Textarea.defaultProps = {
    maxLength: 500,
    autoResize: false,
    onChange: (e)=>console.log("")
}