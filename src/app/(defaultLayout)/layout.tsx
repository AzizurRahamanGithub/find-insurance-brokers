import Navbar from "@/components/Navbar/page";
import Footer from "@/components/common/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className=" ">
        {children}
      </main>
      <Footer />
    </>
  )
}
