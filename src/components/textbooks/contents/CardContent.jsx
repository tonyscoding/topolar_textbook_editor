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
        index,
        stepIndex,
        addDesc,
        changeDesc,
        addCode,
        addSingleCard,
        changeCode,
        text,
        code,
        codeLanguage,
        deleteJSONBookItem
     }) => {
    console.log("data", data);

    const[linkId, setLinkId] = useState(null);
    const[linkIndicator, setLinkIndicator] = useState(null);
    const[selectedImage, setSelectedImage] = useState(null);
    const [hoverItemCardIndex, setHoverItemCardIndex] = useState(null);

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
                <ButtonGroup index={index} text={text} code={code} codeLanguage={codeLanguage} linkId={linkId} linkIndicator={linkIndicator} addCode={addCode} addDesc={addDesc} isCard={true} cardIndex={-1}/>
                {reactHtmlParser(data.description_title)}
                {
                    data.components.map((components_item, cardIndex) => {
                        let type = components_item.type;

                        return (
                            <div onMouseEnter={() => setHoverItemCardIndex(cardIndex)} onMouseLeave={() => setHoverItemCardIndex(null)} className={'body-desc'}>
                            {
                            type === "desc" ?
                                <DescContent
                                    key={cardIndex}
                                    index={cardIndex}
                                    text={text}
                                    components_item={components_item}
                                    codeLanguage={codeLanguage}
                                    code={code}
                                    linkId={linkId}
                                    linkIndicator={linkIndicator}
                                /> :
                            type === "code" ?
                                <CodeContent
                                    key={cardIndex}
                                    index={cardIndex}
                                    text={text}
                                    components_item={components_item}
                                    codeLanguage={codeLanguage}
                                    code={code}
                                    linkId={linkId}
                                    linkIndicator={linkIndicator}
                                /> :
                            type === "image" ?
                                <ImageContent
                                    key={cardIndex}
                                    components_item={components_item}
                                    index={cardIndex}
                                    loadImage={loadImage}
                                    selectedImage={selectedImage}
                                    setSelectedImage={setSelectedImage}
                                    ButtonGroup={ButtonGroup}
                                /> :
                            type === "link" ?
                                <div className={"body-link"} key={components_item.link+count_for_key} onMouseEnter={() => {setHoverItemCardIndex(index)}} onMouseLeave={() => {setHoverItemCardIndex(null)}}>
                                    <Button size="small"> 힌트 보기 </Button>
                                    {hoverItemCardIndex === cardIndex && <ButtonGroup index={cardIndex}/>}
                                </div>
                                : null
                            }
                            {
                                hoverItemCardIndex === cardIndex &&
                                <ButtonGroup
                                    index={index}
                                    text={text}
                                    codeLanguage={codeLanguage}
                                    code={code}
                                    linkId={linkId}
                                    linkIndicator={linkIndicator}
                                    addDesc={addDesc}
                                    addCode={addCode}
                                    addSingleCard={addSingleCard}
                                    deleteJSONBookItem={deleteJSONBookItem}
                                    isCard={true}
                                    cardIndex={cardIndex}
                                />
                            }
                                        </div>)
                    })
                }
                
        </Card>
    )
}

export default CardContent