import {useState} from "react";
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
    getCourseList, uploadFile, createTextbook, getProblem, deleteTextbook, getProblemList, updateTextbook
} from "@/apis/apiServices";
import getAuthHeader from "@/apis/authHeader";
import JSZip from "jszip";
import {languageCodeToId} from "@/utils/Utils";

const API_URL = import.meta.env.VITE_API_URL;

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
            let {data} = await getCurriculum(getAuthHeader(user?.token));
            console.log('Curriculum', data)

            for (let courseLevel in data) {
                for (let course in data[courseLevel]) {
                    data[courseLevel][course].order = parseInt(course);
                }
            }

            // 특강 처리
            data['002-ls'] = {};
            data["002-ls"]['6'] = data["002"]['6'];
            data["002-ls"]['7'] = data["002"]['7'];
            data["002-ls"]['8'] = data["002"]['8'];

            delete data["002"]['6'];
            delete data["002"]['7'];
            delete data["002"]['8'];

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

export const useUpdateTextbookCallback = () => {
    const user = useRecoilValue(userState);
    const jsonBook = useRecoilValue(JSONbookState);

    return useRecoilCallback(({snapshot, set}) =>
            async (id) => {
                const json = JSON.stringify(jsonBook, null, "\t");

                const zip = new JSZip();
                zip.file('textbook.json', json);
                zip.generateAsync({type:"blob"})
                    .then(async function(file) {
                        console.log(file)
                        let formData = new FormData();

                        formData.append("file", file);
                        formData.append("textbook_type", "2");

                        const {data} = await updateTextbook(getAuthHeader(user?.token), formData, id);

                        console.log(data);
                });
            },
        [user, jsonBook],
    );
}

export const useDeleteTextbookCallback = () => {
    const user = useRecoilValue(userState);
    return useRecoilCallback(({snapshot, set}) =>
            async (id) => {
                const {data} = await deleteTextbook(getAuthHeader(user?.token), id);
                console.log(data);
            },
        [user],
    );
}

export const useUploadTextbookCallback = () => {
    const user = useRecoilValue(userState);
    const jsonBook = useRecoilValue(JSONbookState);

    return useRecoilCallback(({snapshot, set}) =>
            async (textbook) => {
                const parseJsonBook = JSON.parse(JSON.stringify(jsonBook));
                parseJsonBook.textbook_title = textbook.name;
                parseJsonBook.textbook_subtitle = {
                    stage: textbook.stage,
                    language: textbook.language,
                    level: textbook.level
                }
                const json = JSON.stringify(parseJsonBook, null, "\t");
                console.log("final jsonBook",parseJsonBook);
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

                        if (textbook?.language_code === '002-ls') {
                            textbook.language_code = '002';
                        }

                        let textbookFormData = new FormData();
                        textbookFormData.append("name", textbook.name);
                        textbookFormData.append("level", textbook.level);
                        textbookFormData.append("course", textbook.course);
                        textbookFormData.append("stage", "1");
                        textbookFormData.append("language_code", textbook.language_code);
                        textbookFormData.append("language", languageCodeToId(textbook.language_code));
                        textbookFormData.append("order_num", textbook.order_num);
                        textbookFormData.append("is_essential", "false");
                        textbookFormData.append("file", data.id);


                        const {res} = await createTextbook(getAuthHeader(user?.token), textbookFormData);
                    });
            },
        [user, jsonBook],
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

export const useGetProblemListCallback = () => {
    const [loading, setLoading] = useState(true);
    const [resolved, setResolved] = useState();
    const callback = useRecoilCallback(({snapshot, set}) =>
            async () => {
                const user = snapshot.getPromise(userState);
                const {data} = await getProblemList(getAuthHeader(user?.token));

                setLoading(false);
                setResolved(data);
                return data
            },
        [user],
    );
    return [loading, resolved, callback];
}