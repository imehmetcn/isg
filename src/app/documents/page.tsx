"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Document {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  createdAt: string;
}

export default function DocumentsPage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch("/api/documents");
      
      if (!response.ok) {
        throw new Error("Dokümanlar yüklenirken bir hata oluştu");
      }

      const data = await response.json();
      setDocuments(data);
    } catch (error: any) {
      console.error("Dokümanlar yüklenirken hata:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Doküman silinirken bir hata oluştu");
      }

      toast.success("Doküman başarıyla silindi");
      fetchDocuments();
    } catch (error: any) {
      console.error("Doküman silinirken hata:", error);
      toast.error(error.message);
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dokümanlar</h1>
        <Button onClick={() => router.push("/documents/upload")}>
          <Plus className="w-4 h-4 mr-2" />
          Yeni Doküman
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <Card key={doc.id}>
            <CardHeader>
              <CardTitle className="text-lg">{doc.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {doc.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {new Date(doc.createdAt).toLocaleDateString("tr-TR")}
                </span>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(doc.fileUrl, "_blank")}
                  >
                    Görüntüle
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(doc.id)}
                  >
                    Sil
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {documents.length === 0 && (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            Henüz doküman yüklenmemiş
          </div>
        )}
      </div>
    </div>
  );
} 