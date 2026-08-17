import { api } from '@/services/api'
import { ITemplate } from '@/types/models'
import { mapTemplateDtoToModel } from '../mappers/template.mapper'
import { ITemplateDto } from '../types/templates.dto'

export async function getTemplates(): Promise<ITemplate[]> {
  const { data } = await api.get<ITemplateDto[]>('/api/templates')
  return data.map(mapTemplateDtoToModel)
}
