import { IExercise } from "@/types/models";
import { IEditExerciseSetPayload, IExerciseDto } from "../types/exercise.dto";
import { api } from "@/services/api";
import { mapExerciseDtoToModel } from "../mappers/exercise.mapper";

export async function editExerciseSet(programId: string, exerciseId: string, setIndex: number, payload: IEditExerciseSetPayload): Promise<IExercise> {
    const { data } = await api.patch<IExerciseDto>(`/api/programs/${programId}/exercises/${exerciseId}/sets/${setIndex}`, payload)
    return mapExerciseDtoToModel(data)
}