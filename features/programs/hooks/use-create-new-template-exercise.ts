import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNewTemplateExercise } from '../api/create-new-template-exercise'
import { ICreateNewTemplateExercisePayload } from '../types/templateSuperset.dto'

interface CreateNewTemplateExerciseVariables {
  templateId: string
  supersetId: string
  payload: ICreateNewTemplateExercisePayload
}

export function useCreateNewTemplateExercise() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ templateId, supersetId, payload }: CreateNewTemplateExerciseVariables) =>
      createNewTemplateExercise(templateId, supersetId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.templates.byId(variables.templateId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.templates.all,
      })
    },
  })
}
