import "@/app/globals.css";
import { theme } from "@/app/theme";
import type { Metadata } from "next";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import RecoilProvider from "@/store/Provider";
import { Container } from "@mui/material";
import "@aws-amplify/ui-react/styles.css";
import { Header } from "@/components/Header";
import { AuthListener } from "@/components/AuthListener";

export const metadata: Metadata = {
  title: "Todo App",
  description: "Created by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <RecoilProvider>
        <AuthListener />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <body>
            <Header />
            <Container>{children}</Container>
          </body>
        </ThemeProvider>
      </RecoilProvider>
    </html>
  );
}
