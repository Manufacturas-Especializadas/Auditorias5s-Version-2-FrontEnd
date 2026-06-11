export interface AllModule {
  isActive: any;
  moduleId: number;
  name: string;
}

export interface CreateModule {
  name: string;
}

export interface CreateAreas {
  moduleId: number;
  name: string;
}

export interface AllAreas {
  areaId: number;
  name: string;
  isActive: boolean;
  moduleId: number;
}

export interface AllQuestion {
  id: number;
  moduleId: number;
  categoryId: number;
  text: string;
  displayOrder: number;
  isActive: boolean;
}

export interface BackendGroupedQuestions {
  key: string;
  title: string;
  questions: {
    id: number;
    text: string;
    displayOrder?: number;
    isActive?: boolean;
  }[];
}

export interface AllAuditor {
  auditorId: number;
  fullName: string;
  isActive: boolean;
}

export interface AuditAnswerPayload {
  questionId: number;
  score: number;
}

export interface CreateAuditPayload {
  areaId: number;
  auditorId: number;
  answers: AuditAnswerPayload[];
}
