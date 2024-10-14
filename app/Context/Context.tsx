"use client";
import runChat from "@/config/gemini";
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface ContextProviderProps {
  children: ReactNode;
  className?: string;
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
  // State declarations
  const [input, setInput] = useState("");  
  const [recentPrompt, setRecentPrompt] = useState("");  
  const [prevPrompts, setPrevPrompts] = useState<string[]>([]); 
  const [showResult, setShowResult] = useState(false);  
  const [loading, setLoading] = useState(false);  
  const [load, setLoad] = useState(true);  
  const [resultData, setResultData] = useState("");  

  // Function to delay adding words to resultData with animation effect
  const delayPara = (index: number, nextWord: string) => {
    setTimeout(() => {
      setResultData(prev => prev + nextWord);
    }, 75 * index);
    setLoad(false);
  };

  // Function to handle sending a prompt
  const onSent = async (prompt: string) => {
    setLoading(true);
    setShowResult(true);
    setResultData("");
    
    const userPrompt = prompt || input;  // Use prompt if provided, else input state
    if (!prompt) {
      setPrevPrompts(prev => [...prev, input]);
      setRecentPrompt(input);
    }

    const response = await runChat(userPrompt);
    setRecentPrompt(userPrompt);

    // Handle response formatting
    const formattedResponse = response
      .split("**")
      .map((part, i) => (i % 2 ? `<br>${part}</br>` : part))
      .join("")
      .replace(/\*/g, "</br>");

    // Split response into words and display gradually
    const responseWords = formattedResponse.split(" ");
    responseWords.forEach((word, index) => delayPara(index, word + " "));

    setLoading(false);
  };

  // Context value
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
    setInput,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
