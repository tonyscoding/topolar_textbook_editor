import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import '../assets/sass/Button.scss';
import classNames from 'classnames';

const Button = ({children, size, color, ref, fullWidth, fullHeight, autoHeight, style, className, displayNoneMobile, noRadius, hoverDisabled, outline, circled, active, noWrap, ...rest}) => {
    const buttonEl = ref
    return (
        <button {...rest} style={style} className={classNames('Button', size, color, className, {fullWidth}, {fullHeight}, {autoHeight}, {displayNoneMobile}, {circled}, {outline}, {noRadius}, {hoverDisabled}, {active}, {noWrap})}>
            {children}
        </button>
    )
}

Button.defaultProps = {
    size: 'medium',
    color: 'topolar',
    style: null,
    className: ""
}

export default React.memo(Button);