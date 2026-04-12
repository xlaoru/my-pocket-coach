import { api } from "@/services/api";
import { ICreateExercisePayload, IExerciseDto } from "../types/exercise.dto";
import { mapExerciseDtoToModel } from "../mappers/exercise.mapper";
import { IExercise } from "@/types/models";

export async function createExercise(programId: string, payload: ICreateExercisePayload): Promise<IExercise> {
    const { data } = await api.post<IExerciseDto>(`/api/programs/${programId}/exercises`, payload)
    return mapExerciseDtoToModel(data);
}