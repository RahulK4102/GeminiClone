"use client";
import { Context } from "@/app/Context/Context"
import Image from "next/image"
import { useContext } from "react"
import ThemeToggle from "../ThemeToggle";
import { text } from "stream/consumers";

const Main = () => {
    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input,load} = useContext(Context);
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
        <div className="flex absolute top-6 right-20" >
        <ThemeToggle/>
        </div>
        <div className="max-w-[900px] m-auto">
        {!showResult? <>
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
                <p className="dark:text-white" >{recentPrompt}</p>
            </div>
            <div className="flex items-start gap-5 ">
                <Image
                    className={`${loading?'animate-spin':''} `}
                    src={"/GEM.svg"}
                    alt=""
                    width={40}
                    height={40}
                />
                {loading? <div className="w-[100%] flex flex-col gap-2.5 ">
                    <hr  className=" rounded-[4px] border-none bg-[#f6f7f8] loaderHr bg-[length:800px_50px] h-5 animate-[loader_3s_linear_infinite] " />
                    <hr  className=" rounded-[4px] border-none bg-[#f6f7f8] loaderHr bg-[length:800px_50px] h-5 animate-[loader_3s_linear_infinite] " />
                    <hr  className=" rounded-[4px] border-none bg-[#f6f7f8] loaderHr bg-[length:800px_50px] h-5 animate-[loader_3s_linear_infinite] " />
                </div>: <p className=" dark:text-white text-[17px] font-[300px] leading-[1.8] " dangerouslySetInnerHTML={{ __html: resultData }}></p>}
                
            </div>
        </div> }
            
            <div className="absolute bottom-0 w-[100%] max-w-[900px] py-0 px-5 m-auto  ">
                <div className=" dark:bg-medium flex items-center justify-between gap-5 bg-[#f0f4f9] py-[10px] px-5 rounded-[50px] ">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} className="dark:bg-medium dark:text-white  transparent rounded-none outline-none p-2 text-lg flex-1 bg-[#f0f4f9] " type="text" placeholder="Enter a prompt here... " />
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
                            onClick={()=>onSent()}
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
