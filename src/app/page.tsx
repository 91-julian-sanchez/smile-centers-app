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
  const [zones, setZones] = useState<string[]>([]);
  const [centerTypes, setCenterTypes] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [selectedZone, setSelectedZone] = useState<string>('');
  const [selectedCenterType, setSelectedCenterType] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const centers = await fetchSmileCenters();
      setSmileCenters(centers);

      const uniqueZones = Array.from(new Set(centers.map(center => center.zone)));
      const uniqueCenterTypes = Array.from(new Set(centers.map(center => center.centerType)));

      const allServices: Set<string> = new Set();
      centers.forEach(center => {
        Object.keys(center.services).forEach(service => {
          allServices.add(service);
        });
      });

      setZones(uniqueZones);
      setCenterTypes(uniqueCenterTypes);
      setServices(Array.from(allServices));
    };

    fetchData();
  }, []);

  const handleZoneChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const zone = event.target.value;
    setSelectedZone(zone);
    const query = zone !== "all" ? `?zone=${zone}` : "";
    const response = await axios.get(`${process.env.SMILE_CENTERS_API_URL}/smile-center${query}`);
    setSmileCenters(response.data);
  };

  const handleCenterTypeChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const centerType = event.target.value;
    setSelectedCenterType(centerType);
    const query = centerType !== "all" ? `?centerType=${centerType}` : "";
    const response = await axios.get(`${process.env.SMILE_CENTERS_API_URL}/smile-center${query}`);
    setSmileCenters(response.data);
  };

  const handleServiceChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const service = event.target.value;
    setSelectedService(service);

    const query = service !== "all" ? `?service=${service}` : "";
    const response = await axios.get(`${process.env.SMILE_CENTERS_API_URL}/smile-center${query}`);
    setSmileCenters(response.data);
  };

  return (
    <div className="mainContainer">
      <h1 className="mainTitle">Smile Centers</h1>
      <div className="filters">
        <label>
          Seleccionar zona:
          <select onChange={handleZoneChange} value={selectedZone} className="selectInput">
            <option value="">- Seleccionar -</option>
            <option value="all">Todas las zonas</option>
            {zones.map(zone => (
              <option key={zone} value={zone}>{zone}</option>
            ))}
          </select>
        </label>
        <label>
          Tipo de centro:
          <select onChange={handleCenterTypeChange} value={selectedCenterType} className="selectInput">
            <option value="">- Seleccionar -</option>
            <option value="all">Todos los tipos</option>
            {centerTypes.map(centerType => (
              <option key={centerType} value={centerType}>{centerType}</option>
            ))}
          </select>
        </label>
        <label>
          Seleccionar Servicio:
          <select onChange={handleServiceChange} value={selectedService} className="selectInput">
            <option value="">- Seleccionar -</option>
            <option value="all">Todos los servicios</option>
            {services.map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="cardContainer">
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
