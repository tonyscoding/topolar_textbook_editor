import React, { useState } from 'react';

export const Field = (props) => {

    const [fieldinput, setFieldinput] = useState(false);
    const doubleClick = () => {
        setFieldinput(true);
    }

    const blurClick = () => {
        setFieldinput(false);
    }

    return (
      <div className="fieldfix">
        {
            fieldinput ?
            <textarea value = {props.value} onChange = {props.inputChange} onBlur = {blurClick} autoFocus rows="3" cols="40"/>
            :
            <div onDoubleClick = {doubleClick} className="fieldchange">
              {props.value === "" ? "입력하세요" : props.value}
            </div>
        }
        {props.children}
      </div>
    )
  }


export default Field;

