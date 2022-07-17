import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import NewClassroom from "./components/classroom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {RecoilRoot} from 'recoil';

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
