import Image from "next/image";
import Sidebar from "@/components/sidebar/Sidebar";
import Main from "@/components/Main/Main";
import ContextProvider from "./Context/Context";
export default function Home() {
  return (
    <main className="flex min-h-screen animate-[fadeIn_1.5s]
    dark:bg-dark " >
      <Sidebar/>
      <Main/>
    </main>
  );
}
