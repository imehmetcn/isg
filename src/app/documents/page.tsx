"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Document {
  id: string;
  title: string;
  description: string | null;
  category: string;
  fileType: string;
  version: number;
  createdAt: string;
  createdBy: {
    name: string;
  };
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
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Dokümanlar yüklenirken bir hata oluştu");
      }

      setDocuments(data.documents);
    } catch (error: any) {
      console.error("Dokümanlar yüklenirken hata:", error);
    } finally {
      setLoading(false);
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
          <Card
            key={doc.id}
            className="cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => router.push(`/documents/${doc.id}`)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium truncate">
                {doc.title}
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {doc.description || "Açıklama yok"}
              </p>
              <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                <span>{doc.category}</span>
                <span>v{doc.version}</span>
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>{new Date(doc.createdAt).toLocaleDateString("tr-TR")}</span>
                <span>{doc.createdBy.name}</span>
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