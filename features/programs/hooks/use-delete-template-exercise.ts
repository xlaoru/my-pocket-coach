import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTemplateExercise } from '../api/delete-template-exercise'

interface DelteTemplateExerciseVariables {
  templateId: string
  exerciseId: string
}

export function useDeleteTemplateExercise() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ templateId, exerciseId }: DelteTemplateExerciseVariables) =>
      deleteTemplateExercise(templateId, exerciseId),
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
