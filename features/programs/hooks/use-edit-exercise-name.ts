import { queryKeys } from "@/lib/query/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editExerciseName } from "../api/edit-exercise-name";
import { IEditExerciseNamePayload } from "../types/exercise.dto";

interface EditExerciseNameVariables {
    programId: string;
    exerciseId: string;
    payload: IEditExerciseNamePayload;
}

export function useEditExerciseName() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ programId, exerciseId, payload }: EditExerciseNameVariables) => editExerciseName(programId, exerciseId, payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.programs.byId(variables.programId),
            });
        },
    });
}