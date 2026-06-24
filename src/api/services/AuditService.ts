import { API_CONFIG } from "../../config/api";
import type {
  AuditDetails,
  AuditHistory,
  CreateAuditPayload,
  UpdateAuditAnswer,
} from "../../types/Types";
import { apiClient } from "../client";

class AuditService {
  private historyEndpoint = API_CONFIG.endpoints.audit.history;
  private getByIdEndpoint = API_CONFIG.endpoints.audit.getById;
  private downloadExcelEndpoint = API_CONFIG.endpoints.audit.downloadExcel;
  private createEndpoint = API_CONFIG.endpoints.audit.create;
  private updateEndpoint = API_CONFIG.endpoints.audit.update;
  private deleteEndpoint = API_CONFIG.endpoints.audit.delete;

  async getHistory(): Promise<AuditHistory[]> {
    return apiClient.get<AuditHistory[]>(this.historyEndpoint);
  }

  async getById(auditId: number): Promise<AuditDetails> {
    return apiClient.get<AuditDetails>(`${this.getByIdEndpoint}${auditId}`);
  }

  async downloadExcelReport(auditId: number): Promise<Blob> {
    const response = await apiClient.get<Blob>(
      `${this.downloadExcelEndpoint}${auditId}`,
      {
        responseType: "blob",
      },
    );
    return response;
  }

  async saveAudit(payload: CreateAuditPayload): Promise<any> {
    return apiClient.post<any>(this.createEndpoint, payload, {
      headers: { "Content-Type": "application/json" },
    });
  }

  async update(
    auditId: number,
    auditorId: number,
    areaId: number,
    answers: UpdateAuditAnswer[],
  ): Promise<any> {
    return apiClient.put<any>(`${this.updateEndpoint}${auditId}`, {
      auditId,
      auditorId,
      areaId,
      answers,
    });
  }

  async delete(id: number): Promise<any> {
    return apiClient.delete<any>(`${this.deleteEndpoint}${id}`);
  }
}

export const auditService = new AuditService();
