import { queryKeys } from '@/lib/query/query-keys'
import { useQuery } from '@tanstack/react-query'
import { getTemplates } from '../api/get-templates'

export function useTemplates() {
  return useQuery({
    queryKey: queryKeys.templates.all,
    queryFn: getTemplates,
  })
}
