import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { generateProgramByTemplate } from '../api/generate-program-by-template'

interface GenerateProgramByTemplateVariables {
  templateId: string
}

export function useGenerateProgramByTemplate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ templateId }: GenerateProgramByTemplateVariables) =>
      generateProgramByTemplate(templateId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.programs.all,
      })
    },
  })
}
