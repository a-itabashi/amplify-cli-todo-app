"use client";
import { useSetRecoilState } from "recoil";
import { authState } from "@/store/authState";
import { Auth, Hub } from "aws-amplify";
import { useEffect } from "react";

const useAuthHook = () => {
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        // ページがロードまたはリロードされたとき、アプリは現在の認証状態を確認する。
        await Auth.currentAuthenticatedUser();
        setAuth(true);
      } catch (error) {
        setAuth(false);
      }
    };

    checkAuthState();

    const unsubscribe = Hub.listen("auth", ({ payload: { event } }) => {
      // アプリのライフサイクル中(ログイン、ログアウト等)に、ユーザーの認証状態の変更を検知する。
      switch (event) {
        case "signIn":
          setAuth(true);
          break;
        case "signOut":
          setAuth(false);
          break;
      }
    });

    // useEffectのクリーンアップ関数
    return () => unsubscribe();
  }, [setAuth]);
};

export { useAuthHook };
