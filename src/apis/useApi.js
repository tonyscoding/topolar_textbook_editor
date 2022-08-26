import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import {useRecoilCallback} from "recoil";
import {
    userState
} from "@/utils/States";
import getAuthHeader from "@/apis/authHeader";

const useApi = (api, authHeader=false) => {
    const [loading, setLoading] = useState(true);
    const [resolved, setResolved] = useState();


    const callback = useRecoilCallback(({snapshot, set}) =>
            async (...args) => {
                let access_token;
                if(authHeader) {
                    access_token = (await snapshot.getPromise(userState)).token;
                }
                const {data} = await api(authHeader ? getAuthHeader(access_token) : null, ...args);
                setLoading(false);
                setResolved(data);
                return data
            },
        [],
    );
    return [loading, resolved, callback];
}

export default useApi;