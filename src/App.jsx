import './App.css'
import NewClassroom from "./components/classroom";
import 'react-confirm-alert/src/react-confirm-alert.css';
import './assets/css/Theme.css';
import './assets/css/RootFont.css';
import './assets/css/CustomTable.css';
import './assets/sass/CommonUsed.scss';
import './assets/sass/BackgroundImages.scss';
import './assets/sass/Guide/Font.scss';
import './assets/sass/Guide/ColWidth.scss';
import { Slide, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";

function App() {
	return (
		<>
			<NewClassroom />
			<ToastContainer
				position="top-center"
				autoClose={3000}
				pauseOnHover={false}
				pauseOnFocusLoss={false}
				hideProgressBar={false}
				transition={Slide}
				style={{ width: "60vw" }}
				theme={'colored'}
			/>
		</>
	)
}

export default App
