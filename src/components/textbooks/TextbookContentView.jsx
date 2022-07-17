import React, {useContext, useEffect, useRef, useState} from 'react';
import '@/assets/sass/Curriculum/TextbookBrowser.scss'
import reactHtmlParser from 'react-html-parser';

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {materialLight} from 'react-syntax-highlighter/dist/esm/styles/prism'

import Markdown from 'react-markdown';
import gfm from 'remark-gfm';

import {loadImage} from '@/helpers/electronFileSystem'

import Button from '@/components/Button';

import DescEditor from '@/components/textbooks/editors/DescEditor';
import CodeEditor from '@/components/textbooks/editors/CodeEditor';
import LinkEditor from "@/components/textbooks/editors/LinkEditor";

import DescContent from '@/components/textbooks/contents/DescContent';
import CodeContent from '@/components/textbooks/contents/CodeContent';
import ImageContent from '@/components/textbooks/contents/ImageContent';

import ButtonGroup from "@/components/textbooks/ButtonGroup";

const TextbookContentView = ({
         data,
         JSONLoading,
     }) => {

    const text = useRef("");
    const code = useRef("");
    const codeLanguage = useRef("");

    const [linkId, setLinkId] = useState(null);
    const [linkIndicator, setLinkIndicator] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [hoverItemIndex, setHoverItemIndex] = useState(null);

    if (JSONLoading){
        return null;
    }
    if (!data){
        return null;
    }

    return (
        <div className="textbook-content-view">
            <div>
                <div className={"textbook-container"}>
                    <div className={"textbook-header"}>
                        <div className={"textbook-title"}>
                            {data.title}
                        </div>
                    </div>


                    <div className="textbook-body">
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
                                        </div> : null
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div style={{marginTop: "50px"}}>
                <div style={{marginTop: "20px", marginBottom: "20px"}}>
                    <DescEditor placeholder={"이곳에 desc 입력"} text={text} />
                </div>

                <div>
                    <CodeEditor codeLanguage={codeLanguage} code={code} />
                </div>

                <div style={{marginTop: "20px", marginBottom: "20px"}}>
                </div>
                <LinkEditor
                    linkId={linkId}
                    linkIndicator={linkIndicator}
                    setLinkId={setLinkId}
                    setLinkIndicator={setLinkIndicator}
                />
            </div>
        </div>
    )
}

export default TextbookContentView
