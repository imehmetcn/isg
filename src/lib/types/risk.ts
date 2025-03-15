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
  subCategory: string;
  description: string;
  potentialConsequences: string[];
  controlMeasures: string[];
  riskScore: RiskLevel;
}

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface RiskAssessment {
  id: string;
  title: string;
  department: string;
  assessmentDate: Date;
  reviewDate: Date;
  assessor: string;
  hazards: Hazard[];
  status: 'draft' | 'completed' | 'archived';
}

export const getRiskLevel = (severity: Severity, probability: Probability): RiskLevel => {
  const score = severity * probability;
  
  if (score <= 6) return 'low';
  if (score <= 12) return 'medium';
  if (score <= 20) return 'high';
  return 'critical';
}; 