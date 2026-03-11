import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icons for Vite/webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const goldIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const locations = [
  { name: "Astana, Kazakhstan", type: "Head Office", coords: [51.1801, 71.446], services: "Drilling, Well Services, Logistics" },
  { name: "Aktau, Kazakhstan", type: "Operations Base", coords: [43.6499, 51.1733], services: "Offshore Drilling, Pipeline" },
  { name: "Tashkent, Uzbekistan", type: "Regional Office", coords: [41.2995, 69.2401], services: "Drilling, Refinery" },
  { name: "Ashgabat, Turkmenistan", type: "Field Office", coords: [37.9601, 58.3261], services: "Drilling, Well Services" },
  { name: "Berlin, Germany", type: "European Office", coords: [52.52, 13.405], services: "Refinery, Pipeline, Consultation" },
  { name: "Warsaw, Poland", type: "Field Office", coords: [52.2297, 21.0122], services: "Pipeline Construction" },
  { name: "Bucharest, Romania", type: "Field Office", coords: [44.4268, 26.1025], services: "Refinery, Drilling" },
  { name: "São Paulo, Brazil", type: "South America Office", coords: [-23.5505, -46.6333], services: "Drilling, Exploration" },
  { name: "Buenos Aires, Argentina", type: "Field Office", coords: [-34.6037, -58.3816], services: "Well Services, Logistics" },
  { name: "Bogotá, Colombia", type: "Field Office", coords: [4.711, -74.0721], services: "Drilling, Consultation" },
];

export default function ProjectsMap() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary font-medium tracking-widest text-sm uppercase">Global Operations</span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground">
            Interactive <span className="text-primary">Projects Map</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Click on any marker to learn about our operations at that location.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-border shadow-lg" style={{ height: '480px' }}>
          <MapContainer
            center={[30, 20]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((loc, i) => (
              <Marker key={i} position={loc.coords} icon={goldIcon}>
                <Popup>
                  <div className="text-sm min-w-[160px]">
                    <div className="font-bold text-base">{loc.name}</div>
                    <div className="text-amber-600 font-medium text-xs mb-1">{loc.type}</div>
                    <div className="text-gray-600 text-xs">{loc.services}</div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}