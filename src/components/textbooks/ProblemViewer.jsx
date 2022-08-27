import React, {useEffect, useState} from 'react';
import Loader from "@/components/guideComponents/Loader";
import {Dropdown, Option} from "../guideComponents/Dropdown";
import useApi from "../../apis/useApi";
import {getProblemList} from "../../apis/apiServices";
import ProblemContent from "./contents/ProblemContent";

export const ProblemViewer = ({getProblemApi, getProblemListApi, inputRef}) => {
    const [select, setSelect] = useState();
    const [listLoading, setListLoading] = useState(true);
    const [listResolved, setListResolved] = useState();
    const [problemLoading, setProblemLoading] = useState(true);
    const [problemResolved, setProblemResolved] = useState();

    const [_, __, listCallback] = getProblemListApi;
    const [___, ____, problemCallback] = getProblemApi;

    useEffect(() => {
        console.log("useeffect")
        listCallback()
            .then(r => {
                console.log(r);
                setListLoading(false);
                setListResolved(r);
            })
            .catch((err) => {console.log(err)})
    },[])

    useEffect(() => {
        console.log("problemViewer", inputRef);
        problemCallback(inputRef.current)
            .then(r => {
                console.log("problem", r);
                setProblemLoading(false);
                setProblemResolved(r);
            })
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
                        <Dropdown
                            className={"problem-dropdown"}
                            value={select}
                            onChange={(value)=>{
                                console.log("value",value)
                                inputRef.current=value.value;
                                setSelect(value);
                                setProblemLoading(true);
                            }}
                            placeholder="선택해 주세요"
                            font="body-2"
                        >
                        {
                            listResolved.map((problem, idx) => (

                                        <Option value={problem.number}>{problem.number} {problem.title}</Option>
                            ))
                        }
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