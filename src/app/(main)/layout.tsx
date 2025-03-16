// import { NavBar } from "@/components/ui/tubelight-navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* NavBar kaldırıldı */}
      <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full py-16">
        {children}
      </main>
    </>
  );
} 