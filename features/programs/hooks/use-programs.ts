import { useQuery } from "@tanstack/react-query";
import { getPrograms } from "../api/get-programs";
import { queryKeys } from "@/lib/query/query-keys";

export function usePrograms() {
  return useQuery({
    queryKey: queryKeys.programs.all,
    queryFn: getPrograms,
  });
}
