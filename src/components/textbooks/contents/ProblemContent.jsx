import React, {useEffect, useState} from "react";

import CodeContent from "./CodeContent";
import { Card } from "@/components/guideComponents/Card";
import {getProblem} from "@/apis/apiServices";
import useApi from "@/apis/useApi";
import CardContent from "./CardContent";
import { ColorRing } from "react-loader-spinner";


const ProblemContent = ({number, count_for_key}) => {
    const [loading, resolved, callback] = useApi(getProblem, true);
    const [inoutput, setInoutput] = useState([]);

    useEffect(() => {
        console.log("ProblemContent", number);
        callback(number);
    },[])

    useEffect(() => {
        if(resolved) {
            console.log("getProblem", resolved);
            console.log("inoutput", resolved.inoutput_ex);
            setInoutput(JSON.parse(resolved.inoutput_ex))
        }
    },[resolved])

    // useEffect(() => {
    //     if(resolved) {
    //         console.log("getProblem", resolved);
    //         console.log("inoutput", resolved.inoutput_ex);
    //         setInoutput(JSON.parse(resolved.inoutput_ex))
    //     }
    //
    //
    // },[resolved])

    return (
        <>
            {
                loading ? (
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
                    <div className={"problem-container"}>
                        <div className={"problem-title"}>{resolved.title}</div>
                        <CardContent data={{components: JSON.parse(resolved.description)}} edit={false}/>
                        {
                            resolved.input && (
                                <>
                                    <div className={"problem-label"}>입력 설명</div>
                                    <Card
                                        width={ "guide-col8" }
                                        hideLine={0}
                                    >
                                        <div>{resolved.input}</div>
                                    </Card>
                                </>

                            )
                        }
                        {
                            resolved.output && (
                                <>
                                    <div className={"problem-label"}>출력 설명</div>
                                    <Card
                                        width={ "guide-col8" }
                                        hideLine={0}
                                    >
                                        <div>{resolved.output}</div>

                                    </Card>
                                </>
                            )
                        }

                        {
                            inoutput.map((content, idx) => (
                                <div className={"problem-inoutput"} key={resolved.title+count_for_key+idx} >
                                    <Card
                                        width={"guide-col4"}
                                        hideLine={0}
                                        style={{marginBottom: "20px", width: "49%"}}
                                    >
                                        <div>입력예시</div>
                                        <CodeContent components_item={{"code": "~~~plantext \n"+content.input}} count_for_key={count_for_key}/>

                                    </Card>
                                    <Card
                                        width={"guide-col4"}
                                        hideLine={0}
                                        style={{marginBottom: "20px", width: "49%"}}
                                    >
                                        <div>출력예시</div>
                                        <CodeContent components_item={{"code": "~~~plantext \n"+content.output}} count_for_key={count_for_key}/>

                                    </Card>
                                </div>
                            ))
                        }
                        {
                            resolved.hint && (
                                <>
                                    <div className={"problem-label"}>힌트</div>
                                    <Card
                                        width={ "guide-col8" }
                                        hideLine={0}
                                    >

                                        <div>{resolved.hint}</div>

                                    </Card>
                                </>
                            )
                        }


                    </div>
                )
            }

        </>
    );
}

export default ProblemContent;
