import React, {useContext, useEffect, useRef, useState} from 'react';
import '@/assets/sass/Curriculum/TextbookBrowser.scss'
import reactHtmlParser from 'react-html-parser';

import {loadImage} from '@/helpers/electronFileSystem'

import Button from '@/components/Button';

import DescContent from '@/components/textbooks/contents/DescContent';
import CodeContent from '@/components/textbooks/contents/CodeContent';
import ImageContent from '@/components/textbooks/contents/ImageContent';

import ButtonGroup from "@/components/textbooks/ButtonGroup";

import {Card} from "@/components/Card";

const CardContent = ({
         data,
         JSONLoading,
         stepIndex,
     }) => {
    console.log("data", data);
    const text = useRef("");
    const code = useRef("");
    const codeLanguage = useRef("");

    const[linkId, setLinkId] = useState(null);
    const[linkIndicator, setLinkIndicator] = useState(null);
    const[selectedImage, setSelectedImage] = useState(null);
    const [hoverItemIndex, setHoverItemIndex] = useState(null);

    if (JSONLoading){
        return null;
    }
    if (!data){
        return null;
    }

    return (
        <Card
            width={"guide-col8"}
            hideLine={0}
            style={{marginBottom: "20px"}}
        >
            <b>제목</b>
                        <ButtonGroup index={-1} text={text} codeLanguage={codeLanguage} linkId={linkId} linkIndicator={linkIndicator} />
                        {reactHtmlParser(data.description_title)}
                        {
                            data.components.map((components_item, index) => {
                                let type = components_item.type;

                                return (
                                    type === "desc" ?
                                        <DescContent
                                            key={index}
                                            index={index}
                                            text={text}
                                            components_item={components_item}
                                            codeLanguage={codeLanguage}
                                            code={code}
                                            linkId={linkId}
                                            linkIndicator={linkIndicator}
                                        /> :
                                    type === "code" ?
                                        <CodeContent
                                            key={index}
                                            index={index}
                                            text={text}
                                            components_item={components_item}
                                            codeLanguage={codeLanguage}
                                            code={code}
                                            linkId={linkId}
                                            linkIndicator={linkIndicator}
                                        /> :
                                    type === "image" ?
                                        <ImageContent
                                            key={index}
                                            components_item={components_item}
                                            index={index}
                                            loadImage={loadImage}
                                            selectedImage={selectedImage}
                                            setSelectedImage={setSelectedImage}
                                            ButtonGroup={ButtonGroup}
                                        /> :
                                    type === "link" ?
                                        <div className={"body-link"} key={components_item.link+count_for_key} onMouseEnter={() => {setHoverItemIndex(index)}} onMouseLeave={() => {setHoverItemIndex(null)}}>
                                            <Button size="small"> 힌트 보기 </Button>
                                            {hoverItemIndex === index && <ButtonGroup index={index}/>}
                                        </div>
                                        : null
                                )
                            })
                        }
        </Card>
    )
}

export default CardContent