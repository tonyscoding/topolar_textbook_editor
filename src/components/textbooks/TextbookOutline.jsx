import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import '@/assets/sass/Curriculum/TextbookOutline.scss'

import { TextbookContext } from '@/contexts/TextbookContext';
// import smalltalk from 'smalltalk';
import { confirmAlert } from "react-confirm-alert";
import { Button, Input } from "@nextui-org/react";
import CustomConfirmAlert from "./CustomConfirmAlert";


const TextbookOutline = ({
     stepIndicator,
     setStepIndicator,
     JSONBook,
 }) => {
	const [hoverStepIndex, setHoverStepIndex] = useState(null);
	const [hoverItemIndex, setHoverItemIndex] = useState(null);
	const { setIndex, addStep, setStep, deleteStep, addItem, setItem, deleteItem } = useContext(TextbookContext);

	const [parsedJSONBook, setParsedJSONBook] = useState(null);
	const inputRef = useRef('');

	useEffect(() => {
		setParsedJSONBook(parseTextbook(JSONBook));
	}, [JSONBook]);

	useEffect(() => {
		setParsedJSONBook(parseTextbook(JSONBook));
	}, [hoverStepIndex, hoverItemIndex]);

	const stepAddClick = (index) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<CustomConfirmAlert
						inputRef={inputRef}
						onClose={onClose}
						handleOnclick={addStep}
						type={"step"}
						data={{"stepIndex": index + 1}}
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
						handleOnclick={setStep}
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
						data={{"stepIndex": stepIdx, "itemIndex": itemIdx + 1}}
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
						handleOnclick={setItem}
						type={"itemChange"}
						data={{"stepIndex": stepIdx, "itemIndex": itemIdx}}
					/>
				);
			}
		})
	}

	const parseTextbook = (textbook) =>{
		let index = -1
		const textbookContents = textbook.textbook_contents.map((step_dict, stepIndex)=>{
			const textbookSteps = step_dict.step_items.map((step, itemIndex)=>{
				index +=1
				const CurrentIndex = index;
				if(stepIndicator==CurrentIndex) {
					setIndex(stepIndex, itemIndex);
				}
				return(
					<div key={step.title + CurrentIndex}
					     className={"textbook-step" + (stepIndicator==CurrentIndex?" current" : "")}
					     onClick={()=>{
							 setStepIndicator(CurrentIndex)
						 }}
					     onMouseEnter={() => {
							 setHoverItemIndex(itemIndex)
						 }}
					     onMouseLeave={() => {
							 setHoverItemIndex(null)
						 }}
					     style={{display: "flex", flexDirection: "column"}}
					>
						- {step.title}

						{hoverItemIndex === itemIndex && hoverStepIndex === stepIndex &&
							<Button.Group size="xs" ghost color="gradient">
								<Button
									onClick={() => {itemAddClick(stepIndex, itemIndex)}}
								>
									아이템 추가
								</Button>
								<Button
									onClick={() => {deleteItem(stepIndex, itemIndex)}}
								>
									아이템 제거
								</Button>
								<Button
									onClick={() => {itemChangeClick(stepIndex, itemIndex)}}
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
					<div className="textbook-steps" key={'textbook_steps_'+stepIndex} onMouseEnter={() => {setHoverStepIndex(stepIndex)}} onMouseLeave={() => {setHoverStepIndex(null)}}>
						<div className="textbook-step-title"> Step {step_dict.step_no}. {step_dict.step_title}</div>
						<div className="textbook-step-container">{textbookSteps}</div>
						{hoverStepIndex === stepIndex && !step_dict.step_items.length && <button onClick={() => {itemAddClick(stepIndex, 0)}}>아이템 추가</button>}
						{hoverStepIndex === stepIndex &&
							<Button.Group size="sm" ghost color="gradient">
								<Button
									onClick={() => {stepAddClick(stepIndex)}}
								>
									스탭 추가
								</Button>
								<Button
									onClick={() => {deleteStep(stepIndex)}}
								>
								스탭 제거
								</Button>
								<Button
									onClick={() => {stepChangeClick(stepIndex)}}
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
