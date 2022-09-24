import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import '@/assets/sass/Curriculum/TextbookOutline.scss'

import { confirmAlert } from "react-confirm-alert";
import {Button, Input, Spacer} from "@nextui-org/react";
import CustomConfirmAlert from "./CustomConfirmAlert";

import {useRecoilState, useRecoilValue} from "recoil";
import { stepIndexState, itemIndexState } from "@/utils/States";
import useApi from "../../apis/useApi";
import {getProblem, getProblemList} from "../../apis/apiServices";
import {JSONbookState} from "@/utils/States";

const TextbookOutline = ({
     movePage,
     addStep,
     deleteStep,
     changeStepTitle,
     addItem,
     deleteItem,
     changeItemTitle,
	addProblem
 }) => {
	const stepIndex = useRecoilValue(stepIndexState);
	const itemIndex = useRecoilValue(itemIndexState);

	const [hoverStepIndex, setHoverStepIndex] = useState(null);
	const [hoverItemIndex, setHoverItemIndex] = useState(null);

	const [parsedJSONBook, setParsedJSONBook] = useState(null);
	const textbookTitle = useRef(null);
	const inputRef = useRef('');

	const getProblemListApi = useApi(getProblemList, true);
	const getProblemApi = useApi(getProblem, true);

	const [JSONBook, setJSONBook] = useRecoilState(JSONbookState);

	useEffect(() => {
		setParsedJSONBook(parseTextbook(JSONBook));
	}, [JSON.stringify(JSONBook)]);

	useEffect(() => {
		setParsedJSONBook(parseTextbook(JSONBook));
	}, [hoverStepIndex, hoverItemIndex, stepIndex, itemIndex]);

	const setTextbookTitle = (e) => {
		textbookTitle.current = e.target.value;
		console.log(e.target.value)
	}

	const changeTextbookTitle = () => {
		let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
		newJSONBook.textbook_title = textbookTitle.current
		setJSONBook(newJSONBook);
	}

	const stepAddClick = (index) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<CustomConfirmAlert
						inputRef={inputRef}
						onClose={onClose}
						handleOnclick={addStep}
						type={"step"}
						data={{"stepIndex": index}}
					/>
				);
			}
		})
	}

	const stepChangeClick = (index) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<CustomConfirmAlert
						inputRef={inputRef}
						onClose={onClose}
						handleOnclick={changeStepTitle}
						type={"stepChange"}
						data={{"stepIndex": index}}
					/>
				);
			}
		})
	}

	const itemAddClick = (stepIdx, itemIdx) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<CustomConfirmAlert
						inputRef={inputRef}
						onClose={onClose}
						handleOnclick={addItem}
						type={"item"}
						data={{"stepIndex": stepIdx, "itemIndex": itemIdx}}
					/>
				);
			}
		})
	}

	const itemChangeClick = (stepIdx, itemIdx) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<CustomConfirmAlert
						inputRef={inputRef}
						onClose={onClose}
						handleOnclick={changeItemTitle}
						type={"itemChange"}
						data={{"stepIndex": stepIdx, "itemIndex": itemIdx}}
					/>
				);
			}
		})
	}

	const problemAddClick = (stepIdx, itemIdx) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<CustomConfirmAlert
						inputRef={inputRef}
						onClose={onClose}
						handleOnclick={addProblem}
						type={"problem"}
						data={{"stepIndex": stepIdx, "itemIndex": itemIdx, "getProblemApi": getProblemApi, "getProblemListApi": getProblemListApi}}
					/>
				);
			}
		})
	}

	const parseTextbook = (textbook) =>{
		let index = -1
		const textbookContents = textbook.textbook_contents.map((step_dict, nowStepIndex)=>{
			const textbookSteps = step_dict.step_items.map((step, nowItemIndex)=>{
				index += 1
				const CurrentIndex = index;

				return(
					<div key={step.title + CurrentIndex}
					     className={"textbook-step" + (nowStepIndex === stepIndex && nowItemIndex === itemIndex ? " current" : "")}
					     onClick={()=>{
							 movePage(nowStepIndex, nowItemIndex);
						 }}
					     onMouseEnter={() => {
							 setHoverItemIndex(nowItemIndex)
						 }}
					     onMouseLeave={() => {
							 setHoverItemIndex(null)
						 }}
					     style={{display: "flex", flexDirection: "column"}}
					>
						- {step.title}

						{hoverItemIndex === nowItemIndex && hoverStepIndex === nowStepIndex &&
							<Button.Group size="xs" ghost color="gradient">
								<Button
									onClick={() => {itemAddClick(nowStepIndex, nowItemIndex)}}
								>
									아이템 추가
								</Button>
								<Button
									onClick={() => {deleteItem(nowStepIndex, nowItemIndex)}}
								>
									아이템 제거
								</Button>
								<Button
									onClick={() => {itemChangeClick(nowStepIndex, nowItemIndex)}}
								>
									아이템 이름 변경
								</Button>
								<Button
									onClick={() => {problemAddClick(nowStepIndex, nowItemIndex)}}
								>
									문제 추가
								</Button>
							</Button.Group>
						}
					</div>
				)
			})

			return(
				<>
					<div className="textbook-steps" key={'textbook_steps_' + nowStepIndex} onMouseEnter={() => {setHoverStepIndex(nowStepIndex)}} onMouseLeave={() => {setHoverStepIndex(null)}}>
						<div className="textbook-step-title"> Step {step_dict.step_no}. {step_dict.step_title}</div>
						<div className="textbook-step-container">{textbookSteps}</div>
						{hoverStepIndex === nowStepIndex && !step_dict.step_items.length &&
							<Button
								onClick={() => {
									itemAddClick(nowStepIndex, 0)
								}}
								size={"sm"}
								ghost
								color={"gradient"}
								css={{marginLeft: "6px"}}
							>
								아이템 추가
							</Button>
						}
						{hoverStepIndex === nowStepIndex &&
							<Button.Group size="sm" ghost color="gradient">
								<Button
									onClick={() => {stepAddClick(nowStepIndex)}}
								>
									스탭 추가
								</Button>
								<Button
									onClick={() => {deleteStep(nowStepIndex)}}
								>
								스탭 제거
								</Button>
								<Button
									onClick={() => {stepChangeClick(nowStepIndex)}}
								>
								스탭 이름 변경
								</Button>
							</Button.Group>
						}
					</div>
				</>
			)
		})

		return (
			<div className="textbook-outline">
				<div className="textbook-contents">
					<Spacer y={1}/>
					<div className="textbook-title-container">
						<Input className="textbook-title-input" width="250px" size="sm" clearable bordered label="교재 제목" placeholder="제목을 설정해주세요" initialValue={JSONBook.textbook_title} onChange={(value) => {setTextbookTitle(value)}}/>
						<Button className="textbook-title-button" size="sm" onClick={changeTextbookTitle}>수정</Button>
					</div>

					{textbookContents}
				</div>
			</div>
		)
	}

	return (
		<>
			<div>
				<Button
					onClick={() => {
						stepAddClick(-1)
					}}
					size={"sm"}
					color={"gradient"}
					ghost
				>
					스탭 추가
				</Button>
			</div>
			{parsedJSONBook}
		</>
	)
}

export default TextbookOutline
