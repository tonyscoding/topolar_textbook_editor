import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import '@/assets/sass/Curriculum/TextbookOutline.scss'

import { TextbookContext } from '@/contexts/TextbookContext';

import { confirmAlert } from "react-confirm-alert";
import { Button, Input } from "@nextui-org/react";
import CustomConfirmAlert from "./CustomConfirmAlert";

import {useRecoilState} from "recoil";
import { stepIndexState, itemIndexState, pageIndicatorState } from "@/utils/States";

const TextbookOutline = ({
     JSONBook,
     movePage,
     addStep,
     deleteStep,
     changeStepTitle,
     addItem,
     deleteItem,
     changeItemTitle
 }) => {
	const [stepIndex, setStepIndex] = useRecoilState(stepIndexState);
	const [itemIndex, setItemIndex] = useRecoilState(itemIndexState);
	const [pageIndicator, setPageIndicator] = useRecoilState(pageIndicatorState);

	const [hoverStepIndex, setHoverStepIndex] = useState(null);
	const [hoverItemIndex, setHoverItemIndex] = useState(null);

	const [parsedJSONBook, setParsedJSONBook] = useState(null);
	const inputRef = useRef('');

	useEffect(() => {
		setParsedJSONBook(parseTextbook(JSONBook));
	}, [JSON.stringify(JSONBook)]);

	useEffect(() => {
		setParsedJSONBook(parseTextbook(JSONBook));
	}, [hoverStepIndex, hoverItemIndex, stepIndex, itemIndex]);

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
			<div className = "textbook-outline">
				<div className="textbook-contents">
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
