import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import 'assets/sass/Guide/SelectionControl.scss';

const ToggleSwitch = ({onClick, size, checked, bordered, on, off}) => {

    const [isToggled, setIsToggled] = useState(false);
    const [isBordered, setIsBordered] = useState(false);

    useEffect(() => {
        if (bordered) setIsBordered(true)
    }, [])

    useEffect(()=> {
        if (checked) setIsToggled(true)
    }, [checked])

    const Toggle = () => {
        onClick();
        setIsToggled(!isToggled);
    }

    if (!isBordered){
        return (
            <div className={"toggleswitch-container-" + size}>
                <div className="toggleswitch">
                    <input type="checkbox" onChange={()=>Toggle()} checked={isToggled}/>
                    <div className="knob"></div>
                    <div className="layer"></div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className={"toggleswitch-bordered-container-" + size}>
                <div className="toggleswitch">
                    <input type="checkbox" onChange={()=>Toggle()} checked={isToggled}/>
                    <div className="knob"></div>
                    <div className="layer">
                        {on||off?
                        <>
                            <div className={classNames("on")}>{on}</div>
                            <div className={classNames("off")}>{off}</div>
                        </>
                        :null}
                    </div>
                </div>
            </div>
        )
    }
    
}

ToggleSwitch.defaultProps = ({
    size: "large",
    onClick: ()=>console.log("toggle is not defined"),
})

export default ToggleSwitch;