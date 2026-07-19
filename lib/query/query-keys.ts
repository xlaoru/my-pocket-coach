export const queryKeys = {
  programs: {
    all: ["programs"] as const,
    byId: (id: string) => ["programs", id] as const,
  },
};
