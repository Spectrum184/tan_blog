import { postDataStaticAPI } from "./fetchData";

export const checkImageFile = (file: File): string => {
  const types = ["image/png", "image/jpeg"];
  let err = "";

  if (!file) err = "Vui lòng chọn file";

  if (file.size > 1024 * 1024 * 5) err = "File lớn nhất không quá 5MB";

  if (!types.includes(file.type)) err = "Vui lòng chọn file png hoặc jpeg";

  return err;
};

export const uploadImage = async (file: File, url: string) => {
  const formData = new FormData();
  formData.append("image", file);
  try {
    const res = await postDataStaticAPI(url, formData);

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
