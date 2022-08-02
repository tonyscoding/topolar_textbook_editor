import React from "react";
// import Button from '@/components/Button';

import { useRecoilValue, useRecoilState } from "recoil";
import { stepIndexState, itemIndexState } from "@/utils/States";
import {confirmAlert} from "react-confirm-alert";
import CustomAlert from "@/components/textbooks/CustomAlert";

import { Button } from "@nextui-org/react";
import { JSONbookState } from "../../utils/States";

export const ButtonGroup = ({
    index,
    text,
    codeLanguage,
    code,
	link,
	videoUrl,
	isCard,
	cardIndex,
}) => {
	const stepIndex = useRecoilValue(stepIndexState);
	const itemIndex = useRecoilValue(itemIndexState);
	const [JSONBook, setJSONBook] = useRecoilState(JSONbookState);

	    // 7. desc 추가
		const addDesc = (nowStepIndex, nowItemIndex, index, newDesc, cardIndex=null) => {
			let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
			const content = {
				"type": "desc",
				"description": newDesc
			}
			console.log("add", nowStepIndex, nowItemIndex, index, cardIndex)
			if(cardIndex == null) {
				newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components.splice(index, 0, content);
			} else {
				newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components[index].components.splice(cardIndex, 0, content);
			}
	
			setJSONBook(newJSONBook);
		}
		// 8. desc 수정
		// const changeDesc = (nowStepIndex, nowItemIndex, index, newDesc, cardIndex=null) => {
		// 	let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
	
		// 	if(cardIndex == null) {
		// 		newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components[index].description = newDesc;
		// 	} else {
		// 		newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components[index].components[cardIndex].description = newDesc;
		// 	}
	
		// 	setJSONBook(newJSONBook);
		// }
		// 9. code 추가
		const addCode = (nowStepIndex, nowItemIndex, index, newCode, language, cardIndex=null) => {
			let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
	
			const content = {
				"type": "code",
				"code": "~~~" + language + " \n" + newCode + "\n ~~~"
			}
	
			console.log("add", nowStepIndex, nowItemIndex, index, cardIndex)
			if(cardIndex == null) {
				newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components.splice(index, 0, content);
			} else {
				newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components[index].components.splice(cardIndex, 0, content);
			}
	
			setJSONBook(newJSONBook);
		}
		// 10. code 수정(미완성)
		const changeCode = (nowStepIndex, nowItemIndex, changeCodeIndex, newCode) => {
			let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
			newJSONBook.textbook_contents[nowStepIndex].step_items[nowItemIndex][changeCodeIndex] = newCode;
			setJSONBook(newJSONBook);
		}
		// 11. content 삭제
		const deleteJSONBookItem = (nowStepIndex, nowItemIndex, deleteIndex, cardIndex=null) => {
			let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
			console.log("delete", nowStepIndex, nowItemIndex, deleteIndex, cardIndex)
			if(cardIndex === null) {
				newJSONBook.textbook_contents[nowStepIndex].step_items[nowItemIndex].components.splice(deleteIndex, 1);
			} else {
				newJSONBook.textbook_contents[nowStepIndex].step_items[nowItemIndex].components[deleteIndex].components.splice(cardIndex, 1);
			}
	
			setJSONBook(newJSONBook);
		}
		// 12.single_card 추가
		const addSingleCard = (nowStepIndex, nowItemIndex, index) => {
			let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
	
			newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components.splice(index, 0, {
				"type": "single_card",
				"title" : "제목",
				"components": [
					{
						"type": "desc",
						"description": "수정하세요"
					}
				]
			})
			setJSONBook(newJSONBook);
		}
	
		// 13.double_card 추가
		const addDoubleCard = (nowStepIndex, nowItemIndex, index) => {
			let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
	
			newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components.splice(index, 0, {
				"type": "double_card",
				"first_components": [
					{
						"type": "desc",
						"description": "수정하세요"
					}
				],
				"second_components": [
					{
						"type": "desc",
						"description": "수정하세요"
					}
				]
			})
			setJSONBook(newJSONBook);
		}
		// 14. link 추가
		const addLink = (nowStepIndex, nowItemIndex, index, textbook_id, indicator, cardIndex=null) => {
			let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
	
			const content = {
				"type": "link",
				"textbook_id": textbook_id,
				"indicator": indicator
			}
	
			if(cardIndex === null) {
				newJSONBook.textbook_contents[nowStepIndex].step_items[nowItemIndex].components.splice(index, 0, content);
			} else {
				newJSONBook.textbook_contents[nowStepIndex].step_items[nowItemIndex].components[index].components.splice(cardIndex, 0, content);
			}
	
			setJSONBook(newJSONBook);
		}
		// 15. video 추가
		const addVideo = (nowStepIndex, nowItemIndex, index, videoUrl) => {
			let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
			newJSONBook.textbook_contents[nowStepIndex].step_items[nowItemIndex].components.splice(index, 0, {
				"type": "video",
				"url": videoUrl
			})
	
			setJSONBook(newJSONBook);
		}

	const alert = (index) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<CustomAlert
						onClose={onClose}
						message={"교재 아이디와 페이지를 모두 입력해주세요."}
					/>
				);
			}
		})
	}

	return (
		<div className={"body-buttonGroup"}>
			<Button.Group
				size={"sm"}
				color={"default"}
				flat
				ghost
				borderWeight={'light'}
			>
				<Button
					auto
					onClick={() => {
						addDesc(stepIndex, itemIndex, index, text.current ? text.current : "<p><br /></p>", isCard ? cardIndex + 1 : null);
					}}
				>
					desc 추가
				</Button>
				<Button
					auto
					onClick={() => {
						console.log("code", code);
						addCode(stepIndex, itemIndex, index, code.current, codeLanguage.current.saveName, isCard ? cardIndex + 1 : null);
					}}
				>
					code 추가
				</Button>

	
					
					<Button
						auto
						onClick={() => {
							console.log("link", link);
							if (link.current?.textbook_id && link.current?.indicator) {
								addLink(stepIndex, itemIndex, index, link.current.textbook_id, link.current.indicator, isCard ? cardIndex + 1 : null);
							} else {
								alert("교재 아이디와 페이지를 입력해주세요.");
							}
						}}
					>
						link 추가
					</Button>

					<Button
						auto
						onClick={() => {
							addVideo(stepIndex, itemIndex, index, videoUrl.current);
						}}
					>
						video 추가
					</Button>
				{
				!isCard ?
				<>
					<Button
						size="small"
						type="fill"
						color="black"
						onClick={() => {
							addSingleCard(stepIndex, itemIndex, index);
						}}
					>
						s_card 추가
					</Button>
					</>
					:
					null
				}
			</Button.Group>

			{
				(isCard ? cardIndex > -1 : index > 0)  ?
					<Button
						size={"sm"}
						color={"error"}
						borderWeight={"light"}
						auto
						ghost
						onClick={() => {
							deleteJSONBookItem(stepIndex, itemIndex, isCard ? index : index - 1, isCard ? cardIndex : null);
						}}
					>
						제거
					</Button> : null
			}


			{/*<Button*/}
			{/*	size="small"*/}
			{/*	type="fill"*/}
			{/*	color="black"*/}
			{/*	onClick={() => {*/}
			{/*		addDesc(stepIndex, itemIndex, index + 1, text.current ? text.current : "<p><br /></p>");*/}
			{/*	}}*/}
			{/*>*/}
			{/*	desc 추가*/}
			{/*</Button>*/}

			{/*<Button*/}
			{/*	size="small"*/}
			{/*	type="fill"*/}
			{/*	color="black"*/}
			{/*	onClick={() => {*/}
			{/*		addCode(stepIndex, itemIndex, index + 1, code.current, codeLanguage.current.saveName);*/}
			{/*	}}*/}
			{/*>*/}
			{/*	code 추가*/}
			{/*</Button>*/}

			{/*<Button*/}
			{/*	size="small"*/}
			{/*	type="fill"*/}
			{/*	color="black"*/}
			{/*	onClick={() => {*/}
			{/*		if (link.current?.textbook_id && link.current?.indicator) {*/}
			{/*			addLink(stepIndex, itemIndex, index + 1, link.current.textbook_id, link.current.indicator);*/}
			{/*		} else {*/}
			{/*			alert("교재 아이디와 페이지를 입력해주세요.");*/}
			{/*		}*/}
			{/*	}}*/}
			{/*>*/}
			{/*	link 추가*/}
			{/*</Button>*/}

			{/*<Button*/}
			{/*	size="small"*/}
			{/*	type="fill"*/}
			{/*	color="black"*/}
			{/*	onClick={() => {*/}
			{/*		addVideo(stepIndex, itemIndex, index + 1, videoUrl.current);*/}
			{/*	}}*/}
			{/*>*/}
			{/*	video 추가*/}
			{/*</Button>*/}

			{/*{*/}
			{/*	index > -1 ?*/}
			{/*		<Button*/}
			{/*			size="small"*/}
			{/*			type="fill"*/}
			{/*			color="red"*/}
			{/*			onClick={() => {*/}
			{/*				deleteJSONBookItem(stepIndex, itemIndex, index);*/}
			{/*			}}*/}
			{/*		>*/}
			{/*			제거*/}
			{/*		</Button> : null*/}
			{/*}*/}
		</div>
	);
}

export default ButtonGroup;
