import React, {useEffect, useState, useContext} from 'react'
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import {ButtonGroup} from "@/components/textbooks/ButtonGroup";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {materialLight} from "react-syntax-highlighter/dist/cjs/styles/prism";
import AceEditor from "react-ace";

export const CodeContent = ({
    components_item,
}) => {
	const parseOptions = {
		"cpp": "c_cpp",
		"c_cpp": "c_cpp",
		"python": "python",
		"java": "java",
		"javascript": "javascript",
		"html": "html",
		"css": "css",
	}

	return (
		<div>
			<Markdown
				children={components_item.code}
				components={{
					code({node, inline, className, children, ...props}) {
						const match = /language-(\w+)/.exec(className || '')
						return !inline && match ? (
								<AceEditor
									style={{width: "100%", height: "300px"}}
									mode={parseOptions[match[1]]}
									theme="tomorrow"
									fontSize={14}
									showPrintMargin={true}
									readOnly={true}
									highlightActiveLine={false}
									showGutter={true}
									value={String(children).replace(/\n$/, '')}
									setOptions={{
										enableBasicAutocompletion: true,
										enableLiveAutocompletion: true,
										enableSnippets: true,
										showLineNumbers: true,
										tabSize: 4,
									}}/>
						) : (
							<code className={className} {...props}>
								{children}
							</code>
						)
					}
				}}
			/>
		</div>
	);
}

export default CodeContent;
