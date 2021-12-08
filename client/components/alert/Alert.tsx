import Toast from "./Toast";

import { FC } from "react";
import { setAlertState } from "redux/alertStore";
import { useAppDispatch, useAppState } from "redux/store";

const Alert: FC = () => {
  const { alert } = useAppState((state) => state);
  const dispatch = useAppDispatch();

  return (
    <div>
      {alert.show && (
        <Toast
          type={alert.type}
          content={alert.message}
          handleShow={() => dispatch(setAlertState({ show: false }))}
        />
      )}
    </div>
  );
};

export default Alert;
