import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import 'assets/sass/Guide/SelectionControl.scss';

const Checkbox = ({children, onClick, color, size, checked}) => {
    return (
        <div className={"checkbox-container-" + size} onClick={onClick}>
            {children?
            <div className='checkbox-text' style={{color: "var(--" + color +")"}}>{children}</div>
            :null}
            <input type="checkbox" onChange={onClick} checked={checked}/>
            <label className={classNames('checkbox-label')}>
                <div className="checkbox-label-inner"></div>
            </label>
        </div>
    )
}

Checkbox.defaultProps = ({
    onClick: (name, value) => console.log("checkbox click is not defined", name, value),
    size: 'large',
    color: "grey90"
})

export default Checkbox;