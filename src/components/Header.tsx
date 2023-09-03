"use client";
import { Nav } from "@/components/Nav";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";

const Header = () => {
  return (
    <header>
      <Authenticator.Provider>
        <Nav />
      </Authenticator.Provider>
    </header>
  );
};

export { Header };
