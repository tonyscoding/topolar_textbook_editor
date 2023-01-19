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
import {LANGUAGE_CODE_TO_ID} from "@/utils/Utils";
import {MEDIA_URL} from "@/apis/apiServices";

export const useLoginCallback = () => {
    return useRecoilCallback(({snapshot, set}) =>
        async (body) => {
            const {data} = await login(body);
            document.cookie=`accountId=${data.user.id}`;
            set(userState, data);
        }, [],
    );
}

export const useCurriculumCallback = () => {
    const user = useRecoilValue(userState);
    return useRecoilCallback(({snapshot, set}) =>
        async () => {
            let {data} = await getCurriculum(getAuthHeader(user?.token));

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
        }, [user],
    );
}

export const useGetTextbookListByLevelCallback = () => {
    const user = useRecoilValue(userState);
    return useRecoilCallback(({snapshot, set}) =>
        async (curriculum, textbookLevel) => {
            const {data} = await getTextbookListByLevel(getAuthHeader(user?.token), curriculum, textbookLevel);
            set(levelItemState, data);
        }, [user],
    );
}

export const useGetJSONTextbookCallback = () => {
    const user = useRecoilValue(userState);

    const getBase64FromUrl = async (url) => {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
            }
        });
    }

    return useRecoilCallback(({snapshot, set}) =>
        async (id) => {
            const {data} = await getTextbook(getAuthHeader(user?.token), id);
            if (data) {
                const jsonBook = await getJSONTextbook(getAuthHeader(user?.token), data.file.id);

                let newJsonBook = jsonBook.data.data.textbook_content;
                for (let i = 0; i < newJsonBook.textbook_contents.length; i++) {
                    for (let j = 0; j < newJsonBook.textbook_contents[i].step_items.length; j++) {
                        for (let k = 0; k < newJsonBook.textbook_contents[i].step_items[j].components.length; k++) {
                            if (newJsonBook.textbook_contents[i].step_items[j].components[k].type === "image") {
                                const binary = await getBase64FromUrl(`${MEDIA_URL}/textbooks/${newJsonBook.textbook_contents[i].step_items[j].components[k].src}`);

                                newJsonBook.textbook_contents[i].step_items[j].components[k] = {
                                    "type": "desc",
                                    "description": "<p><img src=\"" + binary + "\" /></p>"
                                };
                            }
                        }
                    }
                }

                // URL+'/uploads/textbooks/'+components_item.src

                set(stepIndexState, 0);
                set(itemIndexState, 0);
                set(JSONbookState, jsonBook.data.data.textbook_content);
            }
        }, [user],
    );
}

export const useGetCourseListCallback = () => {
    const user = useRecoilValue(userState);
    return useRecoilCallback(({snapshot, set}) =>
        async () => {
            const {data} = await getCourseList(getAuthHeader(user?.token));
            set(courseListState, data.response[0])
        }, [user],
    );
}

export const useUpdateTextbookCallback = () => {
    const user = useRecoilValue(userState);
    const jsonBook = useRecoilValue(JSONbookState);

    return useRecoilCallback(({snapshot, set}) =>
        async (id) => {
            const textbookInfo = await getTextbook(getAuthHeader(user?.token), id);

            const json = JSON.stringify(jsonBook, null, "\t");
            const zip = new JSZip();
            zip.file('textbook.json', json);
            zip.generateAsync({type:"blob"})
                .then(async function(file) {
                    let formData = new FormData();

                    formData.append("file", file, `${textbookInfo.data.language.name}_${textbookInfo.data.level}_${textbookInfo.data.order_num}_${textbookInfo.data.name}.zip`);
                    formData.append("textbook_type", "2");

                    const {data} = await updateTextbook(getAuthHeader(user?.token), formData, id);
            });
        }, [user, jsonBook],
    );
}

export const useDeleteTextbookCallback = () => {
    const user = useRecoilValue(userState);
    return useRecoilCallback(({snapshot, set}) =>
        async (id) => {
            const {data} = await deleteTextbook(getAuthHeader(user?.token), id);
        }, [user],
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
            const zip = new JSZip();
            zip.file('textbook.json', json);
            zip.generateAsync({type:"blob"})
                .then(async function(file) {
                    let formData = new FormData();

                    formData.append("file", file, `${textbook.language}_${textbook.level}_${textbook.order_num}_${textbook.name}.zip`);
                    formData.append("textbook_type", "2");

                    const {data} = await uploadFile(getAuthHeader(user?.token), formData);

                    if (textbook?.language_code === '002-ls') {
                        textbook.language_code = '002';
                    }

                    let textbookFormData = new FormData();
                    textbookFormData.append("name", textbook.name);
                    textbookFormData.append("level", textbook.level);
                    textbookFormData.append("course", textbook.course);
                    textbookFormData.append("stage", "1");
                    textbookFormData.append("language_code", textbook.language_code);
                    textbookFormData.append("language", LANGUAGE_CODE_TO_ID[textbook.language_code]);
                    textbookFormData.append("order_num", textbook.order_num);
                    textbookFormData.append("is_essential", "false");
                    textbookFormData.append("file", data.id);


                    const {res} = await createTextbook(getAuthHeader(user?.token), textbookFormData);
                });
        }, [user, jsonBook],
    );
}

export const useGetProblemCallback = () => {
    const user = useRecoilValue(userState);
    const [loading, setLoading] = useState(true);
    const [resolved, setResolved] = useState();
    const callback = useRecoilCallback(({snapshot, set}) =>
        async (number) => {
            const {data} = await getProblem(getAuthHeader(user?.token), number);

            setLoading(false);
            setResolved(data);
            return data
        }, [user],
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
            }, [user],
    );
    return [loading, resolved, callback];
}
