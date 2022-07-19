import React, {useEffect, useState, useRef} from 'react';

import "@/assets/css/CodeLanguageSelectBox.css";

export const CodeLanguageSelectBox = ({options, codeLanguage, setCodeLanguage}) => {
	const [menuHeight, setMenuHeight] = useState(null);
	const dropdownRef = useRef(null);
	const [selectedMenu, setSelectedMenu] = useState(codeLanguage);

	useEffect(() => {
		setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
	}, []);

	const DropdownItem = (props) => {
		return (
			<div
				className="menu-item"
				style={props.style}
				onClick={() => {
					setSelectedMenu(props.option);
					setCodeLanguage(props.option);
				}}
			>
				<span className="icon">{props.leftIcon}</span>
				{props.option.displayName}
			</div>
		);
	}

	return (
		<div className="dropdown">
			<div className="menu">
				{
					options.map((option, index) => {
						return (
							<div key={index}>
							{
								option.displayName === selectedMenu.displayName ? <DropdownItem option={option} style={{backgroundColor: "#525357", color: "white"}} /> :
									<DropdownItem option={option} />
							}
							</div>
						);
					})
				}
			</div>
		</div>
	);
}

export default CodeLanguageSelectBox;
