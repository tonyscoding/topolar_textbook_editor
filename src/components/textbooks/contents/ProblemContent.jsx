import React, {useEffect, useState} from "react";

import CodeContent from "./CodeContent";
import { Card } from "@/components/guideComponents/Card";
import Loader from "@/components/guideComponents/Loader";
import { useGetProblemCallback } from "@/apis/apiCallbackes"


const ProblemContent = ({number, count_for_key}) => {
    // const [loading, resolved, rejected, problem] = useApi(getProblem)
    const [loading, resolved, callback] = useGetProblemCallback();
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
                    <div>
                        <Loader/>
                    </div>
                ) : (
                    <div className={"problem-container"}>
                        <div className={"problem-title"}>{resolved.title}</div>
                        <Card
                            width={ "guide-col8" }
                            hideLine={0}
                        >
                            <div>{resolved.description}</div>

                        </Card>
                        <Card
                            width={ "guide-col8" }
                            hideLine={0}
                        >
                            <div>{resolved.input}</div>

                        </Card>
                        <Card
                            width={ "guide-col8" }
                            hideLine={0}
                        >
                            <div>{resolved.output}</div>

                        </Card>

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
                    </div>
                )
            }

        </>
    );
}

export default ProblemContent;