import React, { useContext } from 'react';
import TextbookOutline from "@/components/textbooks/TextbookOutline";

import { ImageContext } from '@/contexts/ImageContext';

import { saveImage, loadImage, saveTextbook, loadTextbook } from "@/helpers/electronFileSystem";

import '@/assets/sass/Curriculum/TextbookSidebar.scss'
import {Button} from "@nextui-org/react";
import { FiUpload, FiDownload, FiRefreshCcw } from "react-icons/fi";


const TextbookSidebar = ({
     toggleSidebar=null,
     isOpen = true,
     textbookCompleteCallback = null,
     JSONBook = null,
     setJSONBook = null,
     movePage,
     addStep,
     deleteStep,
     changeStepTitle,
     addItem,
     deleteItem,
     changeItemTitle
 }) => {
    const { imageLib, setImageLib, addImageLib } = useContext(ImageContext);

    const downloadJson = () => {
        const saveText = JSON.stringify(JSONBook, null, "\t");

        // file setting
        const text = saveText;
        const name = "textbook.json";
        const type = "text/plain";

        // create file
        const a = document.createElement("a");
        const file = new Blob([text], { type: type });
        a.href = URL.createObjectURL(file);
        a.download = name;
        document.body.appendChild(a);
        a.click();
        // a.remove();
        console.log(JSONBook)
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const onFolderChange = async (event) => {
        const os = window.require('os');
        let files = event.target.files;
        for(const file of files) {
            let folders, name;
            console.log("platform: ",os.platform())
            if (os.platform() === "win32") {
                folders = file.path.split('\\');
                name = folders[folders.length-2] + "/" + folders[folders.length-1];
            } else {
                folders = file.path.split('/');
                name = folders[folders.length-2] + "/" + folders[folders.length-1];
            }
            //saveImage(name, await toBase64(file));
            const binary = await toBase64(file);
            addImageLib(name, binary);
            console.log(name);
        }
    }

    const onJsonChange = (event) => {
        var reader = new FileReader();
        let json = event.target.files[0];

        var success = function ( content ) {
            console.log( JSON.parse(content) );
            setJSONBook(JSON.parse(content))
        }

        reader.onload = function ( event ) { success( event.target.result ) };
        reader.readAsText( json );
    }

    console.log("isopen" , isOpen)

    return (
        <div className={"textbook-sidebar" + (isOpen? "" : " closed") + (textbookCompleteCallback? " fixed" : "")}>
            <Button
                style={{"position": "absolute", "top": "0", "right": "0"}}
                onClick={()=>{toggleSidebar(false)}}
                size={"sm"}
                color={"error"}
            >
                close
            </Button>

            <TextbookOutline
                JSONBook={JSONBook}
                movePage={movePage}
                addStep={addStep}
                deleteStep={deleteStep}
                changeStepTitle={changeStepTitle}
                addItem={addItem}
                deleteItem={deleteItem}
                changeItemTitle={changeItemTitle}
            />
            <hr></hr>
            <Button.Group color={"gradient"} ghost>
                <Button>
                    <FiDownload style={{marginRight: 10}}/>
                    <label htmlFor={"input-file"} style={{marginTop: 10}}>
                        파일 로드
                    </label>
                    <input type="file" name="json" onChange={onJsonChange} id={"input-file"} style={{display: 'none'}}/>
                </Button>
                <Button onClick={downloadJson}>
                    <FiUpload style={{marginRight: 10}}/>
                    <div>json 변환</div>
                </Button>
                <Button onClick={() => {setJSONBook(loadTextbook())}}>
                    <FiRefreshCcw style={{marginRight: 10}}/>
                    <div>퀵로드</div>
                </Button>
            </Button.Group>
            <hr></hr>
            <Button.Group color={'gradient'}>
                <Button ghost>
                    <label htmlFor={"get-images"} style={{marginTop: 10}}>
                        이미지파일 한번에 업로드
                    </label>
                    <input type="file" name="myImage" id="get-images" onChange={onFolderChange} directory="" webkitdirectory="" multiple="" style={{display: 'none'}} />
                </Button>
            </Button.Group>
        </div>
    )

}

export default TextbookSidebar
