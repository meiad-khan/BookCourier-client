import React, { use, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Coverage = ({ coveragePromise }) => {
  const position = [23.685, 90.3563];
  const centers = use(coveragePromise);
  const mapRef = useRef(null);
  // console.log('center is ', centers);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.input.value;
    // console.log(input);
    // const district = serviceCenters.find((c) =>
    //   c.district.toLowerCase().includes(location.toLowerCase()),
    // );
    const district = centers.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase()),
    );
    // console.log(district);
    if (district) {
      const coord = [district.latitude, district.longitude];
      mapRef.current.flyTo(coord, 12);
    }
  };

  return (
    <div className="w-full py-25 px-20 bg-base-100 shadow-md rounded-2xl my-15">
      <h3 className="text-5xl mb-5">We are available in 64 districts</h3>

      {/* input field */}
      <div className="my-8">
        <form onSubmit={handleSearch}>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              name="input"
              className="grow"
              placeholder="Search"
            />
          </label>
        </form>
      </div>

      <div className="w-full h-[800px]">
        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          className="h-[800px]"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {centers.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong> <br /> Areas are:{" "}
                {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;