"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  const [error, setError] = useState("");

  // Kullanıcıları getir
  async function fetchUsers() {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Kullanıcılar yüklenirken bir hata oluştu");
      }

      setUsers(data.users);
    } catch (err) {
      setError("Kullanıcılar yüklenirken bir hata oluştu");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Component yüklendiğinde kullanıcıları getir
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kullanıcı Yönetimi</h1>
        <Button onClick={() => router.push("/admin/users/create")}>
          Yeni Kullanıcı Ekle
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-card rounded-lg shadow">
        <div className="p-4">
          <Input
            placeholder="Kullanıcı ara..."
            className="max-w-sm"
            onChange={(e) => {
              // TODO: Implement search
            }}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>İsim</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Kayıt Tarihi</TableHead>
              <TableHead>İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Yükleniyor...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Henüz kullanıcı bulunmuyor.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString("tr-TR")}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/admin/users/${user.id}/edit`)}
                    >
                      Düzenle
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 