import React, {useEffect, useRef, useState} from "react";

import {Input} from "@nextui-org/react";
import CodeContent from "./CodeContent";
import rehypeRaw from "rehype-raw";
import Markdown from "react-markdown";
import reactHtmlParser from "react-html-parser";
import DescEditor from "../editors/DescEditor";
import CodeEditor from "../editors/CodeEditor";
import LinkEditor from "../editors/LinkEditor";
import VideoEditor from "../editors/VideoEditor";
import ReactQuill from "react-quill";


const DescContent = ({desc}) => {
    return (
        desc.map((content) => {

            if(content.type === "desc") {
                return (
                    <Markdown children={content.description} rehypePlugins={[rehypeRaw]} />
                )
            } else if(content.type === "code") {
                return (
                    <CodeContent components_item={content.code}/>
                )
            }

        })
    )
}


const ProblemCreateContent = () => {
    const [desc, setDesc] = useState([{"type":"desc","description":"<p>두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.</p>"}])
    const text = useRef("");
    const code = useRef("");
    const codeLanguage = useRef("");
    const link = useRef({textbook_id: "", indicator: ""});
    const videoUrl = useRef("");

    return (
        <>

            <div>
                <div>
                    <Input clearable bordered labelPlaceholder="Title" initialValue="NextUI" />
                </div>
                <DescContent desc={desc}/>
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

                    {/*<div style={styles.divider}>*/}
                    {/*    <CodeEditor codeLanguage={codeLanguage} code={code} />*/}
                    {/*</div>*/}

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
    }
}

export default ProblemCreateContent;