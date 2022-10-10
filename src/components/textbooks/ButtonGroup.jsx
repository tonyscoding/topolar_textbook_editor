import React from "react";
// import Button from '@/components/Button';

import { useRecoilValue, useRecoilState } from "recoil";
import { stepIndexState, itemIndexState } from "@/utils/States";
import {confirmAlert} from "react-confirm-alert";
import CustomAlert from "@/components/textbooks/CustomAlert";

import { Button } from "@nextui-org/react";
import {JSONbookState, quickLoadState} from "@/utils/States";
import {saveTextbook} from "@/helpers/electronFileSystem";

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
	const quickLoad = useRecoilValue(quickLoadState);

	const handleSaveTextbook = (newJSONBook) => {
		if(quickLoad) {
			saveTextbook(newJSONBook);
		}
	}

	// desc 추가
	const addDesc = (nowStepIndex, nowItemIndex, index, newDesc, cardIndex=null) => {
		let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
		const content = {
			"type": "desc",
			"description": newDesc
		}

		if(cardIndex == null) {
			newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components.splice(index, 0, content);
		} else {
			newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components[index].components.splice(cardIndex, 0, content);
		}
		let str = JSON.stringify(newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components);
		str = str.replaceAll("\\\"", "'");
		str = str.replaceAll("\"", "\\\"");
		str = str.replaceAll("'", "\\\"");
		console.log(str)

		handleSaveTextbook(newJSONBook);
		setJSONBook(newJSONBook);
	}

	// code 추가
	const addCode = (nowStepIndex, nowItemIndex, index, newCode, language, cardIndex=null) => {
		let newJSONBook = JSON.parse(JSON.stringify(JSONBook));

		const content = {
			"type": "code",
			"code": "~~~" + language + " \n" + newCode + "\n ~~~"
		}

		if(cardIndex == null) {
			newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components.splice(index, 0, content);
		} else {
			newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components[index].components.splice(cardIndex, 0, content);
		}

		console.log(JSON.stringify(newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components))

		handleSaveTextbook(newJSONBook);
		setJSONBook(newJSONBook);
	}

	// code 수정(미완성)
	const changeCode = (nowStepIndex, nowItemIndex, changeCodeIndex, newCode) => {
		let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
		newJSONBook.textbook_contents[nowStepIndex].step_items[nowItemIndex][changeCodeIndex] = newCode;
		setJSONBook(newJSONBook);
	}

	// content 삭제
	const deleteJSONBookItem = (nowStepIndex, nowItemIndex, deleteIndex, cardIndex=null) => {
		let newJSONBook = JSON.parse(JSON.stringify(JSONBook));

		if(cardIndex === null) {
			newJSONBook.textbook_contents[nowStepIndex].step_items[nowItemIndex].components.splice(deleteIndex, 1);
		} else {
			newJSONBook.textbook_contents[nowStepIndex].step_items[nowItemIndex].components[deleteIndex].components.splice(cardIndex, 1);
		}

		setJSONBook(newJSONBook);
	}

	// single_card 추가
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
		handleSaveTextbook(newJSONBook);
		setJSONBook(newJSONBook);
	}

	// double_card 추가
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
		handleSaveTextbook(newJSONBook);
		setJSONBook(newJSONBook);
	}

	// link 추가
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

		handleSaveTextbook(newJSONBook);
		setJSONBook(newJSONBook);
	}

	// video 추가
	const addVideo = (nowStepIndex, nowItemIndex, index, videoUrl) => {
		let newJSONBook = JSON.parse(JSON.stringify(JSONBook));
		newJSONBook.textbook_contents[nowStepIndex].step_items[nowItemIndex].components.splice(index, 0, {
			"type": "video",
			"url": videoUrl
		})

		handleSaveTextbook(newJSONBook);
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
		</div>
	);
}

export default ButtonGroup;
