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

export interface AllQuestions {
  id: number;
  text: string;
}
