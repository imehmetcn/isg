import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
} 