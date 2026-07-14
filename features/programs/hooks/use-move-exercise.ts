import { useMutation, useQueryClient } from "@tanstack/react-query"
import { IMoveExercisePayload } from "../types/exercise.dto"
import { moveExercise } from "../api/move-exercise"
import { queryKeys } from "@/lib/query/query-keys"
import { IProgram } from "@/types/models"

interface MoveExerciseVariables {
    programId: string
    payload: IMoveExercisePayload
}

export function useMoveExercise() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ programId, payload }: MoveExerciseVariables) => moveExercise(programId, payload),
        onMutate: async ({ programId, payload }) => {
            const queryKey = queryKeys.programs.byId(programId)

            await queryClient.cancelQueries({ queryKey })

            const previousProgram = queryClient.getQueryData<IProgram>(queryKey)

            if (previousProgram && payload.containerId === programId) {
                const workout = [...previousProgram.workout]
                const [movedItem] = workout.splice(payload.sourceIndex, 1)
                workout.splice(payload.destinationIndex, 0, movedItem)

                queryClient.setQueryData<IProgram>(queryKey, {
                    ...previousProgram,
                    workout,
                })
            }

            return { previousProgram }
        },
        onError: (_error, variables, context) => {
            if (context?.previousProgram) {
                queryClient.setQueryData(
                    queryKeys.programs.byId(variables.programId),
                    context.previousProgram
                )
            }
        },
        onSettled: (_data, _error, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.programs.byId(variables.programId)
            })
        }
    })
}