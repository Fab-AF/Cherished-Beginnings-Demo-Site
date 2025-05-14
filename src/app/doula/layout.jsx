// import "./userset.css";
import Image from "next/image";
import Doulanav from "@/Components/Doulanav/Doulanav";
export default function Layout({ children }) {
  return (
    <>
      
      {/* <div className="d-flex justify-content-between usersettingpadding gap-5">
        <div className="sidemenusec">
          <ul>
            <Link href="/usersetting/account">
              <div className="d-flex align-items-center gap-2">
                <Image src={userprofile} alt="Cherished beginnings" />
                <li>Account</li>
              </div>
            </Link>
            <Link href="/usersetting/password">
              <div className="d-flex align-items-center gap-2">
                <Image src={passwordimage} alt="Cherished beginnings" />
                <li>Password</li>
              </div>
            </Link>
            <Link href="/usersetting/paymentmethod">
              <div className="d-flex align-items-center gap-2">
                <Image src={paymentmethod} alt="Cherished beginnings" />
                <li>Payment methods</li>
              </div>
            </Link>
            <Link href="/usersetting/paymenthistory">
              <div className="d-flex align-items-center gap-2">
                <Image src={paymenthistory} alt="Cherished beginnings" />
                <li>Payment history</li>
              </div>
            </Link>
            <Link href="/usersetting/notification">
              <div className="d-flex align-items-center gap-2">
                <Image src={notificationimage} alt="Cherished beginnings" />

                <li>Notification</li>
              </div>
            </Link>
          </ul>
        </div> */}
      <div className="accountscreenrigtsection w-100">{children}</div>
      {/* </div> */}
    </>
  );
}
