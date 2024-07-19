// services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://hacker-news.firebaseio.com/v0",
  headers: {
    "Content-Type": "application/json",
  },
});

function delay(t: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, t);
  });
}

export const fetchStories = async (
  type: string,
  page: number,
  limit: number
) => {
  await delay(100 + Math.floor(Math.random() * 1000));

  const { data: storyIds } = await api.get(`/${type}stories.json`);
  const start = (page - 1) * limit;
  const end = start + limit;
  const stories = await Promise.all(
    storyIds.slice(start, end).map(async (id: number) => {
      const { data } = await api.get(`/item/${id}.json`);
      return data;
    })
  );
  return stories;
};

export const fetchItem = async (id: number) => {
  const { data } = await api.get(`/item/${id}.json`);
  return data;
};
