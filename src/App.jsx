import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import NewClassroom from "./components/classroom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function App() {
	return (
		<div className="App">
			<NewClassroom />
		</div>
	)
}

export default App
