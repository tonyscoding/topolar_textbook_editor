import React, {useEffect, useState} from 'react';
import Loader from "@/components/guideComponents/Loader";
import { Dropdown } from "@nextui-org/react";
import useApi from "../../apis/useApi";
import {getProblemList} from "../../apis/apiServices";
import ProblemContent from "./contents/ProblemContent";

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
        console.log("useeffect", selectedValue)
        listCallback()
            .then(r => {
                console.log(r);
                setListLoading(false);
                setListResolved(r);
            })
            .catch((err) => {console.log(err)})
    },[])

    useEffect(() => {
        if(selectedValue!=="default") {
            console.log("problemViewer", inputRef);
            problemCallback(selectedValue)
                .then(r => {
                    console.log("problem", r);
                    setProblemLoading(false);
                    setProblemResolved(r);
                })
        }

    },[JSON.stringify(select)]);

    useEffect(() => {
        console.log("listLoading", listLoading);
        // problemCallback()
    },[listLoading]);

    return(
        <>
            {
                listLoading ? (
                    <div>
                        <Loader/>
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

                                        <Dropdown.Item key={problem.number}>{problem.number} {problem.title}</Dropdown.Item>
                                    ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        {
                            problemLoading ? (
                                <Loader/>
                            ) : (
                                <>
                                    <div>
                                        {problemResolved.description}
                                    </div>
                                    <hr/>
                                    <div>
                                        {problemResolved.input}
                                    </div>
                                    <hr/>
                                    <div>
                                        {problemResolved.output}
                                    </div>
                                </>
                            )
                        }
                        </>
                )
            }
        </>
    )
}