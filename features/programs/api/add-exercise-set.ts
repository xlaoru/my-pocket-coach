import { api } from "@/services/api";
import { IAddExerciseSetPayload } from "../types/exercise.dto";

export async function addExerciseSet(programId: string, exerciseId: string, payload: IAddExerciseSetPayload): Promise<void> {
    await api.post(`/api/programs/${programId}/exercises/${exerciseId}/sets`, payload)
}
