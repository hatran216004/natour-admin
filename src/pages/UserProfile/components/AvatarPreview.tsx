import Button from '../../../components/Button';
import { FilePreviewImage } from './UserAvatar';
import Cropper, { Area, Point } from 'react-easy-crop';
import { useState } from 'react';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import getCroppedImg, { getFileFromBase64 } from '../../../utils/helpers';
import { useAuthStore } from '../../../store/auth.store';
import { useMutation } from '@tanstack/react-query';
import { userApi } from '../../../services/user.api';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { ErrorResponseApi } from '../../../types/utils.type';

export default function AvatarPreview({
  selectedImage,
  onCloseModal,
  setSelectedImage
}: {
  selectedImage: FilePreviewImage | null;
  onCloseModal?: () => void;
  setSelectedImage: React.Dispatch<
    React.SetStateAction<FilePreviewImage | null>
  >;
}) {
  const { user, setUser } = useAuthStore();
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [degrees, setDegrees] = useState(0);
  const [croppedPixels, setCroppedPixels] = useState<{
    width: number;
    height: number;
    x: number;
    y: number;
  }>();

  const { mutate } = useMutation({
    mutationFn: userApi.updateMe,
    onSuccess: (data) => {
      const userUpdated = data.data.data.user;

      setSelectedImage(null);

      if (userUpdated) {
        setUser({
          _id: userUpdated._id,
          email: userUpdated.email!,
          name: userUpdated.name,
          photo: userUpdated.photo,
          active: userUpdated.active,
          role: userUpdated.role,
          status: userUpdated.status,
          passwordChangedAt: userUpdated.passwordChangedAt
        });
      }
    },
    onError: (error) => {
      const errorMessage = (error as AxiosError<ErrorResponseApi>).response
        ?.data.message;
      toast.success(errorMessage || 'Something went wrong');
    }
  });

  const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedPixels(croppedAreaPixels);
  };

  const onSave = async () => {
    try {
      const base64 = await getCroppedImg(
        selectedImage?.preview as string,
        croppedPixels!
      );
      const file = getFileFromBase64(
        base64 as string,
        `user_${user?._id}_${Date.now()}`
      );
      const formData = new FormData();
      formData.append('photo', file);
      mutate(formData);
      toast.success('Updated avatar successfully');
      onCloseModal?.();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 min-w-[600px]">
      <div className="relative h-64 flex items-center justify-center overflow-hidden">
        {selectedImage && (
          <Cropper
            rotation={degrees}
            showGrid={false}
            image={selectedImage.preview}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        )}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
          <ZoomOut size={16} />
        </button>
        <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
          <ZoomIn size={16} />
        </button>
        <button
          className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          onClick={() => setDegrees((prev) => (prev + 90) % 360)}
        >
          <RotateCcw size={16} />
        </button>
      </div>
      <div className="flex items-center justify-end space-x-2 mt-4">
        <Button
          onClick={() => {
            onCloseModal?.();
          }}
        >
          Cancel
        </Button>
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
}
