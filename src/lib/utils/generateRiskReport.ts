import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Hazard, RiskAssessment } from '../types/risk';

export const generateRiskReport = (assessment: RiskAssessment) => {
  const doc = new jsPDF();
  
  // Başlık
  doc.setFontSize(20);
  doc.text('Risk Değerlendirme Raporu', 20, 20);
  
  // Değerlendirme Bilgileri
  doc.setFontSize(12);
  doc.text(`Değerlendirme Başlığı: ${assessment.title}`, 20, 35);
  doc.text(`Departman: ${assessment.department}`, 20, 45);
  doc.text(`Değerlendirme Tarihi: ${assessment.assessmentDate.toLocaleDateString()}`, 20, 55);
  doc.text(`Gözden Geçirme Tarihi: ${assessment.reviewDate.toLocaleDateString()}`, 20, 65);
  doc.text(`Değerlendiren: ${assessment.assessor}`, 20, 75);
  doc.text(`Durum: ${assessment.status}`, 20, 85);

  // Risk İstatistikleri
  const riskStats = calculateRiskStats(assessment.hazards);
  doc.setFontSize(14);
  doc.text('Risk İstatistikleri', 20, 100);
  doc.setFontSize(12);
  doc.text(`Toplam Tehlike: ${assessment.hazards.length}`, 20, 110);
  doc.text(`Düşük Risk: ${riskStats.low}`, 20, 120);
  doc.text(`Orta Risk: ${riskStats.medium}`, 20, 130);
  doc.text(`Yüksek Risk: ${riskStats.high}`, 20, 140);
  doc.text(`Çok Yüksek Risk: ${riskStats.veryHigh}`, 20, 150);

  // Tehlike Tablosu
  doc.addPage();
  
  const tableData = assessment.hazards.map(hazard => [
    hazard.category,
    hazard.subCategory || '-',
    hazard.description,
    hazard.potentialConsequences.join('\n'),
    hazard.controlMeasures.join('\n'),
    hazard.riskScore.level,
    hazard.riskScore.score.toString()
  ]);

  autoTable(doc, {
    head: [['Kategori', 'Alt Kategori', 'Tehlike Tanımı', 'Olası Sonuçlar', 'Kontrol Önlemleri', 'Risk Seviyesi', 'Risk Skoru']],
    body: tableData,
    startY: 20,
    styles: {
      fontSize: 10,
      cellPadding: 5
    },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 25 },
      2: { cellWidth: 35 },
      3: { cellWidth: 35 },
      4: { cellWidth: 35 },
      5: { cellWidth: 20 },
      6: { cellWidth: 15 }
    },
    didDrawPage: (data) => {
      // Sayfa numarası
      doc.setFontSize(10);
      doc.text(
        `Sayfa ${doc.internal.getCurrentPageInfo().pageNumber}/${doc.internal.getNumberOfPages()}`,
        doc.internal.pageSize.width - 20,
        doc.internal.pageSize.height - 10,
        { align: 'right' }
      );
    }
  });

  // Onay Bölümü
  doc.addPage();
  doc.setFontSize(14);
  doc.text('Onay', 20, 20);
  doc.setFontSize(12);
  doc.text('Hazırlayan:', 20, 40);
  doc.line(20, 45, 100, 45);
  doc.text('Kontrol Eden:', 20, 70);
  doc.line(20, 75, 100, 75);
  doc.text('Onaylayan:', 20, 100);
  doc.line(20, 105, 100, 105);

  return doc;
};

const calculateRiskStats = (hazards: Hazard[]) => {
  return hazards.reduce((stats, hazard) => {
    switch (hazard.riskScore.level) {
      case 'Düşük':
        stats.low++;
        break;
      case 'Orta':
        stats.medium++;
        break;
      case 'Yüksek':
        stats.high++;
        break;
      case 'Çok Yüksek':
        stats.veryHigh++;
        break;
    }
    return stats;
  }, {
    low: 0,
    medium: 0,
    high: 0,
    veryHigh: 0
  });
}; 