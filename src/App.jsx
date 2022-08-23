import { useState } from 'react'
import './App.css'
import NewClassroom from "./components/classroom";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {RecoilRoot} from 'recoil';
import './assets/css/Theme.css';
import './assets/css/RootFont.css';
import './assets/css/CustomTable.css';
import './assets/sass/CommonUsed.scss';
import './assets/sass/BackgroundImages.scss';
import './assets/sass/Guide/Font.scss';
import './assets/sass/Guide/ColWidth.scss';
import {DragDropContext} from "react-beautiful-dnd";

function App() {
	return (
		<RecoilRoot>
			<DragDropContext>
				<div className="App">
					<NewClassroom />
				</div>
			</DragDropContext>
		</RecoilRoot>
	)
}

export default App
