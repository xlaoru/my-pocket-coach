import { api } from "@/services/api";
import { IEditExerciseNamePayload } from "../types/exercise.dto";

export async function editExerciseName(programId: string, exerciseId: string, payload: IEditExerciseNamePayload): Promise<void> {
    await api.patch(`/api/programs/${programId}/exercises/${exerciseId}`, payload);
}
