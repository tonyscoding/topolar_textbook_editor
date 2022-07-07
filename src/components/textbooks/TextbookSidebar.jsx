import React, { useCallback, useEffect, useReducer, useState, useContext } from 'react';
import TextbookOutline from "@/components/textbooks/TextbookOutline";

import { ImageContext } from '@/contexts/ImageContext';

import { saveImage, loadImage, saveTextbook, loadTextbook } from "@/helpers/electronFileSystem";

import '@/assets/sass/Curriculum/TextbookSidebar.scss'

const TextbookSidebar = ({
     toggleSidebar=null,
     isOpen = true,
     textbookCompleteCallback = null,
     stepIndicator = 0,
     setStepIndicator = null,
     JSONBook = null,
     setJSONBook = null,

 }) => {
    const [viewType, setViewType] = useState(0);
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
            <span className="textbook-sidebar-toggle" onClick={()=>{toggleSidebar(false)}}>
            close
            </span>

            <TextbookOutline stepIndicator={stepIndicator} setStepIndicator={setStepIndicator} JSONBook={JSONBook}/>
            <hr></hr>
            <button onClick={() => {setJSONBook(loadTextbook())}}>퀵로드</button>
            <br></br>
            <hr></hr>
            json파일 로드<input type="file" name="json" onChange={onJsonChange}/>

            <br></br>
            <hr></hr>
            <button onClick={downloadJson}> json 변환 </button>
            <br></br>
            <hr></hr>
            이미지파일 한번에 업로드 : <input type="file" name="myImage" onChange={onFolderChange} directory="" webkitdirectory="" multiple=""/>
        </div>
    )

}

export default TextbookSidebar