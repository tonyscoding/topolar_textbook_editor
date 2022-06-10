import React, {useEffect, useState, useContext} from 'react'
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import {ButtonGroup} from "@/components/textbooks/ButtonGroup";

export const DescContent = ({
    components_item,
    index,
    text,
    codeLanguage,
    code,
    linkId,
    linkIndicator
}) => {

	const [hovered, setHovered] = useState(false);

	const handleMouseEnter = () => {
		setHovered(true);
	}

	const handleMouseLeave = () => {
		setHovered(false);
	}

	return (
		<div
			className={"body-desc"}
			onMouseEnter={() => {handleMouseEnter()}}
			onMouseLeave={() => {handleMouseLeave()}}
		>

			<Markdown children={components_item.description} rehypePlugins={[rehypeRaw]} />

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