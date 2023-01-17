import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";

import {Button, Dropdown, Input, Textarea} from "@nextui-org/react";
import CodeContent from "@/components/textbooks/contents/CodeContent";
import rehypeRaw from "rehype-raw";
import Markdown from "react-markdown";
import ReactQuill from "react-quill";
import CodeEditor from "@/components/textbooks/editors/CodeEditor";

const ButtonGroup = ({index, desc, setDesc, text, codeLanguage, code}) => {

    const addDesc = () => {
        let newDesc = JSON.parse(JSON.stringify(desc));
        const content = {
            "type": "desc",
            "description": text.current
        }

        newDesc.splice(index, 0, content);
        setDesc(newDesc);
    }

    const addCode = () => {
        let newDesc = JSON.parse(JSON.stringify(desc));
        const content = {
            "type": "code",
            "code": "~~~" + codeLanguage.current.saveName + " \n" + code.current + "\n ~~~"
        }

        newDesc.splice(index, 0, content);
        setDesc(newDesc);
    }

    const deleteItem = (deleteIndex) => {
        let newDesc = JSON.parse(JSON.stringify(desc));
        newDesc.splice(deleteIndex - 1, 1);
        setDesc(newDesc);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button.Group
                size={"sm"}
                color={"default"}
                flat
                ghost
                borderWeight={'light'}
            >
                <Button auto onClick={addDesc}>
                    desc 추가
                </Button>
                <Button auto onClick={addCode}>
                    code 추가
                </Button>
            </Button.Group>

            {
                index >= 1 ?
                    <Button
                        size={"sm"}
                        color={"error"}
                        borderWeight={"light"}
                        auto
                        ghost
                        onClick={() => {
                            deleteItem(index);
                        }}
                    >
                        제거
                    </Button> : null
            }
        </div>
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
                입출력 예시 추가
            </Button>
        </>
    )
}


const ProblemCreateContent = ({desc, setDesc, title, setTitle, input, setInput, output, setOutput, inoutput, setInoutput, hint, setHint, tag, setTag}) => {
    const text = useRef("");
    const code = useRef("");
    const codeLanguage = useRef("");
    const link = useRef({textbook_id: "", indicator: ""});
    const videoUrl = useRef("");
    const input1 = useRef("");
    const output1 = useRef("");

    const selectedValue = useMemo(
        () => Array.from(tag).join(", ").replaceAll("_", " "),
        [tag]
    );

    const tagItems = [
        { key: "C", name: "C" },
        { key: "C++", name: "C++" },
        { key: "C#", name: "C#" },
        { key: "JavaScript", name: "JavaScript" },
        { key: "Python", name: "Python" },
        { key: "Java", name: "Java" },
        { key: "Html", name: "Html" },
        { key: "css", name: "css" }
    ];

    const parseData = () => {
        return (
            desc.map((content, index) => {
                if(content.type === "desc") {
                    return (
                        <div style={{ border: "1px dashed #c9c9c9" }}>
                            <Markdown children={content.description} rehypePlugins={[rehypeRaw]} />
                            <ButtonGroup index={index + 1} desc={desc} setDesc={setDesc} text={text} code={code} codeLanguage={codeLanguage}/>
                        </div>
                    )
                } else if(content.type === "code") {
                    return (
                        <div className={'body-desc'}>
                            <CodeContent key={`code-${index}`} components_item={content}/>
                            <ButtonGroup index={index + 1} desc={desc} setDesc={setDesc} text={text} code={code} codeLanguage={codeLanguage}/>
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
                    <Input label="제목 (필수)" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <ButtonGroup index={0} desc={desc} setDesc={setDesc} text={text} code={code} codeLanguage={codeLanguage} />
                {parseData()}
                <div style={styles.input} >
                    <Textarea style={styles.textarea} label="입력 설명 (필수 x)" onChange={(e) => setInput(e.target.value)} />
                </div>
                <div style={styles.input} >
                    <Textarea style={styles.textarea} label="출력 설명 (필수 x)" onChange={(e) => setOutput(e.target.value)} />
                </div>

                <div>
                    <InoutputContent inoutput={inoutput} setInoutput={setInoutput} input1={input1} output1={output1} />
                </div>

                <div style={styles.input} >
                    <Textarea style={styles.textarea} label="힌트 (필수 x)" onChange={(e) => setHint(e.target.value)} />
                </div>
                <div>
                    <Dropdown>
                        <Dropdown.Button flat>{selectedValue}</Dropdown.Button>
                        <Dropdown.Menu aria-label="Single selection actions"
                           color="secondary"
                           disallowEmptySelection
                           selectionMode="single"
                           selectedKeys={tag}
                           onSelectionChange={setTag}
                           items={tagItems}
                        >
                            {(item) => (
                                <Dropdown.Item
                                    key={item.key}
                                    color={"default"}
                                >
                                    {item.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <div>딱히 정할 언어가 없다면 Python으로 설정합니다. (해당되는 태그가 없다면 개발담당자분께 알려주세요)</div>
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

                        <div style={styles.exampleInput}>
                            <Textarea
                                label="입력예시"
                                value={input1.current.value}
                                onChange={e => {
                                    input1.current = e.target.value;
                                }}
                            />
                            <Textarea
                                width={300}
                                label="출력예시"
                                value={output1.current.value}
                                onChange={e => {
                                    output1.current = e.target.value;
                                }}
                            />
                        </div>

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
    container: {
        overflow: "auto",
        height: "90vh",
        width: "100vw",
        padding: "100px"
    },
    divider: {
        marginTop: "20px",
        marginBottom: "20px",
        paddingTop: 20,
        borderTop: "1px solid #dfdfdf"
    },
    input: {
        margin: "20px"
    },
    inoutput: {
        width: "300px",
        margin: "100px"
    },
    textarea: {
        width: "500px"
    },
    exampleInput: {
        display: 'flex',
        flexDirection: 'row',
        width: '500px',
        justifyContent: 'space-between'
    }
}

export default ProblemCreateContent;
