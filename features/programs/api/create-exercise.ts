import { api } from "@/services/api";
import { ICreateExercisePayload } from "../types/exercise.dto";

export async function createExercise(programId: string, payload: ICreateExercisePayload): Promise<void> {
    await api.post(`/api/programs/${programId}/exercises`, payload)
}
