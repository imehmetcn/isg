"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function YeniRiskDegerlendirmePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [riskler, setRiskler] = useState([{ id: 1, tehlike: "", risk: "", onlem: "", seviye: "dusuk" }]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // API çağrısı yapılacak
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simüle edilmiş API çağrısı
      router.push("/risk-degerlendirme");
    } catch (error) {
      console.error("Hata:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addRisk = () => {
    setRiskler([
      ...riskler,
      {
        id: riskler.length + 1,
        tehlike: "",
        risk: "",
        onlem: "",
        seviye: "dusuk"
      }
    ]);
  };

  const removeRisk = (id: number) => {
    if (riskler.length > 1) {
      setRiskler(riskler.filter(risk => risk.id !== id));
    }
  };

  const updateRisk = (id: number, field: string, value: string) => {
    setRiskler(riskler.map(risk => 
      risk.id === id ? { ...risk, [field]: value } : risk
    ));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Yeni Risk Değerlendirmesi</h1>
          <p className="text-muted-foreground">
            Risk değerlendirmesi oluşturun
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Genel Bilgiler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="baslik">Başlık</Label>
                <Input
                  id="baslik"
                  placeholder="Risk değerlendirmesi başlığı"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tarih">Tarih</Label>
                <Input
                  id="tarih"
                  type="date"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="aciklama">Açıklama</Label>
              <Textarea
                id="aciklama"
                placeholder="Risk değerlendirmesi hakkında genel açıklama"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Riskler</CardTitle>
            <Button type="button" variant="outline" onClick={addRisk}>
              <Plus className="w-4 h-4 mr-2" />
              Risk Ekle
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {riskler.map((risk) => (
              <div key={risk.id} className="space-y-4 p-4 border rounded-lg relative">
                {riskler.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => removeRisk(risk.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                )}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Tehlike</Label>
                    <Input
                      value={risk.tehlike}
                      onChange={(e) => updateRisk(risk.id, "tehlike", e.target.value)}
                      placeholder="Tehlikeyi tanımlayın"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Risk</Label>
                    <Input
                      value={risk.risk}
                      onChange={(e) => updateRisk(risk.id, "risk", e.target.value)}
                      placeholder="Riski tanımlayın"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Önlem</Label>
                    <Input
                      value={risk.onlem}
                      onChange={(e) => updateRisk(risk.id, "onlem", e.target.value)}
                      placeholder="Alınacak önlemi belirtin"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Risk Seviyesi</Label>
                    <Select
                      value={risk.seviye}
                      onValueChange={(value) => updateRisk(risk.id, "seviye", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dusuk">Düşük</SelectItem>
                        <SelectItem value="orta">Orta</SelectItem>
                        <SelectItem value="yuksek">Yüksek</SelectItem>
                        <SelectItem value="kritik">Kritik</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            İptal
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      </form>
    </div>
  );
} 