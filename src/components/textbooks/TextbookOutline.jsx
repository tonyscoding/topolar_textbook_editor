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

	const stepAddClick = (stepIndex) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<CustomConfirmAlert
						inputRef={inputRef}
						onClose={onClose}
						handleOnclick={addStep}
						type={"step"}
						data={{"stepIndex": stepIndex + 1}}
					/>
				);
			}
		})
	}

	const stepChangeClick = (stepIndex) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<CustomConfirmAlert
						inputRef={inputRef}
						onClose={onClose}
						handleOnclick={setStep}
						type={"stepChange"}
						data={{"stepIndex": stepIndex}}
					/>
				);
			}
		})
	}

	const itemAddClick = (stepIndex, itemIndex) => {
		// smalltalk
		// .prompt('Question', '아이템 제목을 입력해주세요.', '')
		// .then((value) => {
		//     console.log(value);
		//     addItem(value, stepIndex, itemIndex + 1)
		// })
		// .catch((e) => {
		//     console.log(e)
		// });

		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<CustomConfirmAlert
						inputRef={inputRef}
						onClose={onClose}
						handleOnclick={addItem}
						type={"item"}
						data={{"stepIndex": stepIndex, "itemIndex": itemIndex + 1}}
					/>
				);
			}
		})
	}

	const itemChangeClick = (stepIndex, itemIndex) => {
		// smalltalk
		// .prompt('Question', '바꿀 제목을 입력해주세요.', '')
		// .then((value) => {
		//     console.log(value);
		//     setItem(value, stepIndex, itemIndex)
		// })
		// .catch((e) => {
		//     console.log(e)
		// });

		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<CustomConfirmAlert
						inputRef={inputRef}
						onClose={onClose}
						handleOnclick={setItem}
						type={"itemChange"}
						data={{"stepIndex": stepIndex, "itemIndex": itemIndex}}
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
					<div key={step.title + CurrentIndex} className={"textbook-step" + (stepIndicator==CurrentIndex?" current" : "")}
					     onClick={()=>{setStepIndicator(CurrentIndex)}} onMouseEnter={() => {setHoverItemIndex(itemIndex)}} onMouseLeave={() => {setHoverItemIndex(null)}}>
						- {step.title}

						{hoverItemIndex === itemIndex && hoverStepIndex === stepIndex &&
							<div>
								<button onClick={() => {itemAddClick(stepIndex, itemIndex)}}>아이템 추가</button>
								<button onClick={() => {deleteItem(stepIndex, itemIndex)}}>아이템 제거</button>
								<button onClick={() => {itemChangeClick(stepIndex, itemIndex)}}>아이템 이름 변경</button>
							</div>
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
							<div>
								<button onClick={() => {stepAddClick(stepIndex)}}>스탭 추가</button>
								<button onClick={() => {deleteStep(stepIndex)}}>스탭 제거</button>
								<button onClick={() => {stepChangeClick(stepIndex)}}>스탭 이름 변경</button>
							</div>
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
				<button onClick={() => {stepAddClick(-1)}}>스탭 추가</button>
			</div>
			{parsedJSONBook}
		</>
	)
}

export default TextbookOutline
