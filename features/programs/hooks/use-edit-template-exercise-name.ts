import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editTemplateExerciseName } from '../api/edit-template-exercise-name'
import { IEditTemplateExerciseNamePayload } from '../types/templateExercise.dto'

interface EditTemplateExerciseNameVariables {
  templateId: string
  exerciseId: string
  payload: IEditTemplateExerciseNamePayload
}

export function useEditTemplateExerciseName() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ templateId, exerciseId, payload }: EditTemplateExerciseNameVariables) =>
      editTemplateExerciseName(templateId, exerciseId, payload),
    onSuccess: (_, variables) => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.templates.byId(variables.templateId),
      })
    },
  })
}
