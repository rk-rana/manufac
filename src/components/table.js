import React, { useEffect, useState } from "react";
import wineData from "./Wine-Data.json";

//this is the whole function to calculate the mean, mode and median of flavanoid and Gamma
function calculateStatistics() {
  const alcoholValues = [1, 2, 3];
  const results = [];
  //this for loop is for calculating the values according to alcohol class
  for (const alcohol of alcoholValues) {
    //this variable is for filtering out the data according to alcohol key like 1,2,3
    const dataFiltered = wineData.filter((item) => item["Alcohol"] === alcohol);
    //this fuction is for calculating the gamma value of ash*hue /magnesium
    const calculateGamma = (item) => {
      return (
        (parseFloat(item["Ash"]) * parseFloat(item["Hue"])) /
          parseFloat(item["Magnesium"]) || 0
      );
    };
    // this is for filtering out the flavanoid value from alcoho clss object
    const flavanoidValues = dataFiltered.map(
      (item) => parseFloat(item["Flavanoids"]) || 0
    );
    // this is for transforming the array of object of alcohol according to class
    const gammaValues = dataFiltered.map(calculateGamma);
    // this for calculating the mean of flavanoid and gamma
    const mean = (arr) =>
      arr.reduce((acc, value) => acc + value, 0) / arr.length;
    // this for calculating the mode of flavanoid and gamma

    const mode = (arr) => {
      const frequencyMap = {};
      let maxFrequency = 0;
      let modes = [];

      arr.forEach((value) => {
        frequencyMap[value] = (frequencyMap[value] || 0) + 1;
        if (frequencyMap[value] > maxFrequency) {
          maxFrequency = frequencyMap[value];
          modes = [value + ", "];
        } else if (frequencyMap[value] === maxFrequency) {
          modes.push(value + ", ");
        }
      });
      // if gamma mode are multiple or same as the length of original
      // then it return the length with the message
      return modes.length === Object.keys(frequencyMap).length
        ? modes.length + " returning the length because return multiple values"
        : modes;
    };

    // this for calculating the median of flavanoid and gamma
    const median = (arr) => {
      arr.sort((a, b) => a - b);
      const middle = Math.floor(arr.length / 2);
      return arr.length % 2 === 0
        ? (arr[middle - 1] + arr[middle]) / 2
        : arr[middle];
    };
    // whole of the mean mode median for flavanoid and gamma for everyclass of alcohol is
    // stored in results array
    results.push({
      alcohol: alcohol,
      flavanoidMean: mean(flavanoidValues),
      flavanoidMode: mode(flavanoidValues),
      flavanoidMedian: median(flavanoidValues),
      gammaMean: mean(gammaValues),
      gammaMode: mode(gammaValues),
      gammaMedian: median(gammaValues),
    });
  }

  return results;
}

const Table = () => {
  const [statistics, setStatistics] = useState([]);
  // this useeffect is used to calculate whole statis before rendering
  useEffect(() => {
    const calculatedStatistics = calculateStatistics();
    setStatistics(calculatedStatistics);
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        Table with calculated Mean, Mode, and Median of Flavanoids{" "}
      </h1>
      <table
        style={{
          border: "1px solid black",
          borderSpacing: "5px",
          borderCollapse: "collapse",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
        <tr>
          <th style={{ border: "1px solid black" }}>Measure</th>
          <th style={{ border: "1px solid black" }}>Flavanoid Mean</th>
          <th style={{ border: "1px solid black" }}>Flavanoid Mode</th>
          <th style={{ border: "1px solid black" }}>Flavanoid Median</th>
        </tr>
        {statistics.map((result, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid black" }}>
              Class {result.alcohol}
            </td>
            <td style={{ border: "1px solid black" }}>
              {result.flavanoidMean}
            </td>
            <td style={{ border: "1px solid black" }}>
              {result.flavanoidMode}
            </td>
            <td style={{ border: "1px solid black" }}>
              {result.flavanoidMedian}
            </td>
          </tr>
        ))}
      </table>

      <h1 style={{ textAlign: "center" }}>
        Table with calculated Mean, Mode, and Median of Gamma
      </h1>
      <table
        style={{
          border: "1px solid black",
          borderSpacing: "5px",
          borderCollapse: "collapse",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
        <tr>
          <th style={{ border: "1px solid black" }}>Measures</th>
          <th style={{ border: "1px solid black" }}>Gamma Mean</th>
          <th style={{ border: "1px solid black" }}>Gamma Mode</th>
          <th style={{ border: "1px solid black" }}>Gamma Median</th>
        </tr>
        {statistics.map((result, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid black" }}>
              Class {result.alcohol}
            </td>
            <td style={{ border: "1px solid black" }}>{result.gammaMean}</td>
            <td style={{ border: "1px solid black" }}>{result.gammaMode}</td>
            <td style={{ border: "1px solid black" }}>{result.gammaMedian}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Table;
