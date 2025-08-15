"use client";
import { SessionProvider } from "next-auth/react";
import { LoadingProvider } from "@/contexts/LoadingContext";
import GlobalLoader from "@/components/ui/GlobalLoader";

export default function Providers({ children }) {
    return (
        <SessionProvider>
            <LoadingProvider>
                {children}
                <GlobalLoader />
            </LoadingProvider>
        </SessionProvider>
    );
}
