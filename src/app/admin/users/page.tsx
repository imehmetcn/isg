"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DeleteUserModal } from "@/components/modals/delete-user-modal";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [deleteUser, setDeleteUser] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Kullanıcılar yüklenirken bir hata oluştu");
      }

      setUsers(data.users);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteUser) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/users/${deleteUser.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Kullanıcı silinirken bir hata oluştu");
      }

      toast.success("Kullanıcı başarıyla silindi");
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== deleteUser.id)
      );
      setDeleteUser(null);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Kullanıcılar</h1>
        <Button onClick={() => router.push("/admin/users/create")}>
          Yeni Kullanıcı
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="İsim veya email ile ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-48">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Rol seç" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tümü</SelectItem>
              <SelectItem value="USER">Kullanıcı</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="h-12 px-4 text-left align-middle font-medium">
                Ad Soyad
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium">
                Email
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium">
                Rol
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium">
                Kayıt Tarihi
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  {new Date(user.createdAt).toLocaleDateString("tr-TR")}
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/admin/users/${user.id}`)}
                    >
                      Detay
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/admin/users/${user.id}/edit`)}
                    >
                      Düzenle
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        setDeleteUser({ id: user.id, name: user.name })
                      }
                    >
                      Sil
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteUserModal
        isOpen={!!deleteUser}
        onClose={() => setDeleteUser(null)}
        onConfirm={handleDelete}
        userName={deleteUser?.name || ""}
        loading={isDeleting}
      />
    </div>
  );
} 