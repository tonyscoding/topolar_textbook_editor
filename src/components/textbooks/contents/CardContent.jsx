import React, {useContext, useEffect, useRef, useState} from 'react';
import '@/assets/sass/Curriculum/TextbookBrowser.scss'
import reactHtmlParser from 'react-html-parser';

import {loadImage} from '@/helpers/electronFileSystem'

import Button from '@/components/Button';

import DescContent from '@/components/textbooks/contents/DescContent';
import CodeContent from '@/components/textbooks/contents/CodeContent';
import LinkContent from '@/components/textbooks/contents/LinkContent';
import VideoContent from '@/components/textbooks/contents/VideoContent';
import ImageContent from '@/components/textbooks/contents/ImageContent';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import ButtonGroup from "@/components/textbooks/ButtonGroup";

import {Card} from "@/components/Card";

import { useRecoilValue } from "recoil";
import { stepIndexState, itemIndexState } from "@/utils/States";

const CardContent = ({
        data,
        JSONLoading,
        index,
        link,
        videoUrl,
        text,
        code,
        codeLanguage,
     }) => {
    console.log("data", data);

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

    return (
        <Card
            width={ "guide-col8" }
            hideLine={0}
            style={{marginBottom: "20px"}}
        >
                <ButtonGroup
                    index={index}
                    text={text}
                    code={code}
                    link={link}

                    codeLanguage={codeLanguage}
                    videoUrl={videoUrl}

                    isCard={true}
                    cardIndex={-1}
                />
                {
                    data.components.map((components_item, cardIndex) => {
                        let type = components_item.type;

                        return (
                            <div
                                onMouseEnter={() => setHoverItemCardIndex(cardIndex)}
                                onMouseLeave={() => setHoverItemCardIndex(null)}
                                className={'body-desc'}
                            >
                            {
                            type === "desc" ?
                                <DescContent
                                    key={cardIndex}
                                    index={index}
                                    components_item={components_item}
                                    isCard={true}
                                    cardIndex={cardIndex}
                                /> :
                            type === "code" ?
                                <CodeContent
                                    key={cardIndex}
                                    components_item={components_item}
                                /> : 
                            type === "link" ?
                                <LinkContent
                                    key={cardIndex}
                                    components_item={components_item}
                                /> : 
                            type === "video" ?
                                <VideoContent
                                    key={index}
                                    components_item={components_item}
                                /> : null
                            }

                            {
                                hoverItemCardIndex === cardIndex &&
                                <ButtonGroup
                                    index={index}
                                    text={text}
                                    codeLanguage={codeLanguage}
                                    link={link}
                                    code={code}
                    
                                    videoUrl={videoUrl}
                                
                                    isCard={true}
                                    cardIndex={cardIndex}
                                />
                            }
                            </div>
                        )
                    })
                }

        </Card>
    )
}

export default CardContent
