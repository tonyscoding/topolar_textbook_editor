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
    deleteJSONBookItem
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
					addDesc(stepIndex, itemIndex, index + 1, text.current ? text.current : "<p><br /></p>");
				}}
			>
				desc 추가
			</Button>

			<Button
				size="small"
				type="fill"
				color="black"
				onClick={() => {
					addCode(stepIndex, itemIndex, index + 1, code.current, codeLanguage.current.saveName);
				}}
			>
				code 추가
			</Button>

			<Button
				size="small"
				type="fill"
				color="black"
				onClick={() => {
					addLink(index + 1, linkId, linkIndicator);
				}}
			>
				link 추가
			</Button>

			{
				index > -1 ?
					<Button
						size="small"
						type="fill"
						color="red"
						onClick={() => {
							deleteJSONBookItem(stepIndex, itemIndex, index);
						}}
					>
						제거
					</Button> : null
			}
		</div>
	);
}

export default ButtonGroup;
