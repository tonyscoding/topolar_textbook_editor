import React from 'react';

export const CodeLanguageSelectBox = (props) => {

  const handleChange = (e) => {
		// event handler
		console.log(e.target.value);
    props.setCodeLanguage(e.target.value);
	};


	return (
		<select onChange={handleChange}>
			{props.options.map((option) => (
				<option
					value={option.value}
					defaultValue={props.defaultValue === option.value}
				>
					{option.name}
				</option>
			))}
		</select>
	);
};