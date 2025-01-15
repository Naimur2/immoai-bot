import dayjs from 'dayjs'
import React from 'react'

type DateSeparatorProps = {
  date: string
}

export default function DateSeparator(
  { date }: DateSeparatorProps
) {
  return (
    <div className="flex justify-center items-center">
      <p className="text-xs md:text-sm text-[#707C97B2] uppercase font-medium text-center">
        {dayjs(date).format("MMM DD, YYYY , hh:mm A")}
      </p>
    </div>
  );
}
