import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import {useRecoilCallback} from "recoil";
import {
    userState
} from "@/utils/States";
import getAuthHeader from "@/apis/authHeader";
import { toast } from "react-toastify";

const useApi = (api, authHeader=false) => {
    const [loading, setLoading] = useState(true);
    const [resolved, setResolved] = useState();


    const callback = useRecoilCallback(({snapshot, set}) =>
            async (...args) => {
                let access_token;
                if(authHeader) {
                    access_token = (await snapshot.getPromise(userState)).token;
                }
                const {data} = await api(authHeader ? getAuthHeader(access_token) : null, ...args)
                    .catch((err) => {
                        toast.error(
                    `[${err.response.status}] ${err.response.data?.error?.detail}`,
                            { autoClose: 5000 }
                        );
                    });
                setResolved(data);
                setLoading(false);
                return data
            },
        [],
    );
    return [loading, resolved, callback];
}

export default useApi;
