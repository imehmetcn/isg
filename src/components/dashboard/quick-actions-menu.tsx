"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, FileUp, UserPlus, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface QuickAction {
  title: string;
  icon: any;
  href: string;
  color: string;
  adminOnly?: boolean;
}

export function QuickActionsMenu() {
  const [showActions, setShowActions] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const quickActions: QuickAction[] = [
    { title: "Doküman Yükle", icon: FileUp, href: "/documents/upload", color: "bg-blue-500" },
    { title: "Kullanıcı Ekle", icon: UserPlus, href: "/admin/users/new", color: "bg-purple-500", adminOnly: true },
    { title: "Arama", icon: Search, href: "/search", color: "bg-green-500" }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <Button
          onClick={() => setShowActions(!showActions)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-shadow"
        >
          <PlusCircle size={24} />
        </Button>
      </motion.div>

      {showActions && (
        <motion.div 
          className="absolute bottom-16 right-0 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          {quickActions.map((action, index) => (
            (!action.adminOnly || session?.user?.role === "ADMIN") && (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-end space-x-2"
              >
                <span className="bg-white px-2 py-1 rounded-md shadow-md text-sm font-medium">
                  {action.title}
                </span>
                <Button
                  onClick={() => router.push(action.href)}
                  className={`h-10 w-10 rounded-full ${action.color} text-white shadow-md hover:shadow-lg transition-shadow`}
                >
                  <action.icon size={18} />
                </Button>
              </motion.div>
            )
          ))}
        </motion.div>
      )}
    </div>
  );
} 