"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Paneli</h1>
        <Button
          variant="destructive"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Çıkış Yap
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-card rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Kullanıcı Yönetimi</h2>
          <Button
            className="w-full"
            onClick={() => router.push("/admin/users")}
          >
            Kullanıcıları Yönet
          </Button>
        </div>

        <div className="p-6 bg-card rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Şirket Yönetimi</h2>
          <Button
            className="w-full"
            onClick={() => router.push("/admin/companies")}
          >
            Şirketleri Yönet
          </Button>
        </div>

        <div className="p-6 bg-card rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Raporlar</h2>
          <Button
            className="w-full"
            onClick={() => router.push("/admin/reports")}
          >
            Raporları Görüntüle
          </Button>
        </div>
      </div>
    </div>
  );
} 