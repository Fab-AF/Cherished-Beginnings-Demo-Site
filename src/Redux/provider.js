"use client";
import { Provider } from "react-redux";
import { store } from "../Redux/store"; // Adjust the import path as needed

export function Providers({ children }) {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
}
