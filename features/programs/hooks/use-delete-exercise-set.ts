import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExerciseSet } from "../api/delete-exercise-set";
import { queryKeys } from "@/lib/query/query-keys";

interface DeleteExerciseSetVariables {
    programId: string;
    exerciseId: string;
    setIndex: number
}

export function useDeleteExerciseSet() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ programId, exerciseId, setIndex}: DeleteExerciseSetVariables) => deleteExerciseSet(programId, exerciseId, setIndex),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.programs.byId(variables.programId)
            })
        }
    })
}