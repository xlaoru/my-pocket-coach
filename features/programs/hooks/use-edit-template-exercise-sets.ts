import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editTemplateExerciseSets } from '../api/edit-template-exercise-sets'
import { IEditTemplateExerciseSetsPayload } from '../types/templateExercise.dto'

interface EditTemplateExerciseSetsVariables {
  templateId: string
  exerciseId: string
  payload: IEditTemplateExerciseSetsPayload
}

export function useEditTemplateExerciseSets() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ templateId, exerciseId, payload }: EditTemplateExerciseSetsVariables) =>
      editTemplateExerciseSets(templateId, exerciseId, payload),
    onSuccess: (_, variables) => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.templates.byId(variables.templateId),
      })
    },
  })
}
