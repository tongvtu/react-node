import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import { FaDesktop } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router";
//xuất navbar cho layout
export default function Navbar() {
  const router=useRouter()
  // logout khi ở trang dashboard và logs
  const logout = async () => {
    try {
      const response = await axios.put(
        "http://localhost:4000/user/6363eedbd6a3eaa0fdeaa287",
        {
          username:'john',
          password:"1234",
          login:0
        }
      );
    } catch (error) {}
  }
   var active=styles.active
  return (
    <div className={styles.navigation}>
      <div id={styles.menu_button}></div>
      <div id={styles.navi}>
        <div className={styles.device_manager}>
          <FaDesktop />
          Device
        </div>
        <div className={styles.navicontain}>

            <div className={styles.navi_item}>
              <Link href="/dashboard" className={router.pathname == "/dashboard" ? "active" : ""}>
              Dashboard
              </Link>
            </div>
            <div className={styles.navi_item}>
              <Link href="/logs" className={router.pathname == "/logs" ? "active" : ""}>Logs</Link>
            </div>
            <div className={styles.navi_item}>
              <Link href="/settings">Settings</Link>
            </div>
            <span onClick={logout}>
            <Link href="/">Logout</Link>

            </span>
        </div>
      </div>
    </div>
  );
}
