import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTemplateExercise } from '../api/create-template-exercise'
import { ICreateTemplateExercisePayload } from '../types/templateExercise.dto'

interface CreateTemplateExerciseVariables {
  templateId: string
  payload: ICreateTemplateExercisePayload
}

export function useCreateTemplateExercise() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ templateId, payload }: CreateTemplateExerciseVariables) =>
      createTemplateExercise(templateId, payload),
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
