import React, {useEffect, useState} from 'react';
import { Dropdown } from "@nextui-org/react";
import rehypeRaw from "rehype-raw";
import Markdown from "react-markdown";
import { ColorRing } from "react-loader-spinner";

export const ProblemViewer = ({getProblemApi, getProblemListApi, inputRef}) => {
    const [select, setSelect] = useState(new Set(["default"]));
    const [listLoading, setListLoading] = useState(true);
    const [listResolved, setListResolved] = useState();
    const [problemLoading, setProblemLoading] = useState(true);
    const [problemResolved, setProblemResolved] = useState();

    const [_, __, listCallback] = getProblemListApi;
    const [___, ____, problemCallback] = getProblemApi;

    const selectedValue = React.useMemo(
        () => Array.from(select).join(", ").replaceAll("_", " "),
        [select]
    );

    useEffect(() => {
        listCallback()
            .then(r => {
                setListLoading(false);
                setListResolved(r);
            })
            .catch((err) => {console.log(err)})
    },[])

    useEffect(() => {
        if (selectedValue !== "default") {
            problemCallback(selectedValue)
                .then(r => {
                    setProblemLoading(false);
                    setProblemResolved(r);
                })
        }

    },[JSON.stringify(select)]);

    return(
        <>
            {
                listLoading ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
                        <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        />
                    </div>
                ) : (
                    <>

                        <Dropdown>
                            <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
                                {select}
                            </Dropdown.Button>
                            <Dropdown.Menu
                                aria-label="Single selection actions"
                                color="secondary"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={select}
                                onSelectionChange={(value)=>{
                                    console.log("value",value)
                                    inputRef.current=Array.from(value).join(", ").replaceAll("_", " "),
                                    setSelect(value);
                                    setProblemLoading(true);
                                }}
                            >
                                <Dropdown.Item key={"default"}>선택하세요</Dropdown.Item>
                                {
                                    listResolved.map((problem, idx) => (

                                        <Dropdown.Item key={problem.id}>{problem.id}-{problem.title}</Dropdown.Item>
                                    ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        {
                            problemLoading ? (
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
                                    <ColorRing
                                        visible={true}
                                        height="80"
                                        width="80"
                                        ariaLabel="blocks-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="blocks-wrapper"
                                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                    />
                                </div>
                            ) : (
                                <div style={{overflow: 'scroll', height: '500px'}}>
                                    <div>
                                        {JSON.parse(problemResolved.description).map((item) => {
                                            if(item.type === "desc") {
                                                return <Markdown children={item.description} rehypePlugins={[rehypeRaw]} />
                                            }
                                        })}
                                    </div>
                                    <hr/>
                                    <div>
                                        {problemResolved.input}
                                    </div>
                                    <hr/>
                                    <div>
                                        {problemResolved.output}
                                    </div>
                                </div>
                            )
                        }
                        </>
                )
            }
        </>
    )
}
