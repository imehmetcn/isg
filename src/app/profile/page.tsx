"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Profile {
  id: string;
  name: string;
  email: string;
  role: string;
  company: {
    id: string;
    name: string;
  } | null;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (session?.user?.id) {
      fetchProfile();
    }
  }, [session]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/users/${session?.user?.id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Profil yüklenirken bir hata oluştu");
      }

      setProfile(data);
      setFormData((prev) => ({ ...prev, name: data.name }));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Şifre değişikliği kontrolü
      if (formData.newPassword || formData.currentPassword) {
        if (!formData.currentPassword) {
          throw new Error("Mevcut şifrenizi girmelisiniz");
        }
        if (!formData.newPassword) {
          throw new Error("Yeni şifrenizi girmelisiniz");
        }
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error("Yeni şifreler eşleşmiyor");
        }
        if (formData.newPassword.length < 6) {
          throw new Error("Yeni şifre en az 6 karakter olmalıdır");
        }
      }

      const response = await fetch(`/api/users/${session?.user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Profil güncellenirken bir hata oluştu");
      }

      toast.success("Profil başarıyla güncellendi");
      setIsEditing(false);
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      fetchProfile();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Profil</h1>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Düzenle</Button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Ad Soyad
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="currentPassword" className="text-sm font-medium">
              Mevcut Şifre
            </label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="newPassword" className="text-sm font-medium">
              Yeni Şifre
            </label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Yeni Şifre (Tekrar)
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                setFormData((prev) => ({
                  ...prev,
                  name: profile.name,
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                }));
              }}
              disabled={loading}
            >
              İptal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="grid gap-6 max-w-2xl">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Ad Soyad
            </label>
            <div className="text-lg">{profile.name}</div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Email
            </label>
            <div className="text-lg">{profile.email}</div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Rol
            </label>
            <div className="text-lg">{profile.role}</div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Şirket
            </label>
            <div className="text-lg">
              {profile.company ? profile.company.name : "Şirket atanmamış"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 