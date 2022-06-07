import React, {useContext, useEffect, useState} from 'react';
import '@/assets/sass/Curriculum/TextbookBrowser.scss'
import reactHtmlParser from 'react-html-parser';

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {materialLight} from 'react-syntax-highlighter/dist/esm/styles/prism'

import Markdown from 'react-markdown';
import gfm from 'remark-gfm';
import {loadImage} from '@/helpers/electronFileSystem'
import {TextbookContext} from '@/contexts/TextbookContext';

import Editor from '@/components/textbooks/Editor';

import Button from '@/components/Button';
import {Field} from '@/components/textbooks/Field';
import {CodeLanguageSelectBox} from './CodeLanguageSelectBox';

import {ImageContent} from '@/components/textbooks/ImageContent';
import {DescContent} from '@/components/textbooks/DescContent';

import useInterval from '@/helpers/useInterval';
import LinkEditor from "@/components/textbooks/LinkEditor";


const TextbookContentView = ({
         data,
         JSONLoading,
         stepIndex,
     }) => {

    const[text, setText] = useState("");
    const[code, setCode] = useState("더블클릭하여 code 입력");
    const[codeLanguage, setCodeLanguage] = useState("python");
    const[linkId, setLinkId] = useState(null);
    const[linkIndicator, setLinkIndicator] = useState(null);
    const[selectedImage, setSelectedImage] = useState(null);
    const [hoverItemIndex, setHoverItemIndex] = useState(null);
    const[imageModalVisible, setImageModalVisible] = useState(false);
    const { addDescription, addImage, addCode, addLink, addTable, deleteDescription } = useContext(TextbookContext);

    const [ isEditing, setIsEditing ] = useState(false);
    const [ lastText, setLastText ] = useState('');
    const [ lastparseData, setLastParseData ] = useState(null);

    useEffect(() => {
        console.log("selectedImageName : ", selectedImage);
    },[selectedImage])

    useEffect(() => {
        setLastParseData(parseData(data));
    },[])

    useInterval(() => {
        console.log("lastText: ",  lastText);
        console.log("Text: ", text);

        if (lastText !== text) {
            setIsEditing(true);
        } else {
            setIsEditing(false);
        }
        setLastText(text);
    }, 1000);

    // const files = fs.readdirSync(dir)

    // for (const file of files) {
    //   console.log(file)
    // }


    const selectFolder = async () => {
        const dirHandle = await window.showDirectoryPicker();
        console.log(dirHandle);
    }

    const handleCode = (e) => {
        setCode(e.currentTarget.value);
    }

    const handleText = (newText) => {
        setText(newText);
    }

    const handleFocus = () => {
        setLastParseData(parseData(data));
        setIsEditing(true);
    }

    const handleBlur = () => {
        setLastParseData(parseData(data));
        setIsEditing(false);
    }

    const ButtonGroup = ({index}) => (
        <div className={"body-buttonGroup"}>
            <Button size="small" type="fill" color="black" onClick={()=>{
                addDescription(index+1, text);
                setLastParseData(parseData(data));
            }}>desc 추가</Button>
            {/* <Button size="small" type="fill" color="black" onClick={()=>{addImage(index+1, selectedImage)}}>image 추가</Button> */}
            <Button size="small" type="fill" color="black" onClick={()=>{
                addCode(index+1, code, codeLanguage);
                setLastParseData(parseData(data));
            }}>code 추가</Button>
            <Button size="small" type="fill" color="black" onClick={()=>{
                addLink(index+1, linkId, linkIndicator);
                setLastParseData(parseData(data));
            }}>link 추가</Button>
            {/* <Button size="small" type="fill" color="black" onClick={()=>{addTable(index+1, text)}}>table 추가</Button> */}
            {index > -1 && <Button size="small" type="fill" color="red" onClick={()=>{
                deleteDescription(index);
                setLastParseData(parseData(data));
            }}>제거</Button>}

        </div>

    )

    const parseData = (data) =>{
        const {title, components, description_title} = data;

        let count_for_key = 0;

        const step_item_descriptions = (components && components.length>0)?components.map((components_item, index)=>{
            count_for_key += 1;
            let type = components_item.type;
            if (type === "desc"){
                count_for_key += 1;
                return (
                    <>
                        <DescContent
                            components_item={components_item}
                            index={index}
                            hoverItemIndex={hoverItemIndex}
                            setHoverItemIndex={setHoverItemIndex}
                            count_for_key={count_for_key}
                            ButtonGroup={ButtonGroup}
                        />
                    </>
                    // <div className={"body-desc"} key={components_item.description+count_for_key} onMouseEnter={() => {setHoverItemIndex(index)}} onMouseLeave={() => {setHoverItemIndex(null)}}>
                    //     <div>
                    //         <Markdown children={components_item.description} rehypePlugins={[rehypeRaw]} />
                    //     </div>
                    //     {hoverItemIndex === index && <ButtonGroup index={index}/>}

                    // </div>
                );
            }
            else if (type === "table"){
                count_for_key += 1;
                return(
                    <div className={"body-table"} key={components_item.description+count_for_key} onMouseEnter={() => {setHoverItemIndex(index)}} onMouseLeave={() => {setHoverItemIndex(null)}}>
                        <Markdown
                            children={components_item.description}
                            remarkPlugins={[[gfm, {borderWidth: "1px"}]]}
                        />
                        {hoverItemIndex === index && <ButtonGroup index={index}/>}
                    </div>
                );
            }
            else if (type === "code"){
                count_for_key += 1;
                return (
                    <div className={"body-code"} key={components_item.code+count_for_key} onMouseEnter={() => {setHoverItemIndex(index)}} onMouseLeave={() => {setHoverItemIndex(null)}}>
                        <Markdown
                            children={components_item.code}
                            components={{
                                code({node, inline, className, children, ...props}) {
                                    const match = /language-(\w+)/.exec(className || '')
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            children={String(children).replace(/\n$/, '')}
                                            style={materialLight}
                                            language={match[1]}
                                            PreTag="div"
                                            {...props}
                                        />
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        />
                        {hoverItemIndex === index && <ButtonGroup index={index}/>}
                    </div>
                );
            }
            else if (type === "image") {
                count_for_key += 1;
                return (
                    <>
                        <ImageContent
                            components_item={components_item}
                            index={index}
                            hoverItemIndex={hoverItemIndex}
                            setHoverItemIndex={setHoverItemIndex}
                            loadImage={loadImage}
                            count_for_key={count_for_key}
                            selectedImage={selectedImage}
                            setSelectedImage={setSelectedImage}
                            ButtonGroup={ButtonGroup}
                        />

                    </>
                )
            }
            else if (type === "link") {
                count_for_key += 1;
                return (
                    <div className={"body-link"} key={components_item.link+count_for_key} onMouseEnter={() => {setHoverItemIndex(index)}} onMouseLeave={() => {setHoverItemIndex(null)}}>
                        <Button size="small"> 힌트 보기 </Button>
                        {hoverItemIndex === index && <ButtonGroup index={index}/>}
                    </div>
                )
            }
        }):null;

        const card1 = (
            <div className={"textbook-container"}>
                <div className={"textbook-header"}>
                    <div className={"textbook-title"}>
                        {title}
                    </div>
                </div>

                <div className="textbook-body">
                    <ButtonGroup index={-1}/>
                    {reactHtmlParser(description_title)}
                    {step_item_descriptions}
                </div>
            </div>
        );
        return (
            <div>
                {card1}
            </div>

        );
    }

    if (JSONLoading){
        return null;
    }
    if (!data){
        return null;
    }
    const OPTIONS = [
        { value: "python", name: "python" },
        { value: "cpp", name: "cpp" },
        { value: "java", name: "java" },
        { value: "javascript", name: "javascript" },
        { value: "html", name: "html" },
        { value: "css", name: "css" }
    ];

    return (
        <div className="textbook-content-view">
            {/* <Modal isOpen={imageModalVisible} toggle={setImageModalVisible} subHeader="b" header="a">
              <DisplayImage selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
            </Modal> */}

            {isEditing ? lastparseData : parseData(data)}
            <div style={{marginTop: "50px"}}>
                <hr></hr>
                {/* 이미지 선택 :
              <DisplayImage selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
              <hr></hr> */}
                {/* <CustomToolbar/> */}
                <Editor placeholder={"이곳에 desc 입력"} text={text} handleChange={handleText} handleFocus={handleFocus} handleBlur={handleBlur} />
                <hr />
                <CodeLanguageSelectBox options={OPTIONS} defaultValue="python" setCodeLanguage={setCodeLanguage}></CodeLanguageSelectBox>;
                <Field
                    value={code}
                    inputChange={handleCode}
                    active = {code}
                />
                <hr />
                <LinkEditor
                    linkId={linkId}
                    linkIndicator={linkIndicator}
                    setLinkId={setLinkId}
                    setLinkIndicator={setLinkIndicator}
                />
                <br />
            </div>
        </div>
    )

}

export default TextbookContentView