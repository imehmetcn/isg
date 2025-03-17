import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
} 