import { api } from '@/services/api'
import { IEditProgramPayload } from '../types/program.dto'

export async function editProgram(programId: string, payload: IEditProgramPayload): Promise<void> {
  await api.put(`/api/programs/${programId}`, payload)
}
