import React, { FC } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { HiMiniPlus } from 'react-icons/hi2';

interface ImageItem {
  base64: string;
  file: File;
}

interface OptionImageSelectorProps {
  imageList: ImageItem[];
  setImageList: (list: ImageItem[]) => void;
}

const OptionImageSelector: FC<OptionImageSelectorProps> = ({ imageList, setImageList }) => {

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file && imageList.length < 4) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageList([...imageList, { base64: reader.result as string, file }]);
      };
      reader.readAsDataURL(file);
      event.target.value = '';
    }
  };

  const handleDeleteImage = (index: number): void => {
    const updatedList = imageList.filter((_, i) => i !== index);
    setImageList(updatedList);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {imageList.map((image, index) => (
          <div key={index} className="rounded-md relative bg-surface-a20">
            <img src={image.base64} alt="" className='w-full h-52 object-contain rounded-md' />
            <button
              onClick={() => handleDeleteImage(index)}
              className='text-red-500 bg-surface-a10 rounded-full p-2 absolute top-2 right-2'
            >
              <HiOutlineTrash className='text-lg' />
            </button>
          </div>
        ))}
      </div>

      {imageList.length < 4 && (
        <div className="flex items-center gap-5">
          <input
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            onChange={handleAddImage}
            className="hidden"
            id="imageInput"
          />
          <label
            htmlFor="imageInput"
            className="text-nowrap px-3 py-[4px] bg-primary-a0/80 rounded-md hover:bg-primary-a0/50 transition flex gap-3 items-center cursor-pointer"
          >
            <HiMiniPlus className="text-lg" />
            Select Image
          </label>
        </div>
      )}
    </div>
  );
}

export default OptionImageSelector;
