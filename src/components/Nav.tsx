"use client";
import { Auth } from "aws-amplify";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRecoilValue } from "recoil";
import Link from "next/link";
import { authState } from "@/store/authState";

const Nav = () => {
  const isAuthenticated = useRecoilValue(authState);

  const signOut = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          <Link href={"/"}>Home</Link>
        </Typography>
        <div style={{ flexGrow: 1 }}></div>
        {isAuthenticated && (
          <Button color="inherit" onClick={signOut}>
            ログアウト
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export { Nav };
