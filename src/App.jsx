import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import NewClassroom from "./components/classroom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <NewClassroom />
    </div>
  )
}

export default App
