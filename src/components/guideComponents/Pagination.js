import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import 'assets/sass/Guide/Pagination.scss';
import * as $ from 'jquery';

const Pagination = ({postPerPage, totalPost, click, delay, style}) => {

    const [numberSelected, setNumberSelected] = useState();
    const [maxPage, setMaxPage] = useState(null);
    const [pageNumber, setPageNumber] = useState([]);
    const [constraintArrow, setConstraintArrow] = useState(false);

    useEffect(()=>{
        let arr = [];
        if (totalPost/postPerPage < 5) {
            for (var i = 1; i <= Math.ceil(totalPost/postPerPage); i++){
                arr.push(i);
            }
        }
        else {
            for (var i=1; i <= 5; i++){
                arr.push(i);
            }
        }
        setPageNumber(arr);
        setNumberSelected(1);
        setMaxPage(Math.ceil(totalPost/postPerPage));
        $('#1').addClass('selected');
    },[totalPost])

    useEffect(()=>{
        $('#'+numberSelected).addClass('selected');
    },[pageNumber])

    useEffect(() => {
        $('.selected').removeClass('selected');
        $('#'+numberSelected).addClass('selected');
        if (maxPage > 5){
            let tempArr;
            if (numberSelected > 2 && numberSelected < maxPage - 1){
                tempArr = [numberSelected-2, numberSelected-1, numberSelected, numberSelected+1, numberSelected+2]
            }
            if (numberSelected <= 2) {
                tempArr = [1, 2, 3, 4, 5]
            }
            if (numberSelected >= maxPage - 1){
                tempArr = [maxPage-4, maxPage-3, maxPage-2, maxPage-1, maxPage]
            }
            setPageNumber(tempArr)
        }
    }, [numberSelected])

    const numberClick = (number) => {
        if (number !== numberSelected){
            click(number);
            setNumberSelected(number)
        }
    }

    const nextClick = () => {
        if (constraintArrow) return;
        if(numberSelected<maxPage){
            click(numberSelected+1);
            setNumberSelected(numberSelected+1)
            if (delay){
                setConstraintArrow(true)

                setTimeout(() => {
                    setConstraintArrow(false)
                }, 1000);
            } else {
                setConstraintArrow(false)
            }
        }
    }

    const prevClick = () => {
        if (constraintArrow) return;
        if(numberSelected>1){
            setConstraintArrow(true)
            click(numberSelected-1);
            setNumberSelected(numberSelected-1)
            if (delay){
                setTimeout(() => {
                    setConstraintArrow(false)
                }, 1000);
            } else {
                setConstraintArrow(false)
            }
        }
    }

    return (
        <div className='pagination-container' style={style}>
            <div className='pagination-prev material-icons' onClick={()=>{prevClick()}}>
                chevron_left
            </div>
            <div className='pagination-number-container'>
                {pageNumber.map((item, index) => {
                    return (
                        <div key={item} id={item} onClick={()=>{numberClick(item)}} className={classNames('pagination-number')}>
                            {item}
                        </div>
                    )
                })}
            </div>
            <div className='pagination-next material-icons' onClick={()=>{nextClick()}}>
                chevron_right
            </div>
        </div>
    )
}

export default React.memo(Pagination);
