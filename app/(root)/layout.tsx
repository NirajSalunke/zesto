import StreamClientProvider from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Zesto | Meet Anyone Anytime Anywhere",
  description: "Video Calling App",
  icons: {
    icon: "/icons/logo.svg",
  },
};
const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamClientProvider>{children}</StreamClientProvider>
    </main>
  );
};

export default RootLayout;
