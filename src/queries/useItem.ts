import { useQuery } from "react-query";
import { fetchItem } from "../lib/api";

export const useItem = (id: number) => {
  return useQuery(["item", id], () => fetchItem(id));
};
