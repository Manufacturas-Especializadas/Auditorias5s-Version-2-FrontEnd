import { API_CONFIG } from "../../config/api";
import type { AllQuestions } from "../../types/Types";
import { apiClient } from "../client";

class QuestionsService {
  private getByModuleEndpoint = API_CONFIG.endpoints.questions.getModule;
  private createEndpoint = API_CONFIG.endpoints.questions.create;
  private updateEndpoint = API_CONFIG.endpoints.questions.update;
  private deleteEndpoint = API_CONFIG.endpoints.questions.delete;

  async getByModule(id: number): Promise<AllQuestions[]> {
    return apiClient.get<AllQuestions[]>(`${this.getByModuleEndpoint}${id}`);
  }

  async create(
    moduleId: number,
    categoryId: number,
    questionText: string,
    displayOrder: number,
  ): Promise<any> {
    return apiClient.post<any>(this.createEndpoint, {
      moduleId,
      categoryId,
      questionText,
      displayOrder,
    });
  }

  async update(
    questionId: number,
    moduleId: number,
    categoryId: number,
    questionText: string,
    displayOrder: number,
    isActive: boolean,
  ): Promise<any> {
    return apiClient.put<any>(this.updateEndpoint, {
      questionId,
      moduleId,
      categoryId,
      questionText,
      displayOrder,
      isActive,
    });
  }

  async delete(questionId: number): Promise<any> {
    return apiClient.delete<any>(`${this.deleteEndpoint}${questionId}`);
  }
}

export const questionsService = new QuestionsService();
