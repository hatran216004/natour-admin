// Map.jsx
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LocationMarker({ setValue }: { setValue: any }) {
  const [position, setPosition] = useState<LatLng | null>(null);
  const map = useMapEvents({
    click: async (e) => {
      const newPosition = e.latlng;
      setPosition(newPosition);

      // Di chuyển view của bản đồ đến vị trí được chọn
      map.flyTo(newPosition, map.getZoom());

      // Cập nhật tọa độ vào form
      setValue('startLocation.coordinates', [newPosition.lng, newPosition.lat]);

      // Sử dụng Nominatim API để lấy địa chỉ từ tọa độ (reverse geocoding)
      try {
        // Thêm timeout để tránh vượt quá giới hạn request của Nominatim
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${newPosition.lat}&lon=${newPosition.lng}&format=json`,
          {
            headers: { 'Accept-Language': 'vi' } // Để nhận kết quả bằng tiếng Việt
          }
        );
        const data = await response.json();

        if (data && data.display_name) {
          // Cập nhật địa chỉ vào form
          setValue('startLocation.address', data.display_name);
        }
      } catch (error) {
        console.error('Geocoding error:', error);
      }
    }
  });

  return position === null ? null : <Marker position={position} />;
}

const Map = ({
  setValue,
  initialPosition
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any;
  initialPosition: [number, number];
}) => {
  const center = initialPosition;
  const zoom = 13;

  return (
    <div className="mt-2 mb-4">
      <p className="text-sm text-gray-500 mb-1">
        Click vào bản đồ để chọn vị trí
      </p>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '400px', width: '100%', borderRadius: '0.375rem' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker setValue={setValue} />
      </MapContainer>
    </div>
  );
};

export default Map;
