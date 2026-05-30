// Mock API utility for module registry

export interface ModuleStatus {
  id: string;
  status: "live" | "development" | "planned" | "offline";
  ping?: number;
  lastChecked?: string;
}

export const fetchModuleStatus = async (moduleId: string): Promise<ModuleStatus> => {
  // Simulate network request
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: moduleId,
        status: "live",
        ping: Math.floor(Math.random() * 50) + 10,
        lastChecked: new Date().toISOString()
      });
    }, 500);
  });
};

export const fetchAllModulesStatus = async (moduleIds: string[]): Promise<ModuleStatus[]> => {
  return Promise.all(moduleIds.map(id => fetchModuleStatus(id)));
};
