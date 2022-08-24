import {useRecoilCallback, useRecoilValue} from "recoil";
import {
    courseListState,
    curriculumState,
    itemIndexState,
    JSONbookState,
    levelItemState,
    stepIndexState,
    userState
} from "@/utils/States";
import {
    getTextbookListByLevel,
    login,
    getCurriculum,
    getJSONTextbook,
    getTextbook,
    getCourseList
} from "@/apis/apiServices";
import getAuthHeader from "@/apis/authHeader";

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
                    set(stepIndexState, 0);
                    set(itemIndexState, 0);
                    set(JSONbookState, jsonBook.data.data.textbook_content);
                }
            },
        [user],
    );
}

export const useGetCourseListCallback = () => {
    const user = useRecoilValue(userState);
    return useRecoilCallback(({snapshot, set}) =>
            async () => {
                const {data} = await getCourseList(getAuthHeader(user?.token));
                console.log(data);
                set(courseListState, data.response[0])
            },
        [user],
    );
}