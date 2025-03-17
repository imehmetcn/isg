"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@uploadthing/react";
import { toast } from "sonner";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export default function UploadDocumentPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !fileUrl) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          fileUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Belge yüklenirken bir hata oluştu");
      }

      toast.success("Belge başarıyla yüklendi");
      router.push("/documents");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Belge yüklenirken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-2xl space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Belge Yükle</h2>
          <p className="text-muted-foreground">
            Yeni bir belge yüklemek için aşağıdaki formu doldurun.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Başlık</Label>
            <Input
              id="title"
              placeholder="Belge başlığı"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Açıklama</Label>
            <Textarea
              id="description"
              placeholder="Belge açıklaması"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Dosya</Label>
            <div className="mt-4">
              <UploadDropzone<OurFileRouter, "documentUploader">
                endpoint="documentUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0]) {
                    setFileUrl(res[0].url);
                    toast.success("Dosya yüklendi!");
                  }
                }}
                onUploadError={(error: Error) => {
                  toast.error(`Dosya yüklenirken hata oluştu: ${error.message}`);
                }}
              />
            </div>
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Yükleniyor..." : "Yükle"}
          </Button>
        </form>
      </div>
    </div>
  );
} 