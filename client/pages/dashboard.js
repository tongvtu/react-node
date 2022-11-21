import { useState } from "react";
import Layout from "../components/Layout/Layout";
import styles from "../styles/dashboard.module.css";
import Dashboardtable from "../components/DashboardTable/DashboardTable";
import Canvas from "../components/Canvas";
import { useEffect } from "react";
import axios from "axios";
import { ValidateIPaddress } from "../utils/ValidateIPAddress";



function Dashboard() {
  
  //khởi tạo các state
  const [deviceName, setDeviceName] = useState("");
  const [deviceIP, setDeviceIP] = useState("");
  const [showCons, setShowCons] = useState(false);
  const [date, setDate] = useState("03/11");
  const [mac, setMac] = useState("mac");
  const [power, setPower] = useState("");
  const [device, setDevice] = useState([]);
  const [refresh, setRefresh] = useState(false);
  //hiện ô input power khi bấm add device
  function showConsummer(event) {
    event.preventDefault();
    if (deviceName != "") {
      if (ValidateIPaddress(deviceIP)) setShowCons(true);
      else alert("Địa chỉ IP không đúng định dạng");
    } else alert("Vui lòng nhập tên thiết bị");
  }

  //validate giá trị power
  function validate(event) {
    if (power < 0) alert("Cần nhập số lớn hơn không");
    else addDevice(event);
  }

  //method post tới server và xóa value các input về rỗng
  const addDevice = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/device", {
        name: deviceName,
        mac: mac,
        date: date,
        ip: deviceIP,
        power: power,
        status: "sleep",
      });
    } catch (error) {}

    setRefresh(!refresh);
    setDeviceName("");
    setDeviceIP("");
    setPower("");
    setShowCons(false);
  };

  //lấy giá trị của bảng lần đầu, tự cập nhạt lại khi thêm device
  useEffect(() => {
    const showDevice = async () => {
      try {
        const response = await axios.get("http://localhost:4000/device");
        setDevice(response.data);
      } catch (error) {}
    };
    showDevice();
  }, [refresh]);
  return (
    <Layout>
      <div className={styles.container} id="containers">
        <div className={styles.dashboard} id="dashboard">
            <Dashboardtable data={device} rowsPerPage={6} />

          <div className={styles.dashboard_funct}>
            <div className={styles.power_cons}>
              <Canvas data={device} />
            </div>
            <div className={styles.add_device}>
              <form className={styles.device_form} id={styles.device_form}>
                <h3>Add Device</h3>
                <input
                  type="text"
                  className={styles.form_input}
                  id="dname"
                  name="name"
                  placeholder="name"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                />
                <input
                  type="text"
                  className={styles.form_input}
                  id="dIP"
                  name="ip"
                  placeholder="IP"
                  value={deviceIP}
                  onChange={(e) => setDeviceIP(e.target.value)}
                />

                <button id={styles.device_form_submit} onClick={showConsummer}>
                  Submit
                </button>
                {showCons ? (
                  <div id={styles.consumption}>
                    <h3>Power Consumption</h3>
                    <input
                      type="number"
                      className={styles.form_input}
                      id={styles.device_consumption_input}
                      placeholder="Yêu cầu nhập số"
                      name="power"
                      value={power}
                      min="0.5"
                      onChange={(e) => setPower(e.target.value)}
                    />

                    <button type="submit" onClick={validate}>
                      Thêm
                    </button>
                  </div>
                ) : null}
              </form>
            </div>
          </div>
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

export default Dashboard;
