"use client";
import React, { useContext, useState, FC } from 'react';
import DashboardLayout from '../DashboardLayout';
import { UserContext } from '@/context/UserContext';
import { POLL_TYPE } from '@/utils/data';
import OptionInput from '@/components/OptionInput';
import OptionImageSelector from '@/components/OptionImageSelector';
// import Button from '@/components/Button';
import uploadImage from '@/utils/uploadImage';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from '@/constants/axiosClient';
import { API_PATHS } from '@/utils/apiPaths';

interface ImageItem {
  base64: string;
  file: File;
}

interface PollData {
  question: string;
  type: string;
  options: string[];
  imageOptions: ImageItem[];
  error: string;
}

const CreatePoll: FC = () => {
  const { user } = useContext(UserContext);

  const [pollData, setPollData] = useState<PollData>({
    question: "",
    type: "",
    options: [],
    imageOptions: [],
    error: "",
  });

  const handleValueChange = <T extends keyof PollData>(key: T, value: PollData[T]) => {
    setPollData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearData = () => {
    setPollData({
      question: "",
      type: "",
      options: [],
      imageOptions: [],
      error: "",
    })
  }

  const updateImageAndGetLink = async (imageOptions: { file: File }[]): Promise<string[]> => {
    const optionPromises: Promise<string>[] = imageOptions.map(async (imageOption) => {
      try {
        const imageUploadRes: { imageUrl?: string } = await uploadImage(imageOption.file);
        return imageUploadRes.imageUrl || "";
      } catch (error) {
        toast.error(`Error uploading image: ${imageOption.file.name}`);
        return "";
      }
    });
    const optionArr = await Promise.all(optionPromises);
    return optionArr;
  }

  const getOptions = async () => {
    switch (pollData.type) {
      case "single-choice":
        return pollData.options;

      case "image-based":
        const options = await updateImageAndGetLink(pollData.imageOptions)
        return options;

      default:
        return [];
    }
  }

  const handleCreatePoll = async () => {
    const { question, type, options, error, imageOptions } = pollData;

    if (!question || !type) {
      console.log("CREATE", { question, type, options, error });
      handleValueChange("error", "Question & Type are required");
      return;
    }

    if (type === "single-choice" && options.length < 2) {
      handleValueChange("error", "Enter atleast two options")
    }

    if (type === "image-based" && imageOptions.length < 2) {
      handleValueChange("error", "Enter atleast two options")
    }

    handleValueChange("error", "");
    // console.log("NO_ERR", { pollData });

    const optionData = await getOptions();

    try {
      const token = user?.token || localStorage.getItem("token"); 

      const response = await axiosClient.post(
        API_PATHS.POLLS.CREATE,
        {
          question,
          type,
          options: optionData,
          creatorId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true, // This requires backend support
        }
      );


      if (response) {
        toast.success("Poll Created Successfully!");
        clearData();
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message)
        handleValueChange("error", error.response.data.message)
      } else {
        handleValueChange("error", "Something went wrong. Please try again");
      }
    }
  }

  return (
    <DashboardLayout>
      <div className="bg-surface-a10 my-5 p-5 rounded-lg mx-auto">
        <h2 className='text-lg text-primary-a0 font-medium'>Create Poll</h2>

        <div className="mt-3">
          <label className='text-xs font-medium text-surface-a50'>QUESTION</label>
          <textarea
            placeholder="What's on your mind?"
            rows={4}
            className='w-full text-lg outline-none  bg-surface-a20 p-2 rounded-md mt-2'
            value={pollData.question}
            onChange={({ target }: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleValueChange("question", target.value)
            }
          />
        </div>

        <div className="mt-3">
          <label className='text-xs font-medium text-surface-a50'>POLL TYPE</label>
          <div className="flex gap-4 flex-wrap mt-3">
            {POLL_TYPE.map((item) => (
              <div
                key={item.value}
                onClick={() => handleValueChange("type", item.value)}
                className={`bg-surface-a30 py-1 px-4 rounded-full text-primary-a20 hover:bg-tonal-a20 cursor-pointer ${pollData.type === item.value ? "text-primary-a0 bg-primary-a0 border-primary-a0" : "border-sky-100 text-white"
                  }`}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {pollData.type === "single-choice" && (
          <div className="mt-5">
            <label className='text-xs font-medium text-surface-a50'>OPTIONS</label>
            <div className="mt-3">
              <OptionInput
                optionList={pollData.options}
                setOptionList={(value: string[]) => handleValueChange("options", value)}
              />
            </div>
          </div>
        )}

        {pollData.type === "image-based" && (
          <div className="mt-5">
            <label className='text-xs font-medium text-surface-a50'>IMAGE OPTIONS</label>
            <div className="mt-3">
              <OptionImageSelector
                imageList={pollData.imageOptions}
                setImageList={(value: ImageItem[]) => handleValueChange("imageOptions", value)}
              />
            </div>
          </div>
        )}

        {pollData.error && (
          <p className='text-xs font-medium text-red-500 mt-5'>
            {pollData.error}
          </p>
        )}

        <button
          className='w-full mt-6 text-black bg-primary-a0 py-3 rounded-lg hover:bg-primary-a0/50 transition'
          onClick={handleCreatePoll}
        >
          CREATE
        </button>

      </div>
    </DashboardLayout>
  );
};

export default CreatePoll;
