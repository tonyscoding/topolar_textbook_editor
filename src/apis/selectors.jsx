import {selector, selectorFamily} from "recoil";
import {Token, tokenState} from "@apis/atoms";
import {login} from "@apis/apiServices";
import {curriculumState} from "@/utils/States";
import {LOGIN_FAILURE, CURRICULUMS_GET_ERROR} from "@/apis/types";
import {getCurriculum} from "@/apis/apiServices";

export const loginSelector = selectorFamily({
    key: 'loginSelector',
    get: (body) => async ({}) => {
        return login(body)
            .then((response) => response.data)
            .catch(err => LOGIN_FAILURE);
    }
})

export const curriculumSelector = selectorFamily({
    key: 'curriculumSelector',
    get: (body) => async ({}) => {
        return getCurriculum(body)
            .then((response) => response.data)
            .catch(err => CURRICULUMS_GET_ERROR);
    }
})