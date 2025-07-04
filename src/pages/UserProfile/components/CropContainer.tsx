import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { type Point, type Area } from 'react-easy-crop';

export default function CropContainer({ image }: { image: string }) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log({ croppedArea, croppedAreaPixels });
  };

  return (
    <div className="w-full h-[300px] rounded-lg object-top object-cover">
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
      />
    </div>
  );
}
