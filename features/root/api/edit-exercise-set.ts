import { api } from "@/services/api";
import { IEditExerciseSetPayload } from "../types/exercise.dto";

export async function editExerciseSet(programId: string, exerciseId: string, setIndex: number, payload: IEditExerciseSetPayload): Promise<void> {
    await api.patch(`/api/programs/${programId}/exercises/${exerciseId}/sets/${setIndex}`, payload)
}
