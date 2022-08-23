import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import 'assets/sass/Guide/CustomToast.scss';
import classNames from 'classnames';
import closebtnToast from './Imgs/closebtnToast.svg';
import { clearToast } from '../helpers/toast';

const CustomToast = () => {

    const toastListTemp = useSelector(state => state.toast.toastList);

    return (
        <>
            <div className={'toast-container'} aria-live="assertive">
                {/* <div className={classNames('toast-notification basic')}>
                                
                    <div className='message-container'>
                        <div className="toast-content">토스트 팝업</div>
                        <div className="toast-content">내용은 최대 2줄</div>
                        
                    </div>
                    <img src={closebtnToast} onClick={() => closeToast(toast.id)} />
                </div> */}
                {
                    toastListTemp.map((toast, index) => {
                        return(
                            <div key={'toast-'+index} id={'toast-'+toast.id} className={classNames('toast-notification', toast.type==="danger"?"error":toast.type)}>

                                <div className='message-container'>
                                    {toast.content.map((item, index) => {
                                        return (
                                            <div key={'content-'+index} className="toast-content">{item}</div>
                                        )
                                    })}
                                </div>
                                <img src={closebtnToast} onClick={() => clearToast(toast.id)} />
                            </div>
                        )

                    })
                }
            </div>
        </>
    )

}

export default CustomToast;