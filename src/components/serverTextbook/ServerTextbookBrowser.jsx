import React, { useEffect, useState } from 'react';
import { useRecoilValue } from "recoil";
import { levelItemState } from "@/utils/States";
import { useGetJSONTextbookCallback, useGetTextbookListByLevelCallback } from "@/apis/apiCallbackes";
import Header from "@/components/serverTextbook/Header";
import Course from "@/components/serverTextbook/Course";
import Level from "@/components/serverTextbook/Level";

const ServerTextbookBrowser = () => {
    const levelItem = useRecoilValue(levelItemState);

    const [selectedCourse, setSelectedCourse] = useState('002');
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [selectedLevel, setSelectedLevel] = useState();
    const [selectedJSONBookId, setSelectedJSONBookId] = useState(null);

    const getTextbookListByLevel = useGetTextbookListByLevelCallback();
    const getJSONTextbook = useGetJSONTextbookCallback();

    useEffect(() => {
        if (selectedLevel) {
            getTextbookListByLevel(selectedLanguage, selectedLevel);
        }
    }, [selectedLevel]);

    useEffect(() => {
        if (selectedJSONBookId) {
            getJSONTextbook(selectedJSONBookId);
        }
    }, [selectedJSONBookId]);


    return (
        <div style={styles.container}>
            <Header
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
                setSelectedLanguage={setSelectedLanguage}
                setSelectedLevel={setSelectedLevel}
            />

            {
                selectedCourse && selectedLanguage && levelItem ? (
                    // 코스, 언어, 레벨이 선택되었을 때 레벨에 해당하는 교재 리스트를 보여준다.
                    <Level
                        selectedLanguage={selectedLanguage}
                        selectedLevel={selectedLevel}
                        setSelectedJSONBookId={setSelectedJSONBookId}
                    />
                ) : (
                    // 아닐 때에는 언어, 레벨을 선택할 수 있도록 해준다.
                    <Course
                        selectedCourse={selectedCourse}
                        setSelectedLanguage={setSelectedLanguage}
                        setSelectedLevel={setSelectedLevel}
                    />
                )
            }

        </div>
    );
};

const styles = {
    container: {
        marginTop: '20%',
    }
}

export default ServerTextbookBrowser;
