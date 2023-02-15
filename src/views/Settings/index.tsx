import { useState } from "react";
import { useQuery } from "react-query";

export default function SettingsPage() {
  const [status, setStatus] = useState(false);

  const request = () => {
    const time = Math.random() > 0.5 ? 3000 : 1500;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(time);
      }, time);
    });
  };

  const { isLoading, isFetching, isError, data } = useQuery(
    [status, "test", 2],
    request
  );
  return (
    <>
      <p
        style={{
          textAlign: "center",
          margin: "10px",
        }}
      >
        Settings [WIP]
      </p>
      {isLoading && <div>Loading...</div>}
      {isFetching && <div>Fetching...</div>}
      {isError && <div>Error</div>}
      {data && <div>{data}</div>}
      <button
        onClick={() => {
          // 同 swr，可以通过改变 key 重新获取数据
          setStatus(pre => !pre);
        }}
      >
        click
      </button>
    </>
  );
}
