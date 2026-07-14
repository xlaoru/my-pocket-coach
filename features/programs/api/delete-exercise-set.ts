import { api } from "@/services/api";
import { IExercise } from "@/types/models";
import { IExerciseDto } from "../types/exercise.dto";
import { mapExerciseDtoToModel } from "../mappers/exercise.mapper";

export async function deleteExerciseSet(programId: string, exerciseId: string, setIndex: number): Promise<IExercise> {
    const { data } = await api.delete<IExerciseDto>(`/api/programs/${programId}/exercises/${exerciseId}/sets/${setIndex}`)
    return mapExerciseDtoToModel(data)
}