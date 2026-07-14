import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IAddExerciseSetPayload } from "../types/exercise.dto";
import { addExerciseSet } from "../api/add-exercise-set";
import { queryKeys } from "@/lib/query/query-keys";

interface AddExerciseSetVariables {
    programId: string;
    exerciseId: string;
    payload: IAddExerciseSetPayload;
}

export function useAddExerciseSet() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ programId, exerciseId, payload }: AddExerciseSetVariables) => addExerciseSet(programId, exerciseId, payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.programs.byId(variables.programId)
            })
        }
    })
}