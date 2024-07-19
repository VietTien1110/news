// queries/useStories.ts
import { useInfiniteQuery } from "react-query";
import { fetchStories } from "../lib/api";

export const useStories = (type: string) => {
  return useInfiniteQuery(
    [type],
    ({ pageParam = 1 }) => fetchStories(type, pageParam, 20),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length ? pages.length + 1 : undefined;
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
    }
  );
};
