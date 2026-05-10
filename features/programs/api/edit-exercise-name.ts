import { IExercise } from "@/types/models";
import { api } from "@/services/api";
import { mapExerciseDtoToModel } from "../mappers/exercise.mapper";
import { IEditExerciseNamePayload, IExerciseDto } from "../types/exercise.dto";

export async function editExerciseName(programId: string, exerciseId: string, payload: IEditExerciseNamePayload): Promise<IExercise> {
    const { data } = await api.patch<IExerciseDto>(`/api/programs/${programId}/exercises/${exerciseId}`, payload);
    return mapExerciseDtoToModel(data);
}