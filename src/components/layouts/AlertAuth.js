import React from "react";
import { Alert } from "antd";
function AlertAuth({ info }) {
  return (
    <div style={{ marginBottom:'1.5rem' }}>
      {info === null ? null : (
        <Alert message={info.message} type={info.type} showIcon />
      )}
    </div>
  );
}

export default AlertAuth;
