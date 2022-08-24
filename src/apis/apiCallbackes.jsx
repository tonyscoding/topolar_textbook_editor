import {useRecoilCallback, useRecoilValue} from "recoil";
import {curriculumState, JSONbookState, levelItemState, userState} from "@/utils/States";
import {getTextbookListByLevel, login, getCurriculum, getJSONTextbook, getTextbook} from "@/apis/apiServices";
import getAuthHeader from "@/apis/authHeader";
import {useState} from "react";
import {getProblem} from "@/apis/apiServices";

export const useLoginCallback = () => {
    return useRecoilCallback(({snapshot, set}) =>
        async (body) => {
            const {data} = await login(body);
            document.cookie=`accountId=${data.user.id}`;
            console.log(data)
            set(userState, data);
        },
        [],
    );
}

export const useCurriculumCallback = () => {
    const user = useRecoilValue(userState);
    return useRecoilCallback(({snapshot, set}) =>
        async () => {
            const {data} = await getCurriculum(getAuthHeader(user?.token));
            console.log(data)
            set(curriculumState, data);
        },
        [user],
    );
}

export const useGetTextbookListByLevelCallback = () => {
    const user = useRecoilValue(userState);
    return useRecoilCallback(({snapshot, set}) =>
            async (curriculum, textbookLevel) => {
                const {data} = await getTextbookListByLevel(getAuthHeader(user?.token), curriculum, textbookLevel);
                console.log(data)
                set(levelItemState, data);
            },
        [user],
    );
}

export const useGetJSONTextbookCallback = () => {
    const user = useRecoilValue(userState);
    return useRecoilCallback(({snapshot, set}) =>
            async (id) => {
                const {data} = await getTextbook(getAuthHeader(user?.token), id);
                console.log(data)
                if (data) {
                    const jsonBook = await getJSONTextbook(getAuthHeader(user?.token), data.file.id);
                    console.log(jsonBook)
                    set(JSONbookState, jsonBook.data.data.textbook_content);
                }
            },
        [user],
    );
}

export const useGetProblemCallback = () => {
    const user = useRecoilValue(userState);
    const [loading, setLoading] = useState(true);
    const [resolved, setResolved] = useState();
    const callback = useRecoilCallback(({snapshot, set}) =>
            async (number) => {
                console.log("problem callback", number);
                const {data} = await getProblem(getAuthHeader(user?.token), number);

                setLoading(false);
                setResolved(data);
                return data
            },
        [user],
    );
    return [loading, resolved, callback];
}