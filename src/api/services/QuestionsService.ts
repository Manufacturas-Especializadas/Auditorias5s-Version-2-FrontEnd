import { API_CONFIG } from "../../config/api";
import type { BackendGroupedQuestions } from "../../types/Types";
import { apiClient } from "../client";

class QuestionsService {
  private getByModuleEndpoint = API_CONFIG.endpoints.questions.getModule;
  private createEndpoint = API_CONFIG.endpoints.questions.create;
  private updateEndpoint = API_CONFIG.endpoints.questions.update;
  private deleteEndpoint = API_CONFIG.endpoints.questions.delete;

  async getByModuleGrouped(id: number): Promise<BackendGroupedQuestions[]> {
    return apiClient.get<BackendGroupedQuestions[]>(
      `${this.getByModuleEndpoint}${id}`,
    );
  }

  async create(
    moduleId: number,
    categoryId: number,
    questionText: string,
  ): Promise<any> {
    return apiClient.post<any>(this.createEndpoint, {
      moduleId,
      categoryId,
      questionText,
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
    return apiClient.put<any>(
      this.updateEndpoint,
      {
        questionId,
        moduleId,
        categoryId,
        questionText,
        displayOrder,
        isActive,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  async delete(questionId: number): Promise<any> {
    return apiClient.delete<any>(`${this.deleteEndpoint}${questionId}`);
  }
}

export const questionsService = new QuestionsService();
