"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function CreateUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Bir hata oluştu");
      }

      toast.success("Kullanıcı başarıyla oluşturuldu");
      router.push("/admin/users");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }
  ) => {
    const { name, value } = 'target' in e ? e.target : e;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Yeni Kullanıcı Oluştur</h1>
        <Button
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Geri
        </Button>
      </div>

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
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Şifre
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="role" className="text-sm font-medium">
            Rol
          </label>
          <Select
            name="role"
            value={formData.role}
            onValueChange={(value) => handleChange({ name: "role", value })}
            disabled={loading}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Rol seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USER">Kullanıcı</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Oluşturuluyor..." : "Kullanıcı Oluştur"}
        </Button>
      </form>
    </div>
  );
} 