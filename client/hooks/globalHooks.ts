import useSWR, { KeyedMutator } from "swr";

import { ICategory } from "interface/category";
import { IAuthor, IUser } from "../interface/user";
import { getDataAPI } from "../utils/fetchData";
import { IListPostPagination, IPagination } from "interface/pagination";

interface IUseUser {
  loading: boolean;
  loggedOut: boolean;
  user?: IUser;
  mutate: KeyedMutator<any>;
}

export interface ILayoutData {
  categories: ICategory[];
  tags: string[];
  authors: IAuthor[];
}

interface IUseLayoutData {
  data: ILayoutData;
  error?: boolean;
  loading: boolean;
}

interface IListPost extends IListPostPagination {
  loading: boolean;
}

const fetcher = (url: string) => getDataAPI(url).then((res) => res.data);

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
  const categories = useSWR("categories", fetcher);
  const tags = useSWR("tags", fetcher);
  const authors = useSWR("users/postAuthor", fetcher);

  const layoutData: ILayoutData = {
    categories: categories.data,
    tags: tags.data,
    authors: authors.data,
  };

  const loading: boolean = !categories.data || !tags.data || !authors.data;
  const error: boolean = categories.error || tags.error || authors.error;

  return {
    data: layoutData,
    loading,
    error,
  } as IUseLayoutData;
};

export const useListPost = ({
  prefix,
  limit,
  page,
  content,
  order,
}: IPagination) => {
  const { data, error } = useSWR(
    `${prefix}?page=${page}&limit=${limit}&content=${content}&order=${order}`,
    fetcher
  );

  const loading: boolean = !data && !error;

  return {
    ...data,
    loading,
  } as IListPost;
};
