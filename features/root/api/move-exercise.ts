import { api } from "@/services/api";
import { IMoveExercisePayload } from "../types/exercise.dto";

export async function moveExercise(programId: string, payload: IMoveExercisePayload): Promise<void> {
    await api.patch(`/api/programs/${programId}/workout/move`, payload)
}