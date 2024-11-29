import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [password,setPassword] = useState("");
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [length,setLength] = useState(12)

  const passwrdRef = useRef(null)

  const copyToClipBoard = useCallback(()=>{
    passwrdRef.current?.select()
    passwrdRef.current?.setSelectionRange(0,length)
    window.navigator.clipboard.writeText(password)
  },[password])

  const passGenerator = useCallback(()=>{
    let password=''
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    
    if(numberAllowed) str+='0123456789'
    if(charAllowed) str+='`!@#$%^&*()-_+{}[]'

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      password += str.charAt(char)
      console.log(password)
    }
    setPassword(password)
  },[length,numberAllowed,charAllowed,setPassword])
  
  useEffect(()=>{
    passGenerator()
  },[length,numberAllowed,charAllowed])

  return(
    <div className='container'>
      <input 
      type="text"
      placeholder='Password'
      value={password}
      readOnly
      ref={passwrdRef}
       />
       <input 
        type="range"
        min={12}
        max={100}
        value={length}
        onChange={(e)=>setLength(e.target.value)}
       />
       <label>length:</label>
       <input
        type='checkbox'
        defaultChecked={numberAllowed}
        onChange={()=>{setNumberAllowed((prev)=>!prev)}}
       />
       <label>Numbers:{length}</label>
       <input
        type='checkbox'
        defaultChecked={charAllowed}
        onChange={()=>{
          setCharAllowed((prev)=>!prev)
        }}
       />
       <label>Characters:</label>
       <button onClick={copyToClipBoard}>
        Copy
       </button>
    </div>
  )
}

export default App
