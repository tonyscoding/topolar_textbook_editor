import React, {useEffect, useState} from 'react';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { curriculumState, levelItemState } from "@/utils/States";


const headerItem = {
    "001": {
        name: "모험가",
        order: 1
    },
    "002": {
        name: "개척가",
        order: 2
    },
    "003": {
        name: "숙련가",
        order: 3
    },
    '002-ls': {
        name: "특강",
        order: 4
    },
}

const Header = ({
    selectedCourse,
    setSelectedCourse,
    setSelectedLanguage,
    setSelectedLevel,
}) => {
    const curriculum = useRecoilValue(curriculumState);
    const setLevelItem = useSetRecoilState(levelItemState);

    const [curriculumKeys, setCurriculumKeys] = useState([]);

    useEffect(() => {
        if (curriculum) {
            setCurriculumKeys(Object.keys(curriculum).sort((a, b) => {
                return headerItem[a].order - headerItem[b].order;
            }));
        }
    }, [curriculum]);


    return (
        <div style={styles.header}>
            <div style={styles.headerItems}>
                {
                    curriculumKeys ?
                    curriculumKeys.map((item, index) => {
                        return (
                            <div
                                key={item.id}
                                style={selectedCourse === item ? styles.selected : null}
                                onClick={() => {
                                    setSelectedCourse(item);
                                    setSelectedLanguage(null);
                                    setSelectedLevel(null);
                                    setLevelItem({});
                                }}
                            >
                                {headerItem[item].name}
                            </div>
                        )
                    }) : null
                }
            </div>
        </div>
    );
};

const styles = {
    container: {
        marginTop: '20%',
    },
    header: {
        display: 'flex',
        width: '100%',
        borderBottom: '1px solid #c9c9c9',
    },
    headerItems: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        marginLeft: '5%',
        cursor: 'pointer',
    },
    selected: {
        fontWeight: 'bold',
        borderBottom: '2px solid #03c1d4',
        paddingBottom: '10px',
    },
}

export default Header;
