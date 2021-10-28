import useSWR, { KeyedMutator } from "swr";
import { IUser } from "../interface/user";
import { postDataAPI } from "../utils/fetchData";

const fetcher = (url: string) => postDataAPI(url, {}).then((res) => res.data);

interface IUseUser {
  loading: boolean;
  loggedOut: boolean;
  user?: IUser;
  mutate: KeyedMutator<any>;
}

export default function useUser() {
  const { data, mutate, error } = useSWR("auth/refresh-token", fetcher);

  const loading: boolean = !data && !error;
  const loggedOut: boolean = error && error.response.status === 401;

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  } as IUseUser;
}
