import React, { useEffect, useRef, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'assets/sass/Guide/Table.scss';

/*
    keyField: BootstrapTable 라이브러리 사용시 필수 값
    boldIndex: row 영역의 폰트 색을 #212121로 지정 할 Array
    columns, data, noDataIndication(선택): BootstrapTable의 필수 params
    현재 해당 Table은 main페이지의 공지사항 페이지만을 위한 컴포넌트로 구성되었습니다.
    해당 컴포넌트를 다른 곳에서 이용이 필요할 경우 수정이 필요합니다.
*/
const Table = ({keyField, boldIndex=[], columns=[], data=[], noDataIndication="", sizePerPage, totalSize }) => {
    const [expandToggle, setExpandToggle] = useState(false);

    useEffect(() => {
        const tableEl = document.getElementById(keyField+'Table');
        if(tableEl && tableEl.querySelector('tbody')){
            // console.log(tableEl.querySelector('tbody').querySelectorAll('tr'))
            const data = tableEl.querySelector('tbody').querySelectorAll('tr')
            for(let i=0;i<data.length;++i){
                boldIndex.forEach((idx) => {
                    if(!data[i].childNodes[idx]) return;
                    data[i].childNodes[idx].style.color="#212121"
                })
            }

            const pagination = document.getElementsByClassName('pagination')[0];
            const prev = pagination.firstChild.firstChild;
            const next = pagination.lastChild.firstChild;
            prev.innerHTML = "<div class=\"material-icons\" style=\"color: black\" >chevron_left</div>";
            next.innerHTML = "<div class=\"material-icons\" style=\"color: black\">chevron_right</div>";
        }
    },[data])

    const expandRowHandler = (parentEl, childEl) => {
        if(parentEl.getAttribute('name')!=='toggle'){
            const color = '#FAFAFA';
            parentEl.style.backgroundColor = color;
            parentEl.style.borderBottom = '1px solid #FFFFFF00';
            childEl.style.backgroundColor = color;
            parentEl.setAttribute('name', 'toggle');
        } else {
            parentEl.removeAttribute('style');
            parentEl.removeAttribute('name');
        }
    }

    return (
        <div className="guide-table">
            <BootstrapTable
                id={keyField+'Table'}
                bootstrap4
                keyField={keyField}
                data={data}
                columns={columns}
                bordered={false}
                noDataIndication={noDataIndication}
                expandRow={{
                    renderer: row => {
                        return (<div>{row.content}</div>)
                    }
                }}
                // rowEvents={{
                //     onClick: (e, row, rowIndex) => {
                //         const parentEl = e.target.parentElement;
                //         const paddingLeft = parentEl.firstChild.offsetWidth;
                //         const width = parentEl.childNodes[1].offsetWidth;
                //         setTimeout(() => {
                //             const contentEl = parentEl.nextSibling.firstChild.firstChild;
                //             console.log(contentEl)
                //             contentEl.style.marginLeft=paddingLeft+'px';
                //             contentEl.style.width = width+'px';
                //             expandRowHandler(parentEl, contentEl.parentElement)
                //         }, 50);
                        
                //     }
                // }}
                pagination={paginationFactory({
                    sizePerPage: sizePerPage,
                    hideSizePerPage: true,
                    alwaysShowAllBtns: true,
                    withFirstAndLast: false,
                    totalSize: totalSize
                })}
            />
        </div>
    )
}

export default Table;