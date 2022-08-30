import React from 'react';
import { Button } from "@nextui-org/react";

const CustomAlert = ({ onClose, message, onConfirm=null }) => {
	return (
		<div style={styles.container}>
			<div>{ message }</div>
			<div style={styles.buttonContainer}>
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
		justifyContent: "end"
	}
}

export default CustomAlert;
