import React, { useEffect, useState } from "react";
import ParticlesBg from 'particles-bg';
import { getDataFromAPI, DataReceived } from "../utils/api";

const HomePage: React.FC = () => {
  const [data, setData] = useState<DataReceived>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      getDataFromAPI("https://api.yincodeworld.com/v1/resume/descs", "GET").then((result) => {
        setData(result);
        setLoading(false);
      }).catch((error) => {
        console.error('Error: ', error);
        setLoading(false);
      })
    };
    fetchData();
  }, []);

  return (
    <div className="homepage-display-block">
      <ParticlesBg type="circle" bg={true} />
      

      {loading ?
        <h1></h1> :
        (Array.isArray(data)) ?
          <div className="homepage-display-block-description">
            <h1>{data[0].name}</h1>
            <p>{data[0].desc}</p>
          </div>
          : <h1>Error</h1>}
      <p></p>
    </div>
  )
}


export default HomePage