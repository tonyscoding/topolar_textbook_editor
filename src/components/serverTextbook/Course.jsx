import React, {useEffect} from 'react';
import { useRecoilValue } from "recoil";
import { curriculumState } from "@/utils/States";

const Course = ({
    selectedCourse,
    setSelectedLanguage,
    setSelectedLevel,
}) => {
    const curriculum = useRecoilValue(curriculumState);

    const levelBackground = {
        "0": "#e0e0e0",
        "1": "#bdbdbd",
        "2": "#9e9e9e",
        "3": "#616161",
        "4": "#424242",
        "5": "#212121",
    }

    return (
        <div style={styles.courseContainer}>
            {
                curriculum[selectedCourse] ?
                    Object.keys(curriculum[selectedCourse]).sort().map((course, index) => {
                        return (
                            <div key={course.id} style={styles.courseItem}>
                                <div style={styles.courseText}>
                                    {curriculum[selectedCourse][course].name}
                                </div>

                                <div style={styles.levelContainer}>
                                    {
                                        Object.keys(curriculum[selectedCourse][course].content).map((levelItem, index) => {
                                            return (
                                                <div key={levelItem.id} style={styles.levelItem} onClick={() => {
                                                    setSelectedLanguage(course);
                                                    setSelectedLevel(levelItem);
                                                }}>
                                                    <div style={styles.levelItemInfo}>
                                                        <div style={{...styles.levelText, backgroundColor: levelBackground[levelItem]}}>
                                                            LV.{levelItem}
                                                        </div>
                                                        <div style={styles.levelTitle}>
                                                            {curriculum[selectedCourse][course].content[levelItem]}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        >
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }) : null
            }
        </div>
    );
};

const styles = {
    courseContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '5%',
        marginRight: '5%',
    },
    courseItem: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px',
        width: '100%',
    },
    courseText: {
        fontSize: '20px',
        fontWeight: 'bold',
    },
    levelContainer: {
        marginTop: '20px',
    },
    levelItem: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15,
        justifyContent: 'space-between',
        width: '100%',
        cursor: 'pointer',
    },
    levelItemInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    levelText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 25,
        borderRadius: 7,
        color: 'white',
        fontWeight: 600,
        marginRight: 10,
    },
    levelTitle: {
        fontWeight: 500,
    }
}

export default Course;
