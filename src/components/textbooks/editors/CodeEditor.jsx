import React, {useEffect, useRef, useState} from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";

import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";

import CodeLanguageSelectBox from "@/components/textbooks/editors/CodeLanguageSelectBox";

export const CodeEditor = (props) => {
	const [codeLanguage, setCodeLanguage] = useState({
		displayName: "Python",
		saveName: "python",
		codeEditorName: "python"
	});

	useEffect(() => {
		props.codeLanguage.current = codeLanguage;
	}, [codeLanguage]);


	const [code, setCode] = useState("");

	const options = [
		{
			displayName: "Python",
			saveName: "python",
			codeEditorName: "python"
		},
		{
			displayName: "C++",
			saveName: "cpp",
			codeEditorName: "c_cpp"
		},
		{
			displayName: "Java",
			saveName: "java",
			codeEditorName: "java"
		},
		{
			displayName: "Javascript",
			saveName: "javascript",
			codeEditorName: "javascript"
		},
		{
			displayName: "html",
			saveName: "html",
			codeEditorName: "html"
		},
		{
			displayName: "css",
			saveName: "css",
			codeEditorName: "css"
		}
	];

	return (
		<div style={{display: "flex", flexDirection: "row"}}>
			<CodeLanguageSelectBox codeLanguage={codeLanguage} setCodeLanguage={setCodeLanguage} options={options}  />
			<AceEditor
				style={{width: "100%", marginLeft: "1vw"}}
				mode={codeLanguage.codeEditorName}
				theme="tomorrow"
				name="blah2"
				onChange={(e) => {
					setCode(e);
					props.code.current = e;
				}}
				fontSize={14}
				showPrintMargin={true}
				showGutter={true}
				highlightActiveLine={true}
				value={code}
				setOptions={{
					enableBasicAutocompletion: true,
					enableLiveAutocompletion: true,
					enableSnippets: true,
					showLineNumbers: true,
					tabSize: 4,
					useWorker: false
				}}/>
		</div>
	)
}

export default CodeEditor;

