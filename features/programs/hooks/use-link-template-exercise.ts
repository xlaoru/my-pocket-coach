import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { linkTemplateExercise } from '../api/link-template-exercise'

interface LinkTemplateExerciseVariables {
  templateId: string
  supersetId: string
  exerciseId: string
}

export function useLinkTemplateExercise() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ templateId, supersetId, exerciseId }: LinkTemplateExerciseVariables) =>
      linkTemplateExercise(templateId, supersetId, exerciseId),
    onSuccess: (_, variables) => {
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.templates.byId(variables.templateId),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.templates.all,
        }),
      ])
    },
  })
}
