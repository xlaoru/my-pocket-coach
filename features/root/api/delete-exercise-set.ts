import { api } from "@/services/api";

export async function deleteExerciseSet(programId: string, exerciseId: string, setIndex: number): Promise<void> {
    await api.delete(`/api/programs/${programId}/exercises/${exerciseId}/sets/${setIndex}`)
}
