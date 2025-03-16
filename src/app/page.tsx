"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText, Users, Activity, Calendar } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const quickLinks = [
    {
      title: "Kullanıcı Yönetimi",
      description: "Kullanıcıları görüntüle, ekle, düzenle ve yönet",
      icon: Users,
      href: "/admin/users",
      adminOnly: true,
    },
    {
      title: "Dokümanlar",
      description: "İSG dokümanlarını görüntüle ve yönet",
      icon: FileText,
      href: "/documents",
      adminOnly: false,
    },
    {
      title: "Eğitimler",
      description: "Eğitimleri planla, katılımcıları yönet",
      icon: Calendar,
      href: "/trainings",
      adminOnly: false,
    },
    {
      title: "Denetimler",
      description: "Denetimleri planla ve raporla",
      icon: Activity,
      href: "/inspections",
      adminOnly: false,
    },
  ];

  return (
    <>
      <NavBar />
      <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pt-20 pb-16">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold">
              Hoş Geldiniz, {session?.user?.name}
            </h1>
            <p className="text-muted-foreground">
              İSG Yönetim Sistemi'ne hoş geldiniz. Aşağıdaki bağlantıları kullanarak hızlıca işlem yapabilirsiniz.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link) => (
              (!link.adminOnly || session?.user?.role === "ADMIN") && (
                <Card key={link.href} className="hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => router.push(link.href)}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{link.title}</CardTitle>
                    <link.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {link.description}
                    </p>
                    <div className="flex items-center pt-4">
                      <Button variant="link" className="p-0 h-auto font-normal" onClick={() => router.push(link.href)}>
                        Görüntüle
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <Button onClick={() => router.push("/dashboard")} variant="outline" size="lg">
              Kontrol Paneline Git
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </>
  );
} 