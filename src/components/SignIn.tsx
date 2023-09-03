import { Auth } from "aws-amplify";

type SignInParameters = {
  username: string;
  password: string;
};

export async function signIn({ username, password }: SignInParameters) {
  try {
    const user = await Auth.signIn(username, password);
  } catch (error) {
    console.log("error signing in", error);
  }
}
