"use client"
import { Context } from "@/app/Context/Context";
import Image from "next/image";
import { useContext, useState } from "react";
const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt } = useContext(Context);
    const loadPrompt = async(prompt:string) =>{
        setRecentPrompt(prompt);
        await onSent(prompt);
    }
    return (
        <div className={` dark:bg-medium min-h-screen flex flex-col justify-between bg-[#f0f4f9] ${extended ? 'w-64' : 'w-24'} py-6 px-3.5`} >
            <div className="top">
                <Image
                    onClick={() => setExtended(prev => !prev)}
                    className="block ml-2.5 cursor-pointer "
                    src={"/menu.svg"}
                    height="30"
                    width="30"
                    alt=""
                />
                <div className="mt-[50px] inline-flex items-center gap-2.5 py-3.5 px-2.5 bg-[#e6eaf1] rounded-[50px] text-sm color-grey cursor-pointer dark:bg-medium dark:hover:bg-white  ">
                    <Image
                        className=""
                        src={"/plus.svg"}
                        height="30"
                        width="30"
                        alt=""
                    />
                    {extended ? <p className="dark:text-white dark:hover:text-black">New Chat</p> : null}
                </div>
                {extended ?
                    <div className="flex flex-col">
                        <p className="mt-7 mb-5 dark:text-white">Recent</p>
                        {prevPrompts.map((item:string, index:number) => {
                            return (
                                <div onClick={()=>{loadPrompt(item)}} key={item} className={`flex items-start gap-2.5 p-2.5 ${extended ? 'pr-10' : 'pr-0'} rounded-[50px] color-[#282828] cursor-pointer hover:bg-[#e2e6eb] `}>
                                    <Image
                                        className=""
                                        src={"/message.svg"}
                                        height="30"
                                        width="30"
                                        alt=""
                                    />
                                    <p className="dark:text-white dark:hover:text-black">{item.slice(0,18)} ...</p>
                                </div>
                            )
                        })}
                    </div> : null}
            </div>
            <div className="flex flex-col">
                <div /* bottom-item  */ className={`flex items-start gap-2.5 p-2.5 ${extended ? 'pr-10' : 'pr-0'} rounded-[50px] color-[#282828] cursor-pointer hover:bg-[#e2e6eb] `}>
                    <Image
                        className=""
                        src={"/question.svg"}
                        height="30"
                        width="30"
                        alt=""
                    />
                    {extended ? <p className="dark:text-white dark:hover:text-black">Help</p> : null}
                </div>
                <div /* bottom-item  */ className={`flex items-start gap-2.5 p-2.5 ${extended ? 'pr-10' : 'pr-0'} rounded-[50px] color-[#282828] cursor-pointer hover:bg-[#e2e6eb] `}>
                    <Image
                        className=""
                        src={"/history.svg"}
                        height="30"
                        width="30"
                        alt=""
                    />
                    {extended ? <p className="dark:text-white dark:hover:text-black">Activity</p> : null}
                </div>
                <div /* bottom-item  */ className={`flex items-start gap-2.5 p-2.5 ${extended ? 'pr-10' : 'pr-0'} rounded-[50px] color-[#282828] cursor-pointer hover:bg-[#e2e6eb] `}>
                    <Image
                        className=""
                        src={"/setting.svg"}
                        height="30"
                        width="30"
                        alt=""
                    />
                    {extended ? <p className="dark:text-white dark:hover:text-black">Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
