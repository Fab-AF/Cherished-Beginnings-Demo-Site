import "bootstrap/dist/css/bootstrap.css";
import { Inter } from "next/font/google";
import "./globals.css";
import BootstrapClient from "@/Components/BootstrapClient";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import { Providers } from "../Redux/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "@/Components/AuthProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cherished beginnings",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <Header />
            {children}
            <Footer />
            <ToastContainer />
            <BootstrapClient />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
