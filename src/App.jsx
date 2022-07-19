import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import NewClassroom from "./components/classroom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {RecoilRoot} from 'recoil';
import './assets/css/Theme.css';
import './assets/css/RootFont.css';
import './assets/css/CustomTable.css';
import './assets/sass/CommonUsed.scss';
import './assets/sass/BackgroundImages.scss';
import './assets/sass/Guide/Font.scss';
import './assets/sass/Guide/ColWidth.scss';


function App() {
	return (
		<RecoilRoot>
			<div className="App">
				<NewClassroom />
			</div>
		</RecoilRoot>
	)
}

export default App
