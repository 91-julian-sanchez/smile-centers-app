"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SmileCenterCard from '../components/SmileCenterCard';
import { SmileCenter } from '../types';

const fetchSmileCenters = async (): Promise<SmileCenter[]> => {
  const response = await axios.get(`${process.env.SMILE_CENTERS_API_URL}/smile-center`);
  return response.data;
 
};

const Home = () => {
  const [smileCenters, setSmileCenters] = useState<SmileCenter[]>([]);
  const [selectedZone, setSelectedZone] = useState<string>('');
  const [selectedCenterType, setSelectedCenterType] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const centers = await fetchSmileCenters();
      setSmileCenters(centers);
    };

    fetchData();
  }, []);

  const zones = Array.from(new Set(smileCenters.map(center => center.zone)));
  const centerTypes = Array.from(new Set(smileCenters.map(center => center.centerType)));

  const handleZoneChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const zone = event.target.value;
    const query = zone !== "all" ? `?zone=${zone}` : "";
    const response = await axios.get(`${process.env.SMILE_CENTERS_API_URL}/smile-center${query}`);
    setSmileCenters(response.data);
  };
  
  const handleCenterTypeChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const centerType = event.target.value;
    const query = centerType !== "all" ? `?centerType=${centerType}` : "";
    const response = await axios.get(`${process.env.SMILE_CENTERS_API_URL}/smile-center${query}`);
    setSmileCenters(response.data);
  };
  
  return (
    <div>
      <h1>Smile Centers</h1>
      <div>
        <label>
          Seleccione zona:
          <select onChange={handleZoneChange} value={selectedZone}>
            <option value="">Seleccionar</option>
            <option value="all">Todas</option>
            {zones.map(zone => (
              <option key={zone} value={zone}>{zone}</option>
            ))}
          </select>
        </label>
        <label>
          Tipo de centro:
          <select onChange={handleCenterTypeChange} value={selectedCenterType}>
            <option value="">Seleccionar</option>
            <option value="all">Todos</option>
            {centerTypes.map(centerType => (
              <option key={centerType} value={centerType}>{centerType}</option>
            ))}
          </select>
        </label>
      </div>
      <div className='cardContainer'>
        {smileCenters.map((center, index) => (
          <SmileCenterCard 
            key={index} 
            name={center.name}
            address={center.address}
            neighborhood={center.neighborhood}
            timetable={center.timetable}
            promo={center.promo}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;