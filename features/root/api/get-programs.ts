import { api } from "@/services/api";
import { IProgram } from "@/types/models";
import { mapProgramDtoToModel } from "../mappers/program.mapper";
import { IProgramDto } from "../types/program.dto";

export async function getPrograms(): Promise<IProgram[]> {
  const { data } = await api.get<IProgramDto[]>("/api/programs");
  return data.map(mapProgramDtoToModel);
}
