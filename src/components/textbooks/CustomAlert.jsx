import React, { useRef } from 'react';
import {Button, Input} from "@nextui-org/react";

const CustomAlert = ({ onClose, message, onConfirm=null, textbookName='' }) => {
	const inputRef = useRef('');

	return (
		<div style={styles.container}>
			{
				textbookName !== '' ? (
					<>
						<div>
							[ { textbookName } ] { message }
						</div>

						<Input
							css={{width: "100%", marginTop: "3vh"}}
							placeholder={textbookName}
							value={inputRef.current.value}
							onChange={(e) => {
								inputRef.current = e.target.value;
							}}
						/>

						<div style={styles.buttonContainer}>
							<div style={{fontSize: 15, color: 'red', fontWeight: 600}}>
								* 교재 이름을 위의 입력창에 입력해주세요.
							</div>

							<div style={{display: 'flex', flexDirection: 'row'}}>
								<Button
									size={'sm'}
									color={'error'}
									style={{marginRight: "10px"}}
									auto
									onClick={() => {
										onClose();
									}}
								>
									취소
								</Button>
								<Button
									size={'sm'}
									style={{marginRight: "10px"}}
									auto
									onClick={() => {
										if (inputRef.current === textbookName) {
											onConfirm();
											onClose();
										}
									}}
								>
									확인
								</Button>
							</div>
						</div>
					</>
				) : (
					<>
						<div>{ message }</div>

						<div style={{...styles.buttonContainer, justifyContent: 'flex-end'}}>
							<div style={{display: 'flex', flexDirection: 'row'}}>
								<Button
									size={'sm'}
									color={'error'}
									style={{marginRight: "10px"}}
									auto
									onClick={() => {
										onClose();
									}}
								>
									취소
								</Button>
								<Button
									size={'sm'}
									style={{marginRight: "10px"}}
									auto
									onClick={() => {
										onConfirm();
										onClose();
									}}
								>
									확인
								</Button>
							</div>
						</div>
					</>
				)
			}

		</div>
	);
};

const styles = {
	container: {
		backgroundColor: "white",
		boxShadow: "0px 10px 50px -3px rgba(0, 0, 0, 0.1)",
		padding: "2vw 4vw 2vw 4vw",
		borderRadius: "3vmin",
		width: 'auto',
		fontSize: "3vmin",
	},
	buttonContainer: {
		display: "flex",
		flexDirection: "row",
		marginTop: "15px",
		justifyContent: "space-between",
		alignItems: "center"
	}
}

export default CustomAlert;
