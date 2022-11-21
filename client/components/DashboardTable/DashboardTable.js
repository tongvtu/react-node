import React, { useState } from "react";
import useTable from "../../utils/useTable";
import styles from "./Table.module.css";
import TableFooter from "../../hook/LogsTableFooter/LogsTableFooter.js";
export default function DashboardTable({ data, rowsPerPage }) {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  function sumArray(mang){
    let sum = 0;
    mang.map(mang=>{sum += mang.power;}
    );
    
    return sum;
}

  return (
    <div className={styles.dashboard_table}>
      <table className={styles.device}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>Device</th>
            <th className={styles.tableHeader}>Mac Address</th>
            <th className={styles.tableHeader}>IP</th>
            <th className={styles.tableHeader}>Date</th>
            <th className={styles.tableHeader}>Power</th>

          </tr>
        </thead>
        <tbody>
          {slice.map((el, key) => (
            <tr className={styles.tableRowItems} key={key}>
              <td className={styles.tableCell}>{el.name}</td>
              <td className={styles.tableCell}>{el.mac}</td>
              <td className={styles.tableCell}>{el.ip}</td>
              <td className={styles.tableCell}>{el.date}</td>
              <td className={styles.tableCell}>{el.power}</td>
            </tr>
          ))}
          <tr>
              <th className={styles.tableHeader}>Total</th>
              <th className={styles.tableHeader}></th>
              <th className={styles.tableHeader}></th>
              <th className={styles.tableHeader}></th>
              <th className={styles.tableHeader}>{sumArray(data)}</th>

          </tr>
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />

    </div>
  );
}
