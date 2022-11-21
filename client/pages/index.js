import Link from "next/link";
import React from "react";
import styles from "../styles/login.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";



function Login({data}) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //validate giá trị user và password, nếu đúng thì redirect sang dashboard
  function validate() {
    if (username == "john") {
      if(password == "1234"){

          
          const login = async () => {
            try {
              const response = await axios.put(
                "http://localhost:4000/user/6363eedbd6a3eaa0fdeaa287",
                {
                  username:'john',
                  password:"1234",
                  login:1
                }
              );
            } catch (error) {}
          };
          login();
          router.push("/dashboard");
        }
          else if(password=="") alert("Password is required")
          else alert("Password is wrong. Try again")
    }
    else if(username=='') alert("Username is required!")
    else alert("Username is wrong. Try again");
  }

  return (
    <div className={styles.content}>
      <div className={styles.form}>
        <h1 className={styles.form_heading}>SOIOT SYSTEM</h1>

        <div>
          <label>Username</label>
          <input
            value={username}
            type="text"
            className={styles.form_input}
            id={styles.tendn}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            placeholder="user name"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            value={password}
            type="password"
            id={styles.mk}
            onChange={(e) => setPassword(e.target.value)}
            name="mk"
            className={styles.form_input}
            placeholder="password"
            required
          />
        </div>

        <div className={styles.form_check}>
          <button
            className={styles.form_submit}
            id={styles.btnDangnhap}
            type="submit"
            onClick={validate}
          >
            Login
          </button>
          <Link href="/" className={styles.link_register}>
            or create new account
          </Link>
        </div>
      </div>
    </div>
  );
}


export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:4000/user/6363eedbd6a3eaa0fdeaa287`,{
    method:"GET"})
  const data = await res.json()

  if(data.login==1){
    return {
      redirect:{
        destination: '/dashboard',
        permanent: false,
      },
    }
  }


  return { props: { data } }
}


export default Login;
