// PieChartComponent.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Replace with your Firebase configuration

const PieChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Personal datas'));
        const newData = querySnapshot.docs.map((doc) => doc.data().country);
        setData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const chartContainerStyle = {
    width: '250px', // Set the desired width
    height: '250px', // Set the desired height
  };

  const uniqueCountries = Array.from(new Set(data)); // Get unique countries

  const dataCounts = uniqueCountries.map((country) => {
    const count = data.filter((value) => value === country).length;
    return count;
  });

  const chartData = {
    labels: uniqueCountries,
    datasets: [
      {
        data: dataCounts,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', 'red', 'yellow', 'blue'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'white', // Customize font color for labels
        },
      },
    },
  };

  console.log(data);

  return (
    <div style={chartContainerStyle}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChartComponent;


