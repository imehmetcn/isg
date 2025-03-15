import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Hazard, RiskAssessment } from '@/lib/types/risk';

const getRiskLevelText = (riskLevel: string): string => {
  switch (riskLevel) {
    case 'low':
      return 'Düşük';
    case 'medium':
      return 'Orta';
    case 'high':
      return 'Yüksek';
    case 'critical':
      return 'Kritik';
    default:
      return 'Bilinmiyor';
  }
};

const getRiskLevelColor = (riskLevel: string): string => {
  switch (riskLevel) {
    case 'low':
      return '#4CAF50';
    case 'medium':
      return '#FFC107';
    case 'high':
      return '#FF5722';
    case 'critical':
      return '#F44336';
    default:
      return '#E5E7EB';
  }
};

export const generateRiskReport = (assessment: RiskAssessment) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = margin;

  // Başlık
  doc.setFontSize(20);
  doc.text('Risk Değerlendirme Raporu', pageWidth / 2, y, { align: 'center' });
  y += 15;

  // Değerlendirme Bilgileri
  doc.setFontSize(12);
  doc.text(`Değerlendirme Başlığı: ${assessment.title}`, margin, y);
  y += 10;
  doc.text(`Departman: ${assessment.department}`, margin, y);
  y += 10;
  doc.text(`Değerlendiren: ${assessment.assessor}`, margin, y);
  y += 10;
  doc.text(`Değerlendirme Tarihi: ${assessment.assessmentDate.toLocaleDateString()}`, margin, y);
  y += 10;
  doc.text(`Gözden Geçirme Tarihi: ${assessment.reviewDate.toLocaleDateString()}`, margin, y);
  y += 20;

  // Tehlikeler Tablosu
  doc.setFontSize(14);
  doc.text('Tespit Edilen Tehlikeler', margin, y);
  y += 10;

  // Tablo başlıkları
  doc.setFontSize(10);
  const headers = ['Kategori', 'Tehlike', 'Risk Seviyesi', 'Kontrol Önlemleri'];
  const columnWidths = [40, 50, 30, 60];
  let x = margin;

  headers.forEach((header, i) => {
    doc.text(header, x, y);
    x += columnWidths[i];
  });
  y += 5;

  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  // Tehlikeler
  assessment.hazards.forEach((hazard: Hazard) => {
    if (y > doc.internal.pageSize.getHeight() - 30) {
      doc.addPage();
      y = margin;
    }

    x = margin;
    const riskLevelText = getRiskLevelText(hazard.riskScore);

    doc.text(hazard.category, x, y, { maxWidth: columnWidths[0] - 5 });
    x += columnWidths[0];

    doc.text(hazard.description, x, y, { maxWidth: columnWidths[1] - 5 });
    x += columnWidths[1];

    doc.text(riskLevelText, x, y);
    x += columnWidths[2];

    const controlMeasures = hazard.controlMeasures.join(', ');
    doc.text(controlMeasures, x, y, { maxWidth: columnWidths[3] - 5 });

    y += 15;
  });

  // İstatistikler
  y += 10;
  doc.setFontSize(14);
  doc.text('Risk Değerlendirmesi Özeti', margin, y);
  y += 10;

  doc.setFontSize(10);
  const totalHazards = assessment.hazards.length;
  const riskLevels = {
    low: assessment.hazards.filter(h => h.riskScore === 'low').length,
    medium: assessment.hazards.filter(h => h.riskScore === 'medium').length,
    high: assessment.hazards.filter(h => h.riskScore === 'high').length,
    critical: assessment.hazards.filter(h => h.riskScore === 'critical').length,
  };

  doc.text(`Toplam Tehlike Sayısı: ${totalHazards}`, margin, y);
  y += 7;
  doc.text(`Düşük Risk: ${riskLevels.low} (${((riskLevels.low / totalHazards) * 100).toFixed(1)}%)`, margin, y);
  y += 7;
  doc.text(`Orta Risk: ${riskLevels.medium} (${((riskLevels.medium / totalHazards) * 100).toFixed(1)}%)`, margin, y);
  y += 7;
  doc.text(`Yüksek Risk: ${riskLevels.high} (${((riskLevels.high / totalHazards) * 100).toFixed(1)}%)`, margin, y);
  y += 7;
  doc.text(`Kritik Risk: ${riskLevels.critical} (${((riskLevels.critical / totalHazards) * 100).toFixed(1)}%)`, margin, y);

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