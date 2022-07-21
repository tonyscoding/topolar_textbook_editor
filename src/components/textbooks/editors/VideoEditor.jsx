import React from 'react';
import {Input} from "@nextui-org/react";

const VideoEditor = ({ videoUrl }) => {
	return (
		<div>
			<Input
				label="비디오 주소"
				type="url"
				onChange={(e) => videoUrl.current = e.target.value}
				style={{width: 345}}
			/>
		</div>
	);
};

export default VideoEditor;
