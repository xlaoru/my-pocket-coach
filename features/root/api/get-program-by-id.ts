import { IProgram } from "@/types/models";
import { mapProgramDtoToModel } from "../mappers/program.mapper";
import { IProgramDto } from "../types/program.dto";
import { api } from "@/services/api";

export async function getProgramById(id: string): Promise<IProgram> {
    const { data } = await api.get<IProgramDto>(`/api/programs/${id}`);
    return mapProgramDtoToModel(data);
}