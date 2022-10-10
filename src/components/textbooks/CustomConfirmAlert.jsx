import React from 'react';
import {Button, Input} from "@nextui-org/react";
import {ProblemViewer} from "./ProblemViewer";
import "@/assets/sass/Components/CustomConfirmAlert.scss";
import ProblemCreateContent from "./contents/ProblemCreateContent";


const CustomConfirmAlert = ({inputRef, type, handleOnclick, onClose, data}) => {
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
			}
		}
	}

	return (
		<div onKeyDown={e => handleConfirm(e)} style={{backgroundColor: "white", boxShadow: "0px 10px 50px -3px rgba(0, 0, 0, 0.1)", padding: "2vw 5vw 4vw 5vw", borderRadius: "3vmin"}}>
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
				type === 'problemCreate' ?
					<ProblemCreateContent/>
					:null
			}
			{
				type !== 'problem' ?
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
