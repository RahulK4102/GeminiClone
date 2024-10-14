import Sidebar from "@/components/sidebar/Sidebar";
import Main from "@/components/Main/Main";
export default function Home() {
  return (
    <main className="flex min-h-screen animate-[fadeIn_1.5s]
    dark:bg-dark " >
      <Sidebar/>
      <Main/>
    </main>
  );
}
