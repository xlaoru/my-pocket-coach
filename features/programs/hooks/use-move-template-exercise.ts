import { queryKeys } from '@/lib/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { moveTemplateExercise } from '../api/move-template-exercise'
import { IMoveTemplateExercisePayload } from '../types/templateExercise.dto'
import { ITemplateDto } from '../types/templates.dto'

interface MoveTemplateExericseVariables {
  templateId: string
  payload: IMoveTemplateExercisePayload
}

export function useMoveTemplateExercise() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ templateId, payload }: MoveTemplateExericseVariables) =>
      moveTemplateExercise(templateId, payload),
    onMutate: async ({ templateId, payload }) => {
      const queryKey = queryKeys.templates.byId(templateId)

      await queryClient.cancelQueries({ queryKey })

      const previousTemplate = queryClient.getQueryData<ITemplateDto>(queryKey)

      if (previousTemplate && payload.containerId === templateId) {
        const templateWorkout = [...previousTemplate.templateWorkout]
        const [movedItem] = templateWorkout.splice(payload.sourceIndex, 1)
        templateWorkout.splice(payload.destinationIndex, 0, movedItem)

        queryClient.setQueryData<ITemplateDto>(queryKey, {
          ...previousTemplate,
          templateWorkout,
        })
      } else if (previousTemplate) {
        const templateWorkout = previousTemplate.templateWorkout.map((item) => {
          if (item._id !== payload.containerId || item.type !== 'superset') {
            return item
          }

          const components = [...item.components]
          const [movedComponent] = components.splice(payload.sourceIndex, 1)
          components.splice(payload.destinationIndex, 0, movedComponent)

          return { ...item, components }
        })

        queryClient.setQueryData<ITemplateDto>(queryKey, {
          ...previousTemplate,
          templateWorkout,
        })
      }

      return { previousTemplate }
    },
    onError: (_error, variables, context) => {
      if (context?.previousTemplate) {
        queryClient.setQueryData(
          queryKeys.templates.byId(variables.templateId),
          context.previousTemplate,
        )
      }
    },
    onSettled: (_data, _error, variables) => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.templates.byId(variables.templateId),
      })
    },
  })
}
