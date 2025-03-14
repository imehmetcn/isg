export type Severity = 1 | 2 | 3 | 4 | 5;
export type Probability = 1 | 2 | 3 | 4 | 5;

export interface RiskScore {
  severity: Severity;
  probability: Probability;
  score: number;
  level: 'Düşük' | 'Orta' | 'Yüksek' | 'Çok Yüksek';
  color: string;
}

export interface Hazard {
  id: string;
  category: string;
  subCategory?: string;
  description: string;
  potentialConsequences: string[];
  controlMeasures: string[];
  riskScore: RiskScore;
}

export interface RiskAssessment {
  id: string;
  title: string;
  department: string;
  assessmentDate: Date;
  reviewDate: Date;
  assessor: string;
  hazards: Hazard[];
  status: 'draft' | 'pending' | 'approved' | 'archived';
}

export const getRiskLevel = (severity: Severity, probability: Probability): RiskScore => {
  const score = severity * probability;
  
  if (score <= 4) {
    return { severity, probability, score, level: 'Düşük', color: '#4CAF50' };
  } else if (score <= 9) {
    return { severity, probability, score, level: 'Orta', color: '#FFC107' };
  } else if (score <= 16) {
    return { severity, probability, score, level: 'Yüksek', color: '#FF5722' };
  } else {
    return { severity, probability, score, level: 'Çok Yüksek', color: '#F44336' };
  }
}; 