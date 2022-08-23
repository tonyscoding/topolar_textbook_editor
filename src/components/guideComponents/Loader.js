import React from 'react';
import classNames from 'classnames';
import 'assets/sass/Guide/Loader.scss';

const Loader = ({style, className, type, color}) => {

    return (
        <div className={classNames('guide-loader-container', className, color, type)} style={style}>
            <div className={classNames("material-icons")} style={{fontSize:"18px"}}>fiber_manual_record</div>
            <div className={classNames("material-icons")} style={{fontSize:"18px"}}>fiber_manual_record</div>
            <div className={classNames("material-icons")} style={{fontSize:"18px"}}>fiber_manual_record</div>
        </div>
    )
}

export default Loader;

Loader.defaultProps = {
    type: 'bounce',
    color: 'tb',
}