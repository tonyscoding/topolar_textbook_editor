import React from 'react';
import {Button, Tooltip} from "@nextui-org/react";

const LinkTooltip = ({ components_item }) => {
	return (
		<div>
			<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 120}}>
				<div>교재 아이디</div>
				<div>{ components_item?.textbook_id }</div>
			</div>
			<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 120}}>
				<div>링크된 페이지</div>
				<div>{ components_item?.indicator }</div>
			</div>
		</div>
	);
}

const LinkContent = ({ components_item }) => {
	return (
		<Tooltip content={<LinkTooltip components_item={components_item} />}>
			<Button
				onPress={() => console.log(components_item)}
				style={{backgroundColor: '#03c1d4'}}
			>
				힌트 보기
			</Button>
		</Tooltip>
	);
};

export default LinkContent;
