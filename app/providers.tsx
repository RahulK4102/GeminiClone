'use client'
import ContextProvider from "./Context/Context"

export default function Providers({children}:{children:React.ReactNode}) {
  return (
    <ContextProvider >
        {children}
    </ContextProvider>
  )
}
