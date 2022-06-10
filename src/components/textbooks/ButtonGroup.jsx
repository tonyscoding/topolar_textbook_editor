import React, {useContext, useEffect, useState} from "react";
import {TextbookContext} from '@/contexts/TextbookContext';
import Button from '@/components/Button';

export const ButtonGroup = ({index, text, codeLanguage, code, linkId, linkIndicator}) => {
	const {addDescription, addCode, addLink, deleteDescription} = useContext(TextbookContext);

	// useEffect(() => {
	// 	console.log("code : ", code);
	// 	console.log("codeLanguage : ", codeLanguage);
	// }, []);

	return (
		<div className={"body-buttonGroup"}>
			<Button
				size="small"
				type="fill"
				color="black"
				onClick={() => {
					addDescription(index + 1, text.current ? text.current : "<p><br /></p>");
				}}
			>
				desc 추가
			</Button>

			<Button
				size="small"
				type="fill"
				color="black"
				onClick={() => {
					addCode(index + 1, code.current, codeLanguage.current.saveName);
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
							deleteDescription(index);
						}}
					>
						제거
					</Button> : null
			}
		</div>
	);
}

export default ButtonGroup;