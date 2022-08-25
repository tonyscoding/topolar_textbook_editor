import React from 'react';
import { useRecoilValue } from "recoil";
import { curriculumState } from "@/utils/States";

const Course = ({
    selectedCourse,
    setSelectedLanguage,
    setSelectedLevel,
}) => {
    const curriculum = useRecoilValue(curriculumState);

    return (
        <div style={styles.courseContainer}>
            <div>
                {
                    curriculum[selectedCourse] ?
                        Object.keys(curriculum[selectedCourse]).sort().map((course, index) => {
                            return (
                                <div key={course.id} style={styles.courseItem}>
                                    <div style={styles.courseText}>
                                        {curriculum[selectedCourse][course].name}
                                    </div>

                                    <div>
                                        {
                                            Object.keys(curriculum[selectedCourse][course].content).map((levelItem, index) => {
                                                return (
                                                    <div key={levelItem.id} style={styles.levelItem} onClick={() => {
                                                        setSelectedLanguage(course);
                                                        setSelectedLevel(levelItem);
                                                    }}>
                                                        <div>lv. {levelItem}</div>
                                                        <div style={styles.textbookText}>
                                                            {curriculum[selectedCourse][course].content[levelItem]}
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
        </div>
    );
};

const styles = {
    courseContainer: {
        display: 'flex',
        marginLeft: '5%',
        marginRight: '5%',
    },
    courseItem: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    courseText: {
        fontSize: '20px',
        fontWeight: 'bold',
    },
    levelItem: {
        display: 'flex',
        flexDirection: 'row'
    },
}

export default Course;
