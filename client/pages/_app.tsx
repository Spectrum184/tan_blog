import "../styles/globals.css";
import store from "../redux/store";
import Alert from "components/alert/Alert";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Alert />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
