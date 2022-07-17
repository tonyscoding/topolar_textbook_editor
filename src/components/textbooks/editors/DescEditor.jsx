import React, {useRef, useState} from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "@/components/textbooks/editors/EditorToolbar";
import "react-quill/dist/quill.snow.css";


export const DescEditor = (props) => {
	const toolbar = useRef(false);

	const handleChange = (newText) => {
		props.text.current = newText;
	}

	return (
		<div className="text-editor">
			<EditorToolbar
				onFocus={() => toolbar.current = true}
				onBlur={() => toolbar.current = false}
			/>
			<ReactQuill
				value={props.text.current}
				onChange={handleChange}
				placeholder={props.placeholder}
				modules={modules}
				formats={formats}
				theme="snow"
				style={{height:"250px"}}
				onBlur={() => {
					if (!toolbar.current && props.handleBlur) {
						props.handleBlur();
					}
				}}
			/>
		</div>
	);
};

export default DescEditor;
