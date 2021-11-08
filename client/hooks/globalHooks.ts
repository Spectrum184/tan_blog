import useSWR, { KeyedMutator } from "swr";
import { IUser } from "../interface/user";
import { getDataAPI } from "../utils/fetchData";

const fetcher = (url: string) => getDataAPI(url).then((res) => res.data);

interface IUseUser {
  loading: boolean;
  loggedOut: boolean;
  user?: IUser;
  mutate: KeyedMutator<any>;
}

export const useUser = () => {
  const { data, mutate, error } = useSWR("auth/refresh-token", fetcher);

  const loading: boolean = !data && !error;
  const loggedOut: boolean = error && error.response.status === 401;

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  } as IUseUser;
};

export const useLayoutData = () => {
  const { data, error } = useSWR("categories", fetcher);
};
