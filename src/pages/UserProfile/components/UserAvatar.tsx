import { Camera } from 'lucide-react';
import { useAuthStore } from '../../../store/auth.store';
import Modal, { useModal } from '../../../components/Modal/Modal';
import { useEffect, useState } from 'react';
import AvatarPreview from './AvatarPreview';

export type FilePreviewImage = File & { preview: string };

export type CropData = {
  x: number;
  y: number;
  zoom: number;
  rotation: number;
};

export default function UserAvatar() {
  const { user } = useAuthStore();
  const { open } = useModal();
  const [selectedImage, setSelectedImage] = useState<FilePreviewImage | null>(
    null
  );

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage.preview);
      }
    };
  }, [selectedImage]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] as FilePreviewImage;
    if (file && file.type.startsWith('image/')) {
      file.preview = URL.createObjectURL(file);
      setSelectedImage(file);
      open('update-avatar');
    }
  };

  return (
    <div className="w-20 h-20 rounded-full relative border-2 border-white shadow-md">
      <img
        src={`${import.meta.env.VITE_IMG_URL}/users/${user?.photo}`}
        alt={user?.name}
        className="w-full h-full object-cover rounded-full"
      />
      <label className="absolute bottom-0 right-0 text-primary bg-white p-1 rounded-full hover:bg-gray-100">
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileSelect}
        />
        <Camera size={16} />
      </label>
      <Modal.Content openName="update-avatar">
        <AvatarPreview
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </Modal.Content>
    </div>
  );
}
//  phép chia lấy dư (%): 0 ≤ kết quả < số chia
