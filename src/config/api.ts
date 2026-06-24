const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined in environment variables");
}

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  endpoints: {
    audit: {
      history: "/api/Audits/history",
      getById: "/api/Audits/getById/",
      downloadExcel: "/api/Audits/download-excel/",
      create: "/api/Audits/create",
      update: "/api/Audits/update/",
      delete: "/api/Audits/delete/",
    },
    modules: {
      getAll: "/api/Modules/all",
      create: "/api/Modules/create",
      update: "/api/Modules/update",
      delete: "/api/Modules/delete/",
    },
    areas: {
      getById: "/api/Areas/areas/",
      create: "/api/Areas/create",
      update: "/api/Areas/update",
      delete: "/api/Areas/delete/",
    },
    questions: {
      getModule: "/api/Questions/module/",
      create: "/api/Questions/create",
      update: "/api/Questions/update",
      delete: "/api/Questions/delete/",
    },
    auditors: {
      getAll: "/api/Auditors/getAll",
      create: "/api/Auditors/create",
      delete: "/api/Auditors/delete/",
    },
  },
};
