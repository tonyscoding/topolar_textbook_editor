import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import '@/assets/sass/Curriculum/TextbookOutline.scss'

import { confirmAlert } from "react-confirm-alert";
import {Button, Dropdown, Input, Spacer} from "@nextui-org/react";
import CustomConfirmAlert from "@/components/textbooks/CustomConfirmAlert ";

import {useRecoilState, useRecoilValue} from "recoil";
import {stepIndexState, itemIndexState, languageListState} from "@/utils/States";
import useApi from "../../apis/useApi";
import {getLanguage, getProblem, getProblemList, postProblem} from "@/apis/apiServices";
import {JSONbookState} from "@/utils/States";
import {ENG_LEVEL_TO_KR, KR_LANGUAGE_TO_ENG} from "@/utils/Utils";
import { toast } from "react-toastify";

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
	const languageList = useRecoilValue(languageListState);

	const [hoverStepIndex, setHoverStepIndex] = useState(null);
	const [hoverItemIndex, setHoverItemIndex] = useState(null);

	const [parsedJSONBook, setParsedJSONBook] = useState(null);

	const [postProblemLoading, postProblemResolved, postProblemCallback] = useApi(postProblem, true);

	const [stage, setStage] = useState("Adventaurer");
	const [language, setLanguage] = useState("Python");
	const [level, setLevel] = useState(1);

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

	const createProblem = async (title, desc, input, output, inoutput, hint, tag) => {
		tag = Array.from(tag).join(", ").replaceAll("_", " ");
		const res = await postProblemCallback({
			title: title,
			description: JSON.stringify(desc),
			input: input,
			output: output,
			inoutput_ex: JSON.stringify(inoutput),
			hint: hint,
			tag: tag
		})
			.then((res) => {
				toast.success(`[${res?.title}] 문제가 정상적으로 업로드되었습니다.`);
				return true;
			})
			.catch((e) => {
				return false;
			})

		return res;
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

	const problemCreateClick = () => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<CustomConfirmAlert
						inputRef={inputRef}
						onClose={onClose}
						handleOnclick={createProblem}
						type={"createProblem"}
					/>
				);
			}
		})
	}

	const parseTextbook = (textbook) => {
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
					{textbookContents}
				</div>
			</div>
		)
	}

	return (
		<>
			<div style={{ marginLeft: "10px" }}>
				<div style={{ fontSize: 24, fontWeight: 700, marginBottom: "10px" }}>{JSONBook.textbook_title}</div>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<div
						style={{
							fontSize: 14,
							border: "1px solid #252525",
							borderRadius: 5,
							padding: "2px 10px 2px 10px",
							marginRight: "4px"
						}}
					>
						{ENG_LEVEL_TO_KR[JSONBook.textbook_subtitle.stage]}
					</div>

					<div
						style={{
							fontSize: 14,
							border: "1px solid #252525",
							borderRadius: 5,
							padding: "2px 10px 2px 10px",
							marginRight: "4px"
						}}
					>
						{JSONBook.textbook_subtitle.language}
					</div>

					<div
						style={{
							fontSize: 14,
							border: "1px solid #252525",
							borderRadius: 5,
							padding: "2px 10px 2px 10px",
							marginRight: "4px"
						}}
					>
						LV.{JSONBook.textbook_subtitle.level}
					</div>
				</div>
			</div>

			<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
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

				<Button
					onClick={() => {problemCreateClick()}}
					size={"sm"}
					color={"primary"}
				>
					문제 생성
				</Button>
			</div>
			{parsedJSONBook}
		</>
	)
}

export default TextbookOutline
