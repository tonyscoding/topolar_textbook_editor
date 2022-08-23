import {useRecoilCallback} from "recoil";
import {curriculumState, userState} from "@/utils/States";
import {getCurriculum, getTextbookListByLevel, login} from "@/apis/apiServices";
import useAuthHeader from "@/apis/authHeader";

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
    const authHeader = useAuthHeader();
    return useRecoilCallback(({snapshot, set}) =>
        async () => {
            const {data} = await getCurriculum(authHeader);
            console.log(data)
            set(curriculumState, data);
        },
        [],
    );
}

export const useTextbookListByLevelCallback = () => {
    const authHeader = useAuthHeader();
    return useRecoilCallback(({snapshot, set}) =>
            async (curriculum, textbookLevel) => {
                const {data} = await getTextbookListByLevel(authHeader, curriculum, textbookLevel);
                console.log(data)
                set(curriculumState, data);
            },
        [],
    );
}