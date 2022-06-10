import React from "react";

export const LinkEditor = ({linkId, linkIndicator, setLinkId, setLinkIndicator}) => {
	const handleIdChange = (e) => {
		console.log(e.target.value)
		setLinkId(e.target.value);
	}
	const handleIndicatorChange = (e) => {
		setLinkIndicator(e.target.value);
	}

	return (
		<div style={{display: "flex", flexDirection: "row"}}>
			<div>
				<div>교재 번호</div>
				<input type="text" value={linkId || ''} onChange={handleIdChange} style={{marginRight: "20px"}} />
			</div>

			<div>
				<div>페이지</div>
				<input type="text" value={linkIndicator || ''} onChange={handleIndicatorChange} />
			</div>
		</div>
	);
};

export default LinkEditor;
