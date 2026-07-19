import { api } from "@/services/api";

export async function deleteExercise(programId: string, exerciseId: string): Promise<void> {
    await api.delete(`/api/programs/${programId}/exercises/${exerciseId}`)
}
