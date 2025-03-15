import { Metadata } from "next"
import { UserCreateButton } from "@/components/admin/user-create-button"
import { UserList } from "@/components/admin/user-list"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for user management",
}

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Kullanıcı Yönetimi</h2>
        <UserCreateButton />
      </div>
      <UserList />
    </div>
  )
} 