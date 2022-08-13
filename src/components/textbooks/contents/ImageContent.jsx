import React from 'react'

export const ImageContent = ({
     components_item,
 }) => {
    return (
        <div>
            <h2 style={{color: "red"}}>{components_item.src}</h2>
            <div style={{color: "red"}}>현재 교재와 형태가 다릅니다. 컨버터를 이용해 변환해주세요.</div>
        </div>
    );
}

export default ImageContent;
