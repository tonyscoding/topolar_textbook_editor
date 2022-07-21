import React from "react";
import Button from '@/components/Button';

import { useRecoilValue } from "recoil";
import { stepIndexState, itemIndexState } from "@/utils/States";

export const ButtonGroup = ({
    index,
    text,
    codeLanguage,
    code,
    linkId,
    linkIndicator,
	addDesc,
	addCode,
	addSingleCard,
    deleteJSONBookItem,
	isCard,
	cardIndex
}) => {
	const stepIndex = useRecoilValue(stepIndexState);
	const itemIndex = useRecoilValue(itemIndexState);

	return (
		<div className={"body-buttonGroup"}>
			<Button
				size="small"
				type="fill"
				color="black"
				onClick={() => {
					addDesc(stepIndex, itemIndex, index, text.current ? text.current : "<p><br /></p>", isCard ? cardIndex + 1 : null);
				}}
			>
				desc 추가
			</Button>

			<Button
				size="small"
				type="fill"
				color="black"
				onClick={() => {
					console.log(codeLanguage.current.saveName)
					addCode(stepIndex, itemIndex, index, code.current, codeLanguage.current.saveName, isCard ? cardIndex + 1 : null);
				}}
			>
				code 추가
			</Button>

			<Button
				size="small"
				type="fill"
				color="black"
				onClick={() => {
					addLink(index + 1, linkId, linkIndicator, isCard ? cardIndex + 1 : null);
				}}
			>
				link 추가
			</Button>
			{
				!isCard ? 
				<Button
					size="small"
					type="fill"
					color="black"
					onClick={() => {
						addSingleCard(stepIndex, itemIndex, index);
					}}
				>
					s_card 추가
				</Button> :
				null
			}

			{
				(isCard ? cardIndex > -1 : index > -1)  ?
					<Button
						size="small"
						type="fill"
						color="red"
						onClick={() => {
							deleteJSONBookItem(stepIndex, itemIndex, isCard ? index : index-1, isCard ? cardIndex : null);
						}}
					>
						제거
					</Button> : null
			}
		</div>
	);
}

export default ButtonGroup;
