import { queryKeys } from "@/lib/query/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExercise } from "../api/create-exercise";
import { ICreateExercisePayload } from "../types/exercise.dto";

interface CreateExerciseVariables {
  programId: string;
  payload: ICreateExercisePayload;
}

export function useCreateExercise() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ programId, payload }: CreateExerciseVariables) => createExercise(programId, payload),
    onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
            queryKey: queryKeys.programs.byId(variables.programId),
        });
    },
  });
}