"use client";
import { useSetRecoilState } from "recoil";
import { authState } from "@/store/authState";
import { Auth, Hub } from "aws-amplify";
import useSWR, { mutate } from "swr";
import { useEffect } from "react";

const fetchAuthState = async () => {
  try {
    await Auth.currentAuthenticatedUser();
    return true;
  } catch (error) {
    return false;
  }
};

const useAuthHook = () => {
  const setAuth = useSetRecoilState(authState);
  const { data: isAuthenticated } = useSWR("authState", fetchAuthState, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (isAuthenticated !== undefined) {
      setAuth(isAuthenticated);
    }

    const unsubscribe = Hub.listen("auth", ({ payload: { event } }) => {
      switch (event) {
        case "signIn":
          mutate("authState", true);
          break;
        case "signOut":
          mutate("authState", false);
          break;
      }
    });

    return () => unsubscribe();
  }, [isAuthenticated, setAuth]);
};

export { useAuthHook };

// "use client";
// import { useSetRecoilState } from "recoil";
// import { authState } from "@/store/authState";
// import { Auth, Hub } from "aws-amplify";
// import { useEffect } from "react";

// const useAuthHook = () => {
//   const setAuth = useSetRecoilState(authState);

//   useEffect(() => {
//     const checkAuthState = async () => {
//       try {
//         // ページがロードまたはリロードされたとき、アプリは現在の認証状態を確認する。
//         await Auth.currentAuthenticatedUser();
//         setAuth(true);
//       } catch (error) {
//         setAuth(false);
//       }
//     };

//     checkAuthState();

//     const unsubscribe = Hub.listen("auth", ({ payload: { event } }) => {
//       // アプリのライフサイクル中(ログイン、ログアウト等)に、ユーザーの認証状態の変更を検知する。
//       switch (event) {
//         case "signIn":
//           setAuth(true);
//           break;
//         case "signOut":
//           setAuth(false);
//           break;
//       }
//     });

//     // useEffectのクリーンアップ関数
//     return () => unsubscribe();
//   }, [setAuth]);
// };

// export { useAuthHook };
