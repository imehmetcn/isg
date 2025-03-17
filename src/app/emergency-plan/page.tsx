"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { FileWarning, Phone, Users, Building2, ArrowRight, Download } from "lucide-react";

export default function EmergencyPlanPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Acil Durum Planı</h1>
          <p className="text-muted-foreground">
            İşyeri acil durum planını oluşturun ve yönetin
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Planı İndir
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Genel Bilgiler</TabsTrigger>
          <TabsTrigger value="contacts">Acil Durum Ekibi</TabsTrigger>
          <TabsTrigger value="procedures">Prosedürler</TabsTrigger>
          <TabsTrigger value="evacuation">Tahliye Planı</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>İşyeri Bilgileri</CardTitle>
              <CardDescription>
                İşyerinizin temel bilgilerini ve acil durum hazırlık seviyesini girin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">İşyeri Adı</Label>
                  <Input id="companyName" placeholder="İşyeri adını girin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Adres</Label>
                  <Input id="address" placeholder="İşyeri adresini girin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeCount">Çalışan Sayısı</Label>
                  <Input id="employeeCount" type="number" placeholder="Çalışan sayısını girin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="floors">Kat Sayısı</Label>
                  <Input id="floors" type="number" placeholder="Bina kat sayısını girin" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Değerlendirmesi</CardTitle>
              <CardDescription>
                İşyerinizin karşılaşabileceği potansiyel acil durumları belirleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="risks">Potansiyel Riskler</Label>
                  <Textarea
                    id="risks"
                    placeholder="İşyerinizin karşılaşabileceği potansiyel acil durumları listeleyin"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preventiveMeasures">Önleyici Tedbirler</Label>
                  <Textarea
                    id="preventiveMeasures"
                    placeholder="Alınan önleyici tedbirleri listeleyin"
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Acil Durum Ekibi</CardTitle>
              <CardDescription>
                Acil durum müdahale ekibinin üyelerini ve iletişim bilgilerini girin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="teamLeader">Ekip Lideri</Label>
                    <Input id="teamLeader" placeholder="Ekip liderinin adı" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leaderPhone">İletişim Numarası</Label>
                    <Input id="leaderPhone" placeholder="Telefon numarası" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Ekip Üyeleri</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span className="font-medium">Arama Kurtarma</span>
                        </div>
                        <Input placeholder="Üye adı" className="mb-2" />
                        <Input placeholder="Telefon" />
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span className="font-medium">İlk Yardım</span>
                        </div>
                        <Input placeholder="Üye adı" className="mb-2" />
                        <Input placeholder="Telefon" />
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <FileWarning className="h-4 w-4" />
                          <span className="font-medium">Yangın Söndürme</span>
                        </div>
                        <Input placeholder="Üye adı" className="mb-2" />
                        <Input placeholder="Telefon" />
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="procedures" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Acil Durum Prosedürleri</CardTitle>
              <CardDescription>
                Farklı acil durum senaryoları için prosedürleri tanımlayın
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Yangın Prosedürü</Label>
                  <Textarea
                    placeholder="Yangın durumunda izlenecek adımları detaylı olarak yazın"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Deprem Prosedürü</Label>
                  <Textarea
                    placeholder="Deprem durumunda izlenecek adımları detaylı olarak yazın"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>İş Kazası Prosedürü</Label>
                  <Textarea
                    placeholder="İş kazası durumunda izlenecek adımları detaylı olarak yazın"
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evacuation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tahliye Planı</CardTitle>
              <CardDescription>
                Acil durum tahliye planını ve toplanma noktalarını belirleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Toplanma Noktaları</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-4 w-4" />
                          <span className="font-medium">Ana Toplanma Noktası</span>
                        </div>
                        <Input placeholder="Konum açıklaması" />
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <ArrowRight className="h-4 w-4" />
                          <span className="font-medium">Alternatif Toplanma Noktası</span>
                        </div>
                        <Input placeholder="Konum açıklaması" />
                      </div>
                    </Card>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Tahliye Yolları</Label>
                  <Textarea
                    placeholder="Ana ve alternatif tahliye yollarını detaylı olarak açıklayın"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Özel Durumlar</Label>
                  <Textarea
                    placeholder="Engelli çalışanlar veya özel ekipmanlar için tahliye planını açıklayın"
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 