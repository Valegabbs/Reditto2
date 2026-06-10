export enum Tab {
  HOME = 'HOME',
  HISTORY = 'HISTORY',
  EVOLUTION = 'EVOLUTION',
  THEMES = 'THEMES',
  SETTINGS = 'SETTINGS',
  RESULTS = 'RESULTS'
}

export enum KnowledgeArea {
  EXATAS = 'EXATAS',
  NATUREZA = 'NATUREZA',
  HUMANAS = 'HUMANAS',
  LINGUAGENS = 'LINGUAGENS',
  REDACAO = 'REDACAO',
  BASIC = 'BASIC'
}

export interface UserProfile {
  name: string;
  nickname: string;
  avatar?: string;
  defaultArea: KnowledgeArea;
}

export interface EssaySubmission {
  topic: string;
  content: string;
  file?: File | null;
  responseLength?: 'short' | 'long';
}

export interface WebhookResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface CompetencyScores {
  'Competência I': number;
  'Competência II': number;
  'Competência III': number;
  'Competência IV': number;
  'Competência V': number;
}

export interface CompetencyFeedback {
  'Competência I': string;
  'Competência II': string;
  'Competência III': string;
  'Competência IV': string;
  'Competência V': string;
}

export interface EssayCorrection {
  finalScore: number;
  competencies: CompetencyScores;
  feedback: {
    summary: string;
    improvements: string[];
    attention: string[];
    congratulations: string[];
    competencyFeedback: CompetencyFeedback;
  };
  originalEssay?: string;
  topic: string;
}

export interface TutoringResponse {
  subject: string;
  topic: string;
  explanation: string;
  keyPoints: string[];
  suggestedNextSteps: string[];
  responseLength?: 'short' | 'long';
}

export interface HistoryItem {
  id: string;
  topic: string;
  date: string;
  status: 'Enviado' | 'Corrigido' | 'Erro';
  score?: number;
  correction?: EssayCorrection;
  tutoring?: TutoringResponse;
  area: KnowledgeArea;
  subject: string;
  originalSubmission?: EssaySubmission;
}
