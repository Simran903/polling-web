"use client"
import { POLL_TYPE } from '@/utils/data';
import React, { FC, useState } from 'react';
import { IoCloseOutline, IoFilterOutline } from 'react-icons/io5';

interface HeaderWithFilterProps {
  title: string;
  filterType: string;
  setFilterType: (filterType: string) => void;
}

const HeaderWithFilter: FC<HeaderWithFilterProps> = ({ title, filterType, setFilterType }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="">
      <div className='flex items-center justify-between'>
        <h2 className='sm:text-xl font-medium text-primary-a0'>{title}</h2>
        <button
          className={`flex items-center gap-3 text-sm text-surface-a0 bg-primary-a0 px-4 py-2
        ${open ? "rounded-t-lg" : "rounded-lg"}`}
          onClick={() => {
            if (filterType !== '') {
              setFilterType('');
              setOpen(false);
            } else {
              setOpen(!open);
            }
          }}
        >
          {filterType !== "" ? (
            <>
              <IoCloseOutline className='text-lg' />
              Clear
            </>
          ) : (
            <>
              <IoFilterOutline className='text-lg' />
              Filter
            </>
          )}
        </button>
      </div>
      {open && (
        <div className="flex flex-wrap gap-4 p-4 rounded-lg rounded-b-lg bg-surface-a10">
          {[{ label: "All", value: "" }, ...POLL_TYPE].map((type) => (
            <button
              key={type.value}
              className={`text-[12px] px-4 py-1 rounded-lg text-nowrap ${
                filterType === type.value ? "bg-surface-a0 text-primary-a0 hover:bg-tonal-a0" : "bg-surface-a0 text-primary-a0 hover:bg-tonal-a0"
              }`}
              onClick={() => {
                setFilterType(type.value);
                setOpen(false);
              }}
            >
              {type.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default HeaderWithFilter;
