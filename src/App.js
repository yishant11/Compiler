import React, { useState } from 'react'
import { useRef } from 'react';
import Editor from '@monaco-editor/react';
import './app.css';
import axios from 'axios';
import { ClapSpinner } from 'react-spinners-kit';

const Footer = () => {
  let data = {
    themes:["vs-dark","vs-light"],
    languages: ["java", "python"],

    langDetails: [
      {
        id: "1",
        defaultLanguage: "java",
        content: 
`import java.util.Scanner;
import java.util.*;

class Main{
  public static void main(String args[]){
    //Write your code here
  }
}`
      },
//       {
//         id: "2",
//         defaultLanguage: "cpp",
//         content:
// `#include<stdio.h>
// #include<bits/std++.h>
// #include<conio.h>

// int main(void){
 
// }
// `
//       },
      {
        id: "2",
        defaultLanguage: "python",
        content: 
`def fun():
    #Write your code here

print(fun())
`
      },
    ]


  }

  const editorRef = useRef(null);
  

  const [input, setInput]= useState("");
  const [lang, setLang] = useState("java")

  const [theme,setTheme] =useState("vs-dark");
  const [output,setOutput]=useState("");
  const [loading,setLoading] = useState(false);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    console.log(monaco.languages);
  }

 function showValue() {
   
  setLoading(true);
  axios.post(`http://localhost:8000/compile`, {
    code: editorRef.current.getValue(),
    language: lang,
    input:input

  }).then((res)=>{
    console.log(res);
    // alert(res.data.output)
    // setOutput(res.data)
    if(res.data.output)
    setOutput({data:res.data.output,error:""});
  else setOutput({data:"",error:res.data.error})
    // setInput("");
  }).then(()=>{setLoading(false)})
  
  }
  const handleSelection = (event) => {
    setLang(event.target.value)
    // if(event.target.value === "python"){
      
    // }
    

  }

  const handleTheme = (event)=>{
    setTheme(event.target.value);
  }

  
  // console.log(lang, "sla")


  return (
    <>
    {console.log(data.langDetails.find(element => element.defaultLanguage === lang).content,"chekcsai")}
    <div className='com_head'>
      <div className='languages'>
      <select onChange={handleSelection} className='language'>
        {data.languages.map((element) =>
          <option value={`${element}`}> {element}</option>
        )}
        </select>

        <select onChange={handleTheme} className='language'>
        {data.themes.map((element) =>
          <option value={`${element}`}> {element}</option>
        )}
        </select>
      </div>
      <div className='switch'>
        <img alt='theme' src='https://cdn-icons-png.flaticon.com/128/5043/5043139.png'/>
        <button onClick={showValue} className='submit'>RUN</button>
      </div>
    </div>
    
      

      

      <div className='compiler'>
      <Editor
        height="90vh"
        width="60%"
        options={{fontSize:"15px"}}
        path={`${data.langDetails.find(element => element.defaultLanguage === lang).id}`}
        defaultLanguage={`${data.langDetails.find(element => element.defaultLanguage === lang).defaultLanguage}`}
        defaultValue={`${data.langDetails.find(element => element.defaultLanguage === lang).content}`}
        onMount={handleEditorDidMount}
        loading={<ClapSpinner/>}
        theme={`${data.themes.find(element => element === theme)}`}
      />


        <div className='right-side'>
          <div className="input-box">
            <h3>INPUT</h3>
            <textarea rows="20" cols="20" onChange={(e)=>{setInput(e.target.value)}}></textarea>
          </div>

          <div className='input-box'>
            <h3>OUTPUT</h3>
            {loading?<ClapSpinner size={30} loading={loading}/>:<textarea readOnly={true} style={output.error?{color:"red"}:{color:"white"}} rows="20" cols="20" value={output.data || output.error}></textarea>}

            
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
