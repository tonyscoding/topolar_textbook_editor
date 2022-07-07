import React from 'react';
import {Button, Input} from "@nextui-org/react";

const CustomConfirmAlert = ({inputRef, type, handleOnclick, onClose, data}) => {
	return (
		<div style={{backgroundColor: "white", boxShadow: "0px 10px 50px -3px rgba(0, 0, 0, 0.1)", padding: "2vw 5vw 4vw 5vw", borderRadius: "3vmin"}}>
			{
				type === 'step' ?
					<h1>스탭 제목을 입력해주세요.</h1> :
				type === 'item' ?
					<h1>아이템 제목을 입력해주세요.</h1> :
				type === 'stepChange' || type === 'itemChange' ?
					<h1>바꿀 제목을 입력해주세요.</h1> : null
			}
			<Input
				css={{width: "100%"}}
				bordered
				value={inputRef.current.value}
				onChange={(e) => {
					inputRef.current = e.target.value;
				}}
			/>
			<div style={{display: "flex", flexDirection: "row", marginTop: "15px", justifyContent: "end"}}>
				<Button
					style={{marginRight: "10px"}}
					auto
					onClick={() => {
						if (type === 'step') {
							handleOnclick(inputRef.current, data.stepIndex);
							inputRef.current = '';
							onClose();
						}
						else if (type === 'item') {
							handleOnclick(inputRef.current, data.stepIndex, data.itemIndex);
							inputRef.current = '';
							onClose();
						}
						else if (type === 'stepChange') {
							handleOnclick(inputRef.current, data.stepIndex);
							inputRef.current = '';
							onClose();
						}
						else if (type === 'itemChange') {
							handleOnclick(inputRef.current, data.stepIndex, data.itemIndex);
							inputRef.current = '';
							onClose();
						}
					}}
				>
					확인
				</Button>
				<Button
					onClick={onClose}
					color={"error"}
					auto
				>
					취소
				</Button>
			</div>
		</div>
	);
};

export default CustomConfirmAlert;
