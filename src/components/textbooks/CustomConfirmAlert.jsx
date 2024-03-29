import React, {useState} from 'react';
import {Button, Input} from "@nextui-org/react";
import {ProblemViewer} from "./ProblemViewer";
import "@/assets/sass/Components/CustomConfirmAlert.scss";
import ProblemCreateContent from "./contents/ProblemCreateContent";
import { toast } from "react-toastify";


const CustomConfirmAlert = ({inputRef, type, handleOnclick, onClose, data}) => {
	const [desc, setDesc] = useState([]);
	const [title, setTitle] = useState("");
	const [input, setInput] = useState();
	const [output, setOutput] = useState();
	const [inoutput, setInoutput] = useState([]);
	const [hint, setHint] = useState();
	const [tag, setTag] = useState(new Set(["Python"]));
	const handleConfirm = (e) => {
		if (!e || e.key === 'Enter') {
			if (type === 'step') {
				handleOnclick(data.stepIndex, inputRef.current);
				inputRef.current = '';
				onClose();
			} else if (type === 'item' || type === 'problem') {
				handleOnclick(data.stepIndex, data.itemIndex, inputRef.current);
				inputRef.current = '';
				onClose();
			} else if (type === 'stepChange') {
				handleOnclick(data.stepIndex, inputRef.current);
				inputRef.current = '';
				onClose();
			} else if (type === 'itemChange') {
				handleOnclick(data.stepIndex, data.itemIndex, inputRef.current);
				inputRef.current = '';
				onClose();
			} else if (type === 'createProblem' && !e) {
				if (title.replace(/\s/g,'') === '') {
					toast.error("제목은 필수 항목입니다.");
					return;
				}

				handleOnclick(title, desc, input, output, inoutput, hint, tag)
					.then((res) => {
						if (res === true) {
							inputRef.current = '';
							onClose();
						}
					})
			}
		}
	}

	return (
		<div onKeyDown={e => handleConfirm(e)} style={{backgroundColor: "white", boxShadow: "0px 10px 50px -3px rgba(0, 0, 0, 0.1)", padding: "2vw 5vw 4vw 5vw", borderRadius: "3vmin"}}>
			<div style={{ marginBottom: '4vh' }}>
			{
				type === 'step' ?
					<h1>스탭 제목을 입력해주세요.</h1> :
				type === 'item' ?
					<h1>아이템 제목을 입력해주세요.</h1> :
				type === 'stepChange' || type === 'itemChange' ?
					<h1>바꿀 제목을 입력해주세요.</h1> :
				type === 'problem' ?
					<div className={"problem-dropdown-container"}>
						<ProblemViewer getProblemApi={data.getProblemApi} getProblemListApi={data.getProblemListApi} inputRef={inputRef}/>
					</div> :
				type === 'createProblem' ?
					<ProblemCreateContent desc={desc} setDesc={setDesc} title={title} setTitle={setTitle} input={input} setInput={setInput} output={output} setOutput={setOutput} inoutput={inoutput} setInoutput={setInoutput} hint={hint} setHint={setHint} tag={tag} setTag={setTag}/>
					:null
			}
			</div>
			{
				type !== 'problem' && type !== 'createProblem' ?
				<Input
					autoFocus={true}
					css={{width: "100%"}}
					bordered
					value={inputRef.current.value}
					onChange={(e) => {
						inputRef.current = e.target.value;
						}}
				/> : null
			}

			<div style={{display: "flex", flexDirection: "row", marginTop: "15px", justifyContent: "end"}}>
				<Button
					style={{marginRight: "10px"}}
					onClick={onClose}
					color={"error"}
					auto
				>
					취소
				</Button>
				<Button
					auto
					onClick={() => handleConfirm()}
				>
					확인
				</Button>
			</div>
		</div>
	);
};

export default CustomConfirmAlert;
