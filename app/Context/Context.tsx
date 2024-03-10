"use client";
import runChat from "@/config/gemini";
import { Dispatch, SetStateAction } from 'react';
import React, { createContext, ReactNode, useState } from "react";

interface ContextProviderProps {
    children: ReactNode;
    className?: string; // Make className optional
  }

  interface ContextValue {
    prevPrompts: string[];
    setPrevPrompts: Dispatch<SetStateAction<string[]>>;
    setRecentPrompt: Dispatch<SetStateAction<string>>;
    onSent: (prompt: string) => Promise<void>;
    recentPrompt: string;
    showResult: boolean;
    loading: boolean;
    load: boolean;
    resultData: string;
    input: string;
    setInput: Dispatch<SetStateAction<string>>;
  }

export const Context = createContext<ContextValue | undefined>(undefined);

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const[input,setInput] = useState("");  
    const[recentPrompt,setRecentPrompt] = useState("");  
    const [prevPrompts, setPrevPrompts] = useState<string[]>([]); 
    const[showResult,setShowResult] = useState(false);  
    const[loading,setLoading] = useState(false);  
    const[load,setLoad] = useState(true);  
    const[resultData,setResultData] = useState("");  

  const delayPara = (index:number,nextWord:string) =>{
      setTimeout(function() {
        setResultData(prev=>prev+nextWord);
      },75*index)
      setLoad(false);
  }
  
  const onSent = async (prompt:string) => {
        setResultData("");
        setInput("");
        setLoading(true);
        
        setShowResult(true);
        let response;
        if(prompt !== undefined){
          response = await runChat(prompt);
          setRecentPrompt(prompt);
        }else{
          setPrevPrompts(prev=>[...prev,input]);
          setRecentPrompt(input);
          response = await runChat(input);
        }
        let responseArray = response.split("**");
        let newResponse: string = '';
        for (let i = 0; i < responseArray.length; i++) {
          if(i===0 || i%2 !== 1){
            newResponse += responseArray[i];
          }else{
            newResponse += "<br>"+responseArray[i]+"</br>";
          }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
          const nextWord = newResponseArray[i];
          delayPara(i,nextWord+" ");
        }
        setLoading(false);
    };
  const contextValue: ContextValue = {
    prevPrompts,
    setPrevPrompts,
    setRecentPrompt,
    onSent,
    recentPrompt,
    showResult,
    loading,
    load,
    resultData,
    input,
    setInput
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
