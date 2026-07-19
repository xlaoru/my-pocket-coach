import { api } from '@/services/api'

export async function deleteProgram(programId: string): Promise<void> {
  await api.delete(`/api/programs/${programId}`)
}
