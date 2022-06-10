import React, {useEffect, useState, useContext} from 'react'
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import {ButtonGroup} from "@/components/textbooks/ButtonGroup";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {materialLight} from "react-syntax-highlighter/dist/cjs/styles/prism";

export const CodeContent = ({
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
			className={"body-code"}
			onMouseEnter={() => {handleMouseEnter()}}
			onMouseLeave={() => {handleMouseLeave()}}
		>
			<Markdown
				children={components_item.code}
				components={{
					code({node, inline, className, children, ...props}) {
						const match = /language-(\w+)/.exec(className || '')
						return !inline && match ? (
							<SyntaxHighlighter
								children={String(children).replace(/\n$/, '')}
								style={materialLight}
								language={match[1]}
								PreTag="div"
								{...props}
							/>
						) : (
							<code className={className} {...props}>
								{children}
							</code>
						)
					}
				}}
			/>

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

export default CodeContent;