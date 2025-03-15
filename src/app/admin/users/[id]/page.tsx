"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  company: {
    id: string;
    name: string;
  } | null;
}

interface Props {
  params: {
    id: string;
  };
}

export default function UserDetailPage({ params }: Props) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/users/${params.id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Kullanıcı yüklenirken bir hata oluştu");
      }

      setUser(data);
    } catch (error: any) {
      toast.error(error.message);
      router.push("/admin/users");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Kullanıcı Detayı</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.back()}
          >
            Geri
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(`/admin/users/${user.id}/edit`)}
          >
            Düzenle
          </Button>
        </div>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Ad Soyad
          </label>
          <div className="text-lg">{user.name}</div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Email
          </label>
          <div className="text-lg">{user.email}</div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Rol
          </label>
          <div className="text-lg">{user.role}</div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Kayıt Tarihi
          </label>
          <div className="text-lg">
            {new Date(user.createdAt).toLocaleDateString("tr-TR")}
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Şirket
          </label>
          <div className="text-lg">
            {user.company ? user.company.name : "Şirket atanmamış"}
          </div>
        </div>
      </div>
    </div>
  );
} 