import React, {useContext, useEffect, useRef, useState} from 'react';
import '@/assets/sass/Curriculum/TextbookBrowser.scss'
import reactHtmlParser from 'react-html-parser';

import {loadImage} from '@/helpers/electronFileSystem'

import Button from '@/components/Button';

import DescContent from '@/components/textbooks/contents/DescContent';
import CodeContent from '@/components/textbooks/contents/CodeContent';
import ImageContent from '@/components/textbooks/contents/ImageContent';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import ButtonGroup from "@/components/textbooks/ButtonGroup";

import {Card} from "@/components/Card";
import {DescEditor} from "@/components/textbooks/editors/DescEditor";

import { useRecoilValue } from "recoil";
import { stepIndexState, itemIndexState } from "@/utils/States";

const CardContent = ({
        data,
        JSONLoading,
        index,
        addDesc,
        changeDesc,
        addCode,
        addSingleCard,
        changeCode,
        text,
        code,
        codeLanguage,
        deleteJSONBookItem,
        changeCardTitle
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

    const stepIndex = useRecoilValue(stepIndexState);
	const itemIndex = useRecoilValue(itemIndexState);

	const item = useRef('');
	const [wantToEdit, setWantToEdit] = useState(false);

    const handleBlur = (e) => {
		setWantToEdit(false);
		changeCardTitle(stepIndex, itemIndex, index, item.current);
	}

    return (
        <Card
            width={ "guide-col8" }
            hideLine={0}
            style={{marginBottom: "20px"}}
        >
            <div
                className={"body-desc"}
                onDoubleClick={() => {setWantToEdit(true)}}
            >
                {
                    wantToEdit ?
                        <DescEditor placeholder={"이곳에 desc 입력"} text={item} handleBlur={handleBlur} />
                        :
                        <Markdown children={data.title} rehypePlugins={[rehypeRaw]} />
                }
            </div>
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
                                    changeDesc={changeDesc}
                                    components_item={components_item}
                                    codeLanguage={codeLanguage}
                                    code={code}
                                    linkId={linkId}
                                    linkIndicator={linkIndicator}
                                    isCard={true}
                                    cardIndex={cardIndex}
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