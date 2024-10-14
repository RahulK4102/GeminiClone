"use client";
import { Context } from "@/app/Context/Context"
import Image from "next/image"
import { useContext } from "react"
import ThemeToggle from "../ThemeToggle";
import { text } from "stream/consumers";

const Main = () => {
    const context = useContext(Context);

  if (!context) {
    return <div>Error: Context is not available</div>;
  }
   else
  return (
    <div className="dark:bg-dark flex-1 min-h-screen pb-[15vh] relative">
        <div className="flex items-center justify-between text-[22px] p-[20px] color-[#585858]">
            <p className="dark:text-white" >Gemini</p>
            <Image
                className="w-[40px] rounded-[50%] bg-slate-200 dark:bg-medium"
                src={"/user.svg"}
                width={30}
                height={30}
                alt=""
            />
        </div>
        <div className="max-w-[900px] m-auto">
        {!context.showResult? <>
            <div className="my-[50px] mx-0 text-[56px] text-[#c4c7c5] font-[500] p-[20px]">
                <p  ><span className="span dark:text-white">Hello, Rahul.</span></p>
                <p className="dark:text-white" >How can I help you today?</p>
            </div>
            <div className="dark:bg-dark grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-[15px] p-[20px]  ">
                <div className="h-[200px] p-[15px] bg-[#f0f4f9] dark:bg-medium relative cursor-pointer hover:bg-[#dfe4ea] dark:hover:bg-dark ">
                    <p className=" dark:text-white color-[#585858] text-[17px]">Suggest beautiful place to see on an upcoming road trip</p>
                    <Image
                        className="w-[35px] p-[5px] absolute bg-white rounded-[20px] bottom-[10px] right-[10px] "
                        src={"/compass.svg"}
                        alt=""
                        width={30}
                        height={30}
                    />
                </div>
                <div className=" dark:bg-medium h-[200px] p-[15px] bg-[#f0f4f9] relative cursor-pointer hover:bg-[#dfe4ea]">
                    <p className=" dark:text-white color-[#585858] text-[17px]">Briefly summarize this concept: urban planning</p>
                    <Image
                        className="w-[35px] p-[5px] absolute bg-white rounded-[20px] bottom-[10px] right-[10px] "
                        src={"/bulb.svg"}
                        alt=""
                        width={30}
                        height={30}
                    />
                </div>
                <div className="dark:bg-medium h-[200px] p-[15px] bg-[#f0f4f9] relative cursor-pointer hover:bg-[#dfe4ea]">
                    <p className=" dark:text-white color-[#585858] text-[17px]">Brainstorm team bonding activities for our work retreat</p>
                    <Image
                        className="w-[35px] p-[5px] absolute bg-white rounded-[20px] bottom-[10px] right-[10px] "
                        src={"/message.svg"}
                        alt=""
                        width={30}
                        height={30}
                    />
                </div>
                <div className="dark:bg-medium h-[200px] p-[15px] bg-[#f0f4f9] relative cursor-pointer hover:bg-[#dfe4ea]">
                    <p className=" dark:text-white color-[#585858] text-[17px]">Improve the readability of the following code</p>
                    <Image
                        className="w-[35px] p-[5px] absolute bg-white rounded-[20px] bottom-[10px] right-[10px] "
                        src={"/code.svg"}
                        alt=""
                        width={30}
                        height={30}
                    />
                </div>
            </div>
        </>: <div className="py-0 px-[5%] max-h-[70vh] overflow-y-scroll result ">
            <div className=" my-[40px] mx-0  flex items-center gap-5 "> 
                <Image
                    className=" w-10 rounded-[50%] "
                    src={"/user.svg"}
                    alt=""
                    width={30}
                    height={30}
                />
                <p className="dark:text-white" >{context.recentPrompt}</p>
            </div>
            <div className="flex items-start gap-5 ">
                <Image
                    className={`${context.loading?'animate-spin':''} `}
                    src={"/GEM.svg"}
                    alt=""
                    width={40}
                    height={40}
                />
                {context.loading? <div className="w-[100%] flex flex-col gap-2.5 ">
                    <hr  className=" rounded-[4px] border-none bg-[#f6f7f8] loaderHr bg-[length:800px_50px] h-5 animate-[loader_3s_linear_infinite] " />
                    <hr  className=" rounded-[4px] border-none bg-[#f6f7f8] loaderHr bg-[length:800px_50px] h-5 animate-[loader_3s_linear_infinite] " />
                    <hr  className=" rounded-[4px] border-none bg-[#f6f7f8] loaderHr bg-[length:800px_50px] h-5 animate-[loader_3s_linear_infinite] " />
                </div>: <p className=" dark:text-white text-[17px] font-[300px] leading-[1.8] " dangerouslySetInnerHTML={{ __html: context.resultData }}></p>}
                
            </div>
        </div> }
            
            <div className="absolute bottom-0 w-[100%] max-w-[900px] py-0 px-5 m-auto  ">
                <div className=" dark:bg-medium flex items-center justify-between gap-5 bg-[#f0f4f9] py-[10px] px-5 rounded-[50px] ">
                    <input onChange={(e)=>context.setInput(e.target.value)} value={context.input} className="dark:bg-medium dark:text-white  transparent rounded-none outline-none p-2 text-lg flex-1 bg-[#f0f4f9] " type="text" placeholder="Enter a prompt here... " />
                    <div className="flex items-center gap-[15px] " >
                        <Image 
                            className="cursor-pointer w-[24px] "
                            src={"/gallery.svg"}
                            alt=""
                            width={30}
                            height={30}
                        />
                        <Image 
                            className="cursor-pointer w-[24px] "
                            src={"/mic.svg"}
                            alt=""
                            width={30}
                            height={30}
                        />
                        <Image 
                            onClick={()=>context.onSent(context.input)}
                            className="cursor-pointer w-[24px] "
                            src={"/send.svg"}
                            alt=""
                            width={30}
                            height={30}
                        />
                    </div>
                </div>
                <p className="dark:text-white font-light text-[13px] my-[15px] mx-auto text-center ">
                    Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main


/*
'use client'

import { Context } from "@/app/Context/Context"
import Image from "next/image"
import { useContext } from "react"
import ThemeToggle from "../ThemeToggle"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Send, Image as ImageIcon, Mic } from "lucide-react"

const Main = () => {
  const context = useContext(Context)

  if (!context) {
    return <div className="flex items-center justify-center h-screen">Error: Context is not available</div>
  }

  return (
    <div className="flex-1 min-h-screen pb-20 relative bg-gray-50 dark:bg-gray-900">
      <header className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Gemini</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Image
            className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"
            src="/user.svg"
            width={40}
            height={40}
            alt="User avatar"
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        {!context.showResult ? (
          <>
            <div className="my-12 text-center">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Hello, Rahul.</h2>
              <p className="text-2xl text-gray-600 dark:text-gray-300">How can I help you today?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { text: "Suggest beautiful places to see on an upcoming road trip", icon: "compass.svg" },
                { text: "Briefly summarize this concept: urban planning", icon: "bulb.svg" },
                { text: "Brainstorm team bonding activities for our work retreat", icon: "message.svg" },
                { text: "Improve the readability of the following code", icon: "code.svg" },
              ].map((item, index) => (
                <Card key={index} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <p className="text-gray-800 dark:text-gray-200 text-lg">{item.text}</p>
                    <Image
                      className="w-8 h-8 p-1 bg-white rounded-full self-end mt-4"
                      src={`/${item.icon}`}
                      width={32}
                      height={32}
                      alt=""
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <Image
                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"
                src="/user.svg"
                width={40}
                height={40}
                alt="User avatar"
              />
              <p className="text-gray-800 dark:text-gray-200 text-lg">{context.recentPrompt}</p>
            </div>
            <div className="flex items-start gap-4">
              <Image
                className={`w-10 h-10 ${context.loading ? 'animate-spin' : ''}`}
                src="/GEM.svg"
                width={40}
                height={40}
                alt="Gemini logo"
              />
              {context.loading ? (
                <div className="space-y-2 w-full">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  ))}
                </div>
              ) : (
                <div
                  className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: context.resultData }}
                />
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="absolute bottom-0 w-[100%] max-w-[900px] py-0 px-5 m-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full p-2">
            <Input
              type="text"
              placeholder="Enter a prompt here..."
              value={context.input}
              onChange={(e) => context.setInput(e.target.value)}
              className="flex-1 bg-transparent border-none focus:ring-0"
            />
            <Button size="icon" variant="ghost">
              <ImageIcon className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost">
              <Mic className="h-5 w-5" />
            </Button>
            <Button size="icon" onClick={() => context.onSent(context.input)}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Main
*/