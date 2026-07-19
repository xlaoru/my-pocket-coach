import { api } from "@/services/api";
import { ICreateProgramPayload } from "../types/program.dto";

export async function createProgram(payload: ICreateProgramPayload): Promise<void> {
  await api.post("/api/programs", payload);
}
