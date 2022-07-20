import React from 'react';
import ReactPlayer from 'react-player'


const VideoContent = ({ components_item }) => {
	return (
		<div>
			<ReactPlayer url={components_item.url} controls={true} />
		</div>
	);
};

export default VideoContent;
