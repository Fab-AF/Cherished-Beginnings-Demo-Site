"use client";

import {
  getLocalStore,
  getUserRole,
  storageKey,
} from "@/modules/authentication";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import CommonLoader from "./common/Loader";
import { useSelector } from "react-redux";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const route = useRouter();
  const path = usePathname();

  const loading = useSelector((state) => state.singUp.loading);

  const userUrl = {
    1: [
      "/listing",
      "/contact",
      "/favourite",
      "/contracts",
      "/my-requests",
      "/profile/password",
      "/profile/payment-method",
      "/profile/payment-history",
      "/profile/notification",
      "/my-requests"
    ],
    2: [

    ],
  };
  useEffect(() => {
    const data = getLocalStore(storageKey) || false;
    if (data) {
      setToken(data);
    } else if (
      path?.endsWith("create-password") ||
      path?.endsWith("forgot-password") ||
      path === "/listing"
    ) {
      setToken(false);
    } else {
      setToken(false);
      route.push("/");
    }
  }, []);

  if (token === null || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CommonLoader />
      </div>
    );
  }
  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
};

export const useAuthToken = () => useContext(AuthContext);
