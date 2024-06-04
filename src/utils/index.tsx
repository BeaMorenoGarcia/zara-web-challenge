import axios from "axios";

export const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data.data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const debounce = (callback: any, wait: number) => {
  let timeout: any;
  return (...args: any) => {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => callback.apply(context, args), wait)
  }
}
