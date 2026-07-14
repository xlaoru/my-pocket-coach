import { queryKeys } from "@/lib/query/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getProgramById } from "../api/get-program-by-id";

export function useProgram(programId: string) {
    return useQuery({
        queryKey: queryKeys.programs.byId(programId),
        queryFn: () => getProgramById(programId),
        enabled: Boolean(programId),
    })
}