import { IExercise } from "@/types/models";
import { mapExerciseDtoToModel } from "../mappers/exercise.mapper";
import { api } from "@/services/api";
import { IExerciseDto } from "../types/exercise.dto";

export async function deleteExercise(programId: string, exerciseId: string): Promise<IExercise> {
    const { data } = await api.delete<IExerciseDto>(`/api/programs/${programId}/exercises/${exerciseId}`)
    return mapExerciseDtoToModel(data)
}