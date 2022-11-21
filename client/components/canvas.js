import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

//tạo màu ngẫu nhiên
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
var barColors = [];
var borderColors = [];

for (var i = 0; i < 100; i++) {
  barColors.push(getRandomColor());
  borderColors.push(getRandomColor());
}
//khởi tạo biểu đồ và xuất biểu đồ
export default function Canvas(props) {
  var tableData = props.data;

  const data = {
    labels: tableData.map((device) => device.name),
    datasets: [
      {
        label: "# of Votes",
        data: tableData.map((device) => device.power),
        backgroundColor: barColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
}
