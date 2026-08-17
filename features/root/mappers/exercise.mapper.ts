import { IExercise } from "@/types/models";
import { IExerciseDto } from "../types/exercise.dto";

export function mapExerciseDtoToModel(dto: IExerciseDto): IExercise {
    return {
        _id: dto._id,
        name: dto.name,
        sets: dto.sets,
    }
}