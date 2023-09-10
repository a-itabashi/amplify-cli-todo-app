"use client";
import { SWRConfig } from "swr";

const SWRConfigProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        revalidateOnReconnect: true,
        shouldRetryOnError: true,
        errorRetryCount: 2,
        onError: (error) => {
          console.log("エラー情報の出力");
          console.error("An error occurred:", error);
          // その他のエラーハンドリング処理
        },
        suspense: true,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRConfigProvider;
