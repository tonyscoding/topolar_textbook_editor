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
    getCourseList, uploadFile, createTextbook
} from "@/apis/apiServices";
import getAuthHeader from "@/apis/authHeader";
import JSZip from "jszip";

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

export const useUploadTextbookCallback = path => {
    const user = useRecoilValue(userState);
    const jsonBook = useRecoilValue(JSONbookState);

    return useRecoilCallback(({snapshot, set}) =>
            async (textbook) => {
                const json = JSON.stringify(jsonBook, null, "\t");

                const zip = new JSZip();
                zip.file('textbook.json', json);
                zip.generateAsync({type:"blob"})
                    .then(async function(file) {

                        console.log(file)
                        let formData = new FormData();

                        formData.append("file", file);
                        formData.append("textbook_type", "2");

                        const {data} = await uploadFile(getAuthHeader(user?.token), formData);
                        console.log(data);

                        let textbookFormData = new FormData();
                        textbookFormData.append("name", textbook.name);
                        textbookFormData.append("level", textbook.level);
                        textbookFormData.append("course", textbook.course);
                        textbookFormData.append("stage", "1");
                        textbookFormData.append("language_code", textbook.language_code);
                        textbookFormData.append("language", textbook.language);
                        textbookFormData.append("order_num", textbook.order_num);
                        textbookFormData.append("is_essential", "false");
                        textbookFormData.append("file", data.id);

                        const {res} = await createTextbook(getAuthHeader(user?.token), textbookFormData);
                        console.log(res);
                });
            },
        [user, jsonBook],
    );
}