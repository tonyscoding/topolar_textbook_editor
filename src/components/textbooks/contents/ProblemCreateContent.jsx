import React, {useCallback, useEffect, useRef, useState} from "react";

import {Button, Input, Textarea} from "@nextui-org/react";
import CodeContent from "./CodeContent";
import rehypeRaw from "rehype-raw";
import Markdown from "react-markdown";
import ReactQuill from "react-quill";
import CodeEditor from "../editors/CodeEditor";

const ButtonGroup = ({index, desc, setDesc, text, codeLanguage, code}) => {

    const addDesc = () => {
            let newDesc = JSON.parse(JSON.stringify(desc));
            const content = {
                "type": "desc",
                "description": text.current
            }

            newDesc.splice(index+1, 0, content);
            console.log("prev",newDesc);
            setDesc(newDesc);

    }

    const addCode = () => {
        let newDesc = JSON.parse(JSON.stringify(desc));
        const content = {
            "type": "code",
            "code": "~~~" + codeLanguage.current.saveName + " \n" + code.current + "\n ~~~"
        }

        newDesc.splice(index+1, 0, content);
        console.log("prev",code, codeLanguage);
        setDesc(newDesc);
    }

    return (
        <Button.Group
            size={"sm"}
            color={"default"}
            flat
            ghost
            borderWeight={'light'}
        >
            <Button
                auto
                onClick={() => {
                    addDesc()
                }}
            >
                desc 추가
            </Button>
            <Button
                auto
                onClick={() => {
                    console.log("code", code);
                    addCode()
                }}
            >
                code 추가
            </Button>
        </Button.Group>
    )
}


const InoutputContent = ({inoutput, setInoutput, input1, output1}) => {
    return (
        <>
            {
                inoutput.map((element, index) => (
                    <div>
                        <span style={styles.inoutput}>{element.input}</span>
                        <span style={styles.inoutput}>{element.output}</span>
                    </div>
                ))
            }


            <Button
                auto
                onClick={() => {
                    let newInoutput = JSON.parse(JSON.stringify(inoutput));
                    newInoutput.push({input: input1.current, output: output1.current});
                    setInoutput(newInoutput);
                }}
            >
                추가
            </Button>
        </>
    )
}


const ProblemCreateContent = ({desc, setDesc, title, setTitle, input, setInput, output, setOutput, inoutput, setInoutput, hint, setHint, tag, setTag, number, setNumber}) => {
    const text = useRef("");
    const code = useRef("");
    const codeLanguage = useRef("");
    const link = useRef({textbook_id: "", indicator: ""});
    const videoUrl = useRef("");
    const input1 = useRef("");
    const output1 = useRef("");

    useEffect(() => {
        console.log(desc);
    }, [JSON.stringify(desc)])

    const parseData = () => {
        return (
            desc.map((content, index) => {

                if(content.type === "desc") {
                    return (
                        <div>
                            <Markdown children={content.description} rehypePlugins={[rehypeRaw]} />
                            <ButtonGroup index={index} desc={desc} setDesc={setDesc} text={text} code={code} codeLanguage={codeLanguage}/>
                        </div>
                    )
                } else if(content.type === "code") {
                    console.log("here")
                    return (
                        <div>
                            <CodeContent key={`code-${index}`} components_item={content}/>
                            <ButtonGroup index={index} desc={desc} setDesc={setDesc} text={text} code={code} codeLanguage={codeLanguage}/>
                        </div>
                    )
                }

            })
        )
    }

    return (
        <>

            <div style={styles.container}>
                <div style={styles.input} >
                    <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div style={styles.input} >
                    <Input label="Number" value={number} onChange={(e) => setNumber(e.target.value)}/>
                </div>
                <ButtonGroup index={0} desc={desc} setDesc={setDesc} text={text} code={code} codeLanguage={codeLanguage}/>
                {parseData()}
                <div style={styles.input} >
                    <Textarea style={styles.textarea} label="input" value={input} onChange={(e) => setInput(e.target.value)}/>
                </div>
                <div style={styles.input} >
                    <Textarea style={styles.textarea} label="output" value={output} onChange={(e) => setOutput(e.target.value)}/>
                </div>

                <div>
                    <InoutputContent inoutput={inoutput} setInoutput={setInoutput} input1={input1} output1={output1}/>
                </div>

                <div style={styles.input} >
                    <Textarea style={styles.textarea} label="hint" value={hint} onChange={(e) => setHint(e.target.value)}/>
                </div>
                <div style={styles.input} >
                    <Textarea style={styles.textarea} label="tag" value={tag} onChange={(e) => setTag(e.target.value)}/>
                </div>
                <div>

                <div>
                    <div style={styles.divider}>
                        <ReactQuill
                            value={text.current}
                            onChange={(newText) => {
                                text.current = newText;
                            }}
                            placeholder={""}
                            theme="snow"
                            style={{height:"250px"}}
                        />
                    </div>

                    <div style={styles.divider}>
                        <CodeEditor codeLanguage={codeLanguage} code={code} />
                    </div>

                    <Textarea
                        label="입력예시"
                        value={input1.current}
                        onChange={e => {
                            input1.current = e.target.value;
                        }}
                    />
                    <Textarea
                        label="출력예시"
                        value={output1.current}
                        onChange={e => {
                            output1.current = e.target.value;
                        }}
                    />

                    {/*<div style={styles.divider}>*/}
                    {/*    <LinkEditor link={link} />*/}
                    {/*</div>*/}

                    {/*<div style={styles.divider}>*/}
                    {/*    <VideoEditor videoUrl={videoUrl} />*/}
                    {/*</div>*/}
                </div>
            </div>
            </div>


        </>
    );
}

const styles = {
    divider: {
        marginTop: "20px",
        marginBottom: "20px",
        paddingTop: 20,
        borderTop: "1px solid #dfdfdf"
    },
    container: {
        overflow: "auto",
        height: "90vh",
        width: "100vw",
        padding: "100px"
    },
    input: {
        margin: "20px"
    },
    inoutput: {
        width: "200px",
        margin: "100px"
    },
    textarea: {
        width: "500px"
    }
}

export default ProblemCreateContent;