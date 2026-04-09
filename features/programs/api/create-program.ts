import { api } from "@/services/api";
import { IProgram } from "@/types/models";
import { mapProgramDtoToModel } from "../mappers/program.mapper";
import { ICreateProgramPayload, IProgramDto } from "../types/program.dto";

export async function createProgram(payload: ICreateProgramPayload): Promise<IProgram> {
  const { data } = await api.post<IProgramDto>("/api/programs", payload);
  return mapProgramDtoToModel(data);
}
