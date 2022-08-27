import React, {useEffect, useState} from 'react';
import { Button, Input } from "@nextui-org/react";
import { FiX } from "react-icons/all";

const TextbookUploadAlert = ({ onClose, data, upload, orderRef, titleRef }) => {
    const [language, setLanguage] = useState("");

    useEffect(() => {
        if (data.order) orderRef.current.value = data.order;

        for (let item in data.courseList) {
            if (data.courseList[item].id == data.language) {
                setLanguage(data.courseList[item].name)
                break;
            }
        }
    }, []);

    return (
        <div style={styles.container}>
            <div
                onClick={onClose}
                style={{display: 'flex', justifyContent: 'end', cursor: 'pointer'}}
            >
                <FiX size={30} />
            </div>
            <div style={styles.inputContainer}>
                <div style={styles.inputItem}>
                    <div>과목</div>
                    <div>{language}</div>
                </div>
                <div style={styles.inputItem}>
                    <div>레벨</div>
                    <div>{data.level}</div>
                </div>
                <div style={styles.inputItem}>
                    <div>순서</div>
                    <Input
                        type={"number"}
                        style={{width: '20vw'}}
                        ref={orderRef}
                        onChange={(e) => orderRef.current.value = e.target.value}
                    />
                </div>
                <div style={styles.inputItem}>
                    <div>교재명</div>
                    <Input
                        type="text"
                        style={{width: '20vw'}}
                        ref={titleRef}
                    />
                </div>
            </div>

            <div style={styles.buttonContainer}>
                <Button
                    style={{marginRight: "10px", width: "100%"}}
                    auto
                    onClick={() => {
                        upload();
                        onClose();
                    }}
                >
                    확인
                </Button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: "white",
        boxShadow: "0px 10px 50px -3px rgba(0, 0, 0, 0.1)",
        padding: "2vw 4vw 2vw 4vw",
        borderRadius: "3vmin",
        width: "40vw",
        fontSize: 20,
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: "15px",
        justifyContent: "center"
    },
    inputContainer: {
        width: '90%'
    },
    inputItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    }
}

export default TextbookUploadAlert;
