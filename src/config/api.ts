const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined in environment variables");
}

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  endpoints: {
    modules: {
      getAll: "/api/Modules/all",
      create: "/api/Modules/create",
      update: "/api/Modules/update",
    },
    areas: {
      create: "/api/Areas/create",
    },
  },
};
