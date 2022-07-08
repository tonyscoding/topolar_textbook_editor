import React, {useEffect, useState, useContext, useRef} from 'react'
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import {ButtonGroup} from "@/components/textbooks/ButtonGroup";
import {DescEditor} from "@/components/textbooks/editors/DescEditor";
import { TextbookContext } from '@/contexts/TextbookContext';

export const DescContent = ({
    components_item,
    index,
    text,
    codeLanguage,
    code,
    linkId,
    linkIndicator
}) => {

	const item = useRef('');
	const [hovered, setHovered] = useState(false);
	const [wantToEdit, setWantToEdit] = useState(false);

	const { setDescription } = useContext(TextbookContext);

	useEffect(() => {
		item.current = components_item.description
	}, [components_item])

	const handleMouseEnter = () => {
		setHovered(true);
	}

	const handleMouseLeave = () => {
		setHovered(false);
	}

	const handleBlur = (e) => {
		setWantToEdit(false);
		setDescription(index, item.current);
	}

	return (
		<div
			className={"body-desc"}
			onMouseEnter={() => {handleMouseEnter()}}
			onMouseLeave={() => {handleMouseLeave()}}
			onDoubleClick={() => {setWantToEdit(true)}}
		>
			{
				wantToEdit ?
					<DescEditor placeholder={"이곳에 desc 입력"} text={item} handleBlur={handleBlur} />
					:
					<Markdown children={components_item.description} rehypePlugins={[rehypeRaw]} />
			}

			{
				hovered ?
					<ButtonGroup
						index={index}
						text={text}
						codeLanguage={codeLanguage}
						code={code}
						linkId={linkId}
						linkIndicator={linkIndicator}
					/> : null
			}
		</div>
	);
}

export default DescContent;
