import React from "react";
// import Button from '@/components/Button';

import { useRecoilValue } from "recoil";
import { stepIndexState, itemIndexState } from "@/utils/States";
import {confirmAlert} from "react-confirm-alert";
import CustomAlert from "@/components/textbooks/CustomAlert";

import { Button } from "@nextui-org/react";

export const ButtonGroup = ({
    index,
    text,
    codeLanguage,
    code,
	link,
	videoUrl,
	addDesc,
	addCode,
	addSingleCard,
	isCard,
	cardIndex,
	addLink,
	addVideo,
    deleteJSONBookItem
}) => {
	const stepIndex = useRecoilValue(stepIndexState);
	const itemIndex = useRecoilValue(itemIndexState);

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
						addCode(stepIndex, itemIndex, index, code.current, codeLanguage.current.saveName, isCard ? cardIndex + 1 : null);
					}}
				>
					code 추가
				</Button>

				{
					!isCard ?
					<>
					<Button
						auto
						onClick={() => {
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
