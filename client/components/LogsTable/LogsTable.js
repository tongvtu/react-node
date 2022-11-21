import React, { useState } from "react";

import useTable from "../../utils/useTable";
import styles from "./Table.module.css";
import TableFooter from "../../hook/LogsTableFooter/LogsTableFooter";
//tạo table ở trang log
const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>Device ID</th>
            <th className={styles.tableHeader}>Name</th>
            <th className={styles.tableHeader}>Action</th>
            <th className={styles.tableHeader}>Date</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el, key) => (
            <tr className={styles.tableRowItems} key={key}>
              <td className={styles.tableCell}>{el._id}</td>
              <td className={styles.tableCell}>{el.name}</td>
              <td className={styles.tableCell}>{el.status}</td>
              <td className={styles.tableCell}>{el.date}</td>
            </tr>
          ))}
          <tr>
            <th className={styles.tableHeader}>Total</th>
            <th className={styles.tableHeader}></th>
            <th className={styles.tableHeader}></th>
            <th className={styles.tableHeader}>{data.length}</th>
          </tr>
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
