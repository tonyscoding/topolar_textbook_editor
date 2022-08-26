import React from 'react';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { curriculumState, levelItemState } from "@/utils/States";


const headerItem = {
    "001": "모험가",
    "002": "개척가",
    "003": "숙련가",
}

const Header = ({
    selectedCourse,
    setSelectedCourse,
    setSelectedLanguage,
    setSelectedLevel,
}) => {
    const curriculum = useRecoilValue(curriculumState);
    const setLevelItem = useSetRecoilState(levelItemState);

    return (
        <div style={styles.header}>
            <div style={styles.headerItems}>
                {
                    Object.keys(curriculum).sort().map((item, index) => {
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
                                {headerItem[item]}
                            </div>
                        )
                    })
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
        width: '40%',
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
