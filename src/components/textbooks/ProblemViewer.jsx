import React, {useEffect, useRef, useState} from 'react';
import {Dropdown, Input} from "@nextui-org/react";
import rehypeRaw from "rehype-raw";
import Markdown from "react-markdown";
import { ColorRing } from "react-loader-spinner";

const languageItems = [
    { key: "C", name: "C" },
    { key: "C++", name: "C++" },
    { key: "C#", name: "C#" },
    { key: "JavaScript", name: "JavaScript" },
    { key: "Python", name: "Python" },
    { key: "Java", name: "Java" },
    { key: "Html", name: "Html" },
    { key: "css", name: "css" }
];

export const ProblemViewer = ({getProblemApi, getProblemListApi, inputRef}) => {
    const [select, setSelect] = useState(new Set(["default"]));
    const [listLoading, setListLoading] = useState(true);
    const [listResolved, setListResolved] = useState();
    const [problemLoading, setProblemLoading] = useState(true);
    const [problemResolved, setProblemResolved] = useState();
    const [listFiltered, setListFiltered] = useState();
    const [language, setLanguage] = useState(new Set(["default"]));
    const [title, setTitle] = useState("");

    const titleRef = useRef(null);

    const [_, __, listCallback] = getProblemListApi;
    const [___, ____, problemCallback] = getProblemApi;

    const selectedValue = React.useMemo(
        () => Array.from(select).join(", ").replaceAll("_", " "),
        [select]
    );

    const selectedLanguage = React.useMemo(
        () => Array.from(language).join(", ").replaceAll("_", " "),
        [language]
    );

    useEffect(() => {
        listCallback()
            .then(r => {
                setListResolved(r);
                setListFiltered(r);
                setListLoading(false);
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

    useEffect(() => {
        console.log("language",selectedLanguage);
        let filteredData = listResolved;
        if(!listLoading) {
            if(selectedLanguage !== "default") {
                filteredData = filteredData.filter(el => el.tag === selectedLanguage || el.tag === "태그 선택") // 태그를 선택하지 않고 업로드하면 '태그 선택' 으로 저장되어있음(~1.14.1) (+1.14.2에서 수정)
            }
            if(title !== "") {
                filteredData = filteredData.filter(el => el.title.includes(title))
            }
        }
        setListFiltered(filteredData);
    }, [language, title, listLoading])

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
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Input
                                ref={titleRef}
                                onChange={(e) => titleRef.current.value = e.target.value}
                                placeholder="문제 제목"
                                onBlur={() => setTitle(titleRef.current.value)}
                            />
                            <div style={{marginLeft: 24}}>언어 :</div>
                            <Dropdown>
                                <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
                                    {language}
                                </Dropdown.Button>
                                <Dropdown.Menu
                                    color="secondary"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={language}
                                    onSelectionChange={(value)=>{
                                        setLanguage(value);
                                    }}
                                >
                                    <Dropdown.Item key={"default"}>모두</Dropdown.Item>
                                    {
                                        languageItems.map((language, idx) => (

                                            <Dropdown.Item key={language.name}>{language.name}</Dropdown.Item>
                                        ))
                                    }
                                </Dropdown.Menu>
                            </Dropdown>

                            <div style={{marginLeft: 24}}>문제:</div>
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
                                        listFiltered.map((problem, idx) => (

                                            <Dropdown.Item key={problem.id}>{problem.id}-{problem.title}</Dropdown.Item>
                                        ))
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
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
