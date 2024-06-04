import axios from "axios";

export const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data.data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const debounce = (callback: Function, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (name: string) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => callback(name), wait)
  }
}
