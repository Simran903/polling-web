"use client"
import React, { useState, FC } from 'react'
import { HiOutlineTrash } from 'react-icons/hi';
import { HiMiniPlus } from 'react-icons/hi2';

interface OptionInputProps {
  optionList: string[];
  setOptionList: (options: string[]) => void;
}

const OptionInput: FC<OptionInputProps> = ({ optionList, setOptionList }) => {

  const [option, setOption] = useState<string>("");

  const handleAddOption = (): void => {
    if (option.trim() && optionList.length < 4) {
      setOptionList([...optionList, option.trim()]);
      setOption("");
    }
  };

  const handleDeleteOption = (index: number): void => {
    const newOptions = optionList.filter((_, i) => i !== index);
    setOptionList(newOptions);
  };

  return (
    <div className="">
      {optionList.map((item, index) => (
        <div key={item} className='flex justify-between bg-surface-a30 py-2 px-4 rounded-md mb-3'>
          <p className='text-xs font-medium text-primary-a0'>{item}</p>

          <button
            className=''
            onClick={() => {
              handleDeleteOption(index);
            }}
          >
            <HiOutlineTrash className='text-lg text-red-500' />
          </button>
        </div>
      ))}

      {optionList.length < 4 && (
        <div className="flex items-center gap-5 mt-4">
          <input
            type="text"
            placeholder='Enter Option'
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className='w-full text-sm outline-none bg-surface-a20 px-3 py-[6px] rounded-md'
          />

          <button
            className='text-nowrap px-3 py-[4px] bg-primary-a0/80 rounded-md hover:bg-primary-a0/50 transition flex gap-3 items-center'
            onClick={handleAddOption}
          >
            <HiMiniPlus className='text-lg' />
            Add Option
          </button>
        </div>
      )}
    </div>
  )
}

export default OptionInput