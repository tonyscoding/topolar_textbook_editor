import React, {useEffect, useState, useContext, useRef} from 'react'
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import {DescEditor} from "@/components/textbooks/editors/DescEditor";

import { useRecoilValue, useRecoilState } from "recoil";
import { stepIndexState, itemIndexState } from "@/utils/States";
import { JSONbookState } from '@/utils/States';
import {saveTextbook} from "@/helpers/electronFileSystem";
import {quickLoadState} from "@/utils/States";

export const DescContent = ({
    components_item,
    index,
	isCard,
	cardIndex,
}) => {
	const stepIndex = useRecoilValue(stepIndexState);
	const itemIndex = useRecoilValue(itemIndexState);
	const [JSONBook, setJSONBook] = useRecoilState(JSONbookState);
	const quickLoad = useRecoilValue(quickLoadState);

	const item = useRef('');
	const [wantToEdit, setWantToEdit] = useState(false);

	console.log("Desc Render");
	useEffect(() => {
		item.current = components_item.description
	}, [components_item])

	const handleBlur = (e) => {
		setWantToEdit(false);
		changeDesc(stepIndex, itemIndex, index, item.current, isCard ? cardIndex : null);
	}

	const changeDesc = (nowStepIndex, nowItemIndex, index, newDesc, cardIndex=null) => {
		let newJSONBook = JSON.parse(JSON.stringify(JSONBook));

		if(cardIndex == null) {
			newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components[index].description = newDesc;
		} else {
			newJSONBook.textbook_contents[stepIndex].step_items[itemIndex].components[index].components[cardIndex].description = newDesc;
		}

		if(quickLoad)
			saveTextbook(newJSONBook);
		setJSONBook(newJSONBook);
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
