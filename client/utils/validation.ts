import { IRegister } from "../interface/auth";

export const validateRegister = ({
  username,
  password,
  confirmPassword,
  email,
  name,
}: IRegister) => {
  const error: IRegister = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  };

  let isError: boolean = false;

  if (!username) {
    error.username = "Vui lòng nhập tên đăng nhập";
    isError = true;
  } else if (username.length > 50) {
    error.username = "Tên đăng nhập không được quá 50 kí tự";
    isError = true;
  }

  if (!password) {
    error.password = "Vui lòng nhập mật khẩu";
    isError = true;
  } else if (password.length < 4) {
    error.password = "Mật khẩu ít nhất 4 kí tự";
    isError = true;
  } else if (password.length > 100) {
    error.password = "Mật khẩu khồng được dài quá 100 kí tự";
    isError = true;
  }

  if (!email) {
    error.email = "Vui lòng nhập email";
    isError = true;
  } else if (!validateEmail(email)) {
    error.email = "Vui lòng nhập đúng email";
    isError = true;
  }

  if (!name) {
    error.name = "Vui lòng nhập tên";
    isError = true;
  }

  if (confirmPassword !== password) {
    error.confirmPassword = "Mật khẩu xác nhận không đúng";
    isError = true;
  }

  return {
    error,
    isError,
  };
};

function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}
