'use client'

import { Context } from "@/app/Context/Context"
import Image from "next/image"
import { useContext, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function Sidebar() {
  const [extended, setExtended] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const context = useContext(Context)

  const loadPrompt = async (prompt: string) => {
    context?.setRecentPrompt(prompt)
    await context?.onSent(prompt)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div
      className={`min-h-screen flex flex-col justify-between bg-gray-100 dark:bg-gray-800 ${
        extended ? 'w-64' : 'w-16'
      } py-4 px-2 transition-all duration-300`}
    >
      <div className="flex flex-col">
        <button
          onClick={() => setExtended((prev) => !prev)}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 mb-4"
        >
          <Image src="/menu.svg" height={20} width={20} alt="Menu" />
        </button>
        <button
  className={`flex items-center ${
    extended ? 'px-4 w-48 justify-start' : 'w-12 justify-center' 
  } h-12 bg-white dark:bg-gray-700 rounded-md text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600 transition-all duration-300 mb-6`}
>
  <Image src="/plus.svg" height={20} width={20} alt="New Chat" />
  {extended && <span className="ml-2 text-sm font-medium">New Chat</span>}
</button>

        {extended && (
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Recent</p>
            <div className="space-y-1">
              {context?.prevPrompts.map((item: string, index: number) => (
                <button
                  key={index}
                  onClick={() => loadPrompt(item)}
                  className="w-full flex items-center gap-2 p-2 rounded-md text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <Image src="/message.svg" height={16} width={16} alt="Message" />
                  <span className="truncate">{item}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
              <Image src="/question.svg" height={20} width={20} alt="Help" />
              {extended && <span className="ml-2 text-sm">Help</span>}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2">
            <div className="flex flex-col space-y-1">
              <button className="text-sm text-left p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">Privacy Hub</button>
              <button className="text-sm text-left p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">Help</button>
              <button className="text-sm text-left p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">FAQ</button>
              <button className="text-sm text-left p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">About Gemini Advanced</button>
            </div>
          </PopoverContent>
        </Popover>
        <button className="flex items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
          <Image src="/history.svg" height={20} width={20} alt="Activity" />
          {extended && <span className="ml-2 text-sm">Activity</span>}
        </button>
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
              <Image src="/setting.svg" height={20} width={20} alt="Settings" />
              {extended && <span className="ml-2 text-sm">Settings</span>}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="text-sm">Dark Mode</Label>
              <Switch id="dark-mode" checked={darkMode} onCheckedChange={toggleDarkMode} />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}