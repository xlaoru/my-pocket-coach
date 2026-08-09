export const queryKeys = {
  programs: {
    all: ['programs'] as const,
    byId: (id: string) => ['programs', id] as const,
  },
  periodizations: {
    all: ['periodizations'] as const,
    byId: (id: string) => ['periodizations', id] as const,
  },
  templates: {
    all: ['templates'] as const,
    byId: (id: string) => ['templates'] as const,
  },
}
