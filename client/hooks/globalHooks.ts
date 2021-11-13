import useSWR, { KeyedMutator } from "swr";
import { useMemo } from "react";

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

interface IUsePagination {
  totalPage: number;
  siblingCount?: number;
  currentPage: number;
}

//customize user authentication
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

// fetch data for main layout
export const useLayoutData = () => {
  const categories = useSWR("categories", fetcher);
  const tags = useSWR("tags", fetcher);
  const authors = useSWR("users/post-author", fetcher);

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

// fetch data list post base on query
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

//customize pagination

const range = (start: number, end: number) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

export const DOTS = "DOTS";

export const usePagination = ({
  totalPage,
  siblingCount = 1,
  currentPage,
}: IUsePagination) => {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 2;

    //case 1: number of pages less than the page number
    if (totalPageNumbers >= totalPage) return range(1, totalPage);

    //calculate left and right sibling index
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPage);

    //check show ... or not
    const showLeftDot: boolean = leftSiblingIndex > 1;
    const showRightDot: boolean = rightSiblingIndex < totalPage - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPage;

    //case 2: no dot left show, right dot show
    if (!showLeftDot && showRightDot) {
      const leftItemCount = 1 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPage];
    }

    //case 3: no right dot show, but left dot show
    if (showLeftDot && !showRightDot) {
      const rightItemCount = 1 + 2 * siblingCount;
      const rightRange = range(totalPage - rightItemCount + 1, totalPage);

      return [firstPageIndex, DOTS, ...rightRange];
    }

    //case 4: both left and right dot show
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);

    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }, [siblingCount, currentPage, totalPage]);

  return paginationRange;
};
