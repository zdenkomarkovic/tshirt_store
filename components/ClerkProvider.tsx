"use client";

import { ClerkProvider } from "@clerk/nextjs";

export default function CustomClerkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: "primary-gradient",
          footerActionLink: "",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
