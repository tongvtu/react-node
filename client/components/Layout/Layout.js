import Navbar from "../Navbar/Navbar";
import styles from "./layout.module.css";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";
//tạo layout gồm cả navbar
export default function Layout({ children }) {
  const [width, setWidth] = useState(0);
  const [nav, setNav] = useState(1);
  //hàm nhận biết responsive
  function useWindowWide(size) {
    useEffect(() => {
      function handleResize() {
        setWidth(window.innerWidth);
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
    return width > size;
  }

  const wide = useWindowWide(424);

  //làm hiện và ẩn navbar
  function showNavi() {
    if (wide) setNav(0);
    else setNav(1);
  }
  function hideNavi() {
    if (wide) setNav(1);
    else setNav(0);
  }

  return (
    <div className={styles.content}>
      {nav ? <Navbar/> : null}
      <div className={styles.container}>
        <div className={styles.account}>
          <FaBars className={styles.hamberger} onClick={showNavi} />
          Welcome John
        </div>
        <div onClick={hideNavi}>{children}</div>
      </div>
    </div>
  );
}
