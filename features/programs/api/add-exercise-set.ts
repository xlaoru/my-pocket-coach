import { api } from "@/services/api";
import { IExercise } from "@/types/models";
import { IAddExerciseSetPayload, IExerciseDto } from "../types/exercise.dto";
import { mapExerciseDtoToModel } from "../mappers/exercise.mapper";

export async function addExerciseSet(programId: string, exerciseId: string, payload: IAddExerciseSetPayload): Promise<IExercise> {
    const { data } = await api.post<IExerciseDto>(`/api/programs/${programId}/exercises/${exerciseId}/sets`, payload)
    return mapExerciseDtoToModel(data)
}