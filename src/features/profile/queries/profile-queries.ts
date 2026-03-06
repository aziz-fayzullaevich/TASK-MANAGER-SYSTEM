import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { profileApi } from "../api/profile-api"

export const profileQueries = {
    useFetchProfile: (isEnabled: boolean = true) => {
        return useQuery({
            queryKey: ['profile'],
            queryFn: profileApi.getUser,
            staleTime: 60_000,
            placeholderData: keepPreviousData,
            enabled: isEnabled
        })
    }
};