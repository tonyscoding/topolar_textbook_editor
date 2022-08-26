import React, {useEffect} from 'react';
import Loader from "@/components/guideComponents/Loader";
import useApi from "@/apis/useApi";
import {getProblemList} from "@/apis/apiServices";

export const ProblemViewer = () => {
    const [loading, resolved, callback] = useApi(getProblemList, true);

    useEffect(() => {
        callback()
    },[])

    return(
        <>
            {
                loading ? (
                    <div>
                        <Loader/>
                    </div>
                ) : (
                    <div>
                        {
                            resolved.map((problem, idx) => (
                                <div>
                                    <li>{problem.number} {problem.title}</li>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}