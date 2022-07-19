import React, {useEffect, useState, useContext, useRef} from 'react'
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import {DescEditor} from "@/components/textbooks/editors/DescEditor";

import { useRecoilValue } from "recoil";
import { stepIndexState, itemIndexState } from "@/utils/States";

export const DescContent = ({
    components_item,
    index,
	changeDesc
}) => {
	const stepIndex = useRecoilValue(stepIndexState);
	const itemIndex = useRecoilValue(itemIndexState);

	const item = useRef('');
	const [wantToEdit, setWantToEdit] = useState(false);

	useEffect(() => {
		item.current = components_item.description
	}, [components_item])

	const handleBlur = (e) => {
		setWantToEdit(false);
		changeDesc(stepIndex, itemIndex, index, item.current);
	}

	return (
		<div
			className={"body-desc"}
			onDoubleClick={() => {setWantToEdit(true)}}
		>
			{
				wantToEdit ?
					<DescEditor placeholder={"이곳에 desc 입력"} text={item} handleBlur={handleBlur} />
					:
					<Markdown children={components_item.description} rehypePlugins={[rehypeRaw]} />
			}
		</div>
	);
}

export default DescContent;
