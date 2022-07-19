import React, {useEffect, useMemo, useContext, useState} from 'react'
import DisplayImage from '@/components/textbooks/DisplayImage';
import reactHtmlParser from 'react-html-parser';
import { ImageContext } from '@/contexts/ImageContext';

import {ButtonGroup} from "@/components/textbooks/ButtonGroup";

export const ImageContent = ({
     components_item,
     selectedImage,
     setSelectedImage
 }) => {
    const { imageLib, setImageLib, addImageLib } = useContext(ImageContext);
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    }

    const handleMouseLeave = () => {
        setHovered(false);
    }

    console.log("image rerenderd")
    const image = useMemo(()=>imageLib.get(components_item.src),[components_item, imageLib]);

    return (
        <div
            className={"body-image"}
            onMouseEnter={() => {handleMouseEnter()}}
            onMouseLeave={() => {handleMouseLeave()}}
        >
            {
                image === null || image === undefined ?
                    <>
                        <h6>이미지를 찾을 수 없음 {components_item.src}</h6>
                        <h6>{components_item.src} 선택하여 업로드 : </h6>
                        <DisplayImage selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
                    </> :
                    <img src={image} alt={components_item.name}/>
            }
            <br />
            <b> {reactHtmlParser(components_item.name? components_item.name:null)} </b>
            <br />
        </div>
    );
}

export default ImageContent;
