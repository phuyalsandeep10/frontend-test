'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import countriesData from '@/data/countries.json';
import MenProfile from '@/assets/images/MenProfile.svg';

type VisitorMapProps = {
  visitors: { [countryCode: string]: number };
};

const VisitorMap: React.FC<VisitorMapProps> = ({ visitors }) => {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    setGeoData(countriesData);
  }, []);

  const normalizedVisitors = Object.fromEntries(
    Object.entries(visitors).map(([code, count]) => [
      code.toUpperCase(),
      count,
    ]),
  );

  const countryStyle = (feature: any): L.PathOptions => {
    const isoCode = feature?.properties?.['ISO3166-1-Alpha-3'];
    const isVisited = isoCode && normalizedVisitors[isoCode] !== undefined;

    return {
      fillColor: isVisited ? '#9500FF' : '#ffffff',
      fillOpacity: 0.8,
      weight: 1,
      color: '#D4D4D4',
    };
  };

  const onEachCountry = (feature: any, layer: L.Layer) => {
    const isoAlpha3 = feature.properties?.['ISO3166-1-Alpha-3'];
    const isoAlpha2 = feature.properties?.['ISO3166-1-Alpha-2'];
    const countryName = feature.properties?.name || 'Unknown';
    const count =
      isoAlpha3 && normalizedVisitors[isoAlpha3]
        ? normalizedVisitors[isoAlpha3]
        : 0;

    const flagUrl = isoAlpha2
      ? `https://flagcdn.com/w40/${isoAlpha2.toLowerCase()}.png`
      : null;

    layer.on('click', (e) => {
      e.originalEvent.stopPropagation();
    });

    const tooltipContent = `
      <div class="flex gap-[10px] items-center" style="min-width: 150px; max-width: max-content;">
        ${
          flagUrl
            ? `<div class="border border-[#D4D4D4] p-[2px] rounded-[6px] flex items-center justify-center w-[40px] h-[40px] shrink-0">
                <img src="${flagUrl}" alt="${countryName} flag" class="w-[20px] h-[22px] block" />
              </div>`
            : ''
        }
        <div class="flex flex-col justify-center">
          <div class="font-semibold leading-[29px] text-[18px] whitespace-nowrap">
            ${countryName}
          </div>
          <div class="font-bold flex items-center gap-[4px] whitespace-nowrap">
            <img src="${MenProfile.src}" alt="user icon" class="w-[18px] h-[18px] inline-block" />
            <span class="leading-[29px] font-medium text-[18px] text-[#71717A]">${count}</span>
          </div>
        </div>
      </div>
    `;

    layer.bindTooltip(tooltipContent, {
      sticky: true,
      direction: 'auto',
      opacity: 0.9,
      permanent: false,
    });
  };

  return (
    <div
      style={{
        height: '541px',
        width: '100%',
        backgroundColor: '#B8D1FF',
      }}
    >
      <MapContainer
        preferCanvas={true}
        zoomControl={false}
        keyboard={false}
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%', backgroundColor: '#B8D1FF' }}
      >
        {geoData && (
          <GeoJSON
            data={geoData}
            style={countryStyle}
            onEachFeature={onEachCountry}
            interactive={true}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default VisitorMap;
