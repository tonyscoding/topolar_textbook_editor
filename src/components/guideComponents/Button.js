import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import "assets/sass/Guide/Button.scss";

const Button = ({children, size, type, color, style, className, block, active, ...rest}) => {
    
    return (
        <button {...rest} style={style} className={classNames('guide-button', size, color, type, className, {block}, {active})}>
            {children}
        </button>
    )
}

Button.defaultProps = {
    size: 'large',
    color: 'topolar-blue',
    type: "fill",
    style: null,
    className: ""
}

export default Button;

// usage example
{/* <Button
    size='large'
    color='topolar-blue'
    type='fill'
    block
>
    {children}
</Button> */}