import styles from "../styles/logs.module.css";
import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";
import Table from "../components/LogsTable/LogsTable";
import axios from "axios";
import { useRouter } from "next/router";

function Logs() {
  const router = useRouter();
  //check đã đăng nhập chưa
  
  const [device, setDevice] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [refresh, setRefresh] = useState(false);

  //cập nhật dữ liệu table
  useEffect(() => {
    const showDevice = async () => {
      try {
        const response = await axios.get("http://localhost:4000/device");
        setDevice(response.data);
      } catch (error) {}
    };
    showDevice();
  }, [refresh]);

  //hàm tìm giá trị search và gán cho table
  function search() {
    var listSearch = [];
    for (var i = 0; i < device.length; i++) {
      if (device[i].name.toLowerCase().includes(searchInput.toLowerCase()))
        listSearch.push(device[i]);
    }
    setDevice(listSearch);
  }

  return (
    <Layout>
      <div className={styles.container_log}>
        <div className={styles.log_input}>
          <h2 id={styles.ssss}>Action Logs</h2>
          <div className={styles.input}>
            <button id={styles.all_device} onClick={() => setRefresh(!refresh)}>
              All Device
            </button>
            <div className={styles.input_item}>
              <input
                type="text"
                id={styles.log_search_input}
                placeholder="name"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
              />
              <button
                type="submit"
                className={styles.log_search_button}
                onClick={search}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className={styles.log_search_result}>
          <Table data={device} rowsPerPage={8} />
        </div>
      </div>
    </Layout>
  );
}



export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:4000/user/6363eedbd6a3eaa0fdeaa287`,{
    method:"GET"})
  const data = await res.json()
  // Pass data to the page via props
  // check đã đăng nhập chư
  if(data.login==0){
    return {
      redirect:{
        destination: '/',
        permanent: false,
      },
    }
  }


  return { props: { data } }
}
export default Logs;
