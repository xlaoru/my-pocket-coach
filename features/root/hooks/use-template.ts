import { queryKeys } from '@/lib/query/query-keys'
import { useQuery } from '@tanstack/react-query'
import { getTemplateById } from '../api/get-template-by-id'

export function useTemplate(templateId: string) {
  return useQuery({
    queryKey: queryKeys.templates.byId(templateId),
    queryFn: () => getTemplateById(templateId),
    enabled: Boolean(templateId),
  })
}
