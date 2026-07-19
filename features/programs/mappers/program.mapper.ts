import { IProgram } from "@/types/models";
import { IProgramDto } from "../types/program.dto";

export function mapProgramDtoToModel(dto: IProgramDto): IProgram {
  return {
    _id: dto._id,
    name: dto.name,
    description: dto.description,
    workout: dto.workout,
    date: dto.date ? new Date(dto.date) : new Date(),
  };
}
