import React from "react";
import {Input} from "@nextui-org/react";

export const LinkEditor = ({
	link
}) => {
	const handleIdChange = (e) => {
		console.log(link.current.textbook_id)
		link.current = {
			textbook_id: e.target.value,
			indicator: link.current.indicator
		};
	}
	const handleIndicatorChange = (e) => {
		console.log(link.current.indicator)

		link.current = {
			textbook_id: link.current.textbook_id,
			indicator: e.target.value
		};
	}

	return (
		<div style={{display: "flex", flexDirection: "row", width: 365, justifyContent: 'space-between'}}>
			<Input
				label={"교재 아이디"}
				type="number"
				onChange={handleIdChange}
			/>

			<Input
				label={"페이지"}
				type="number"
				onChange={handleIndicatorChange}
			/>
		</div>
	);
};

export default LinkEditor;
