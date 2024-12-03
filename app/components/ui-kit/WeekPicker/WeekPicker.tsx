import { useSearchParams } from '@remix-run/react';

import { DayPicker } from 'react-day-picker';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { enGB } from 'date-fns/locale';

import 'react-day-picker/style.css';
import { getStartAndEndOfWeek } from '~/utils/getStartAndEndOfWeek';

export const WeekPicker = ({ start, end }: { start: string; end: string }) => {
  const [_, setSearchParams] = useSearchParams();

  return (
    <Popover>
      {({ close }) => (
        <>
          <p className="text-center mb-4">Select date range:</p>

          <PopoverButton className="flex h-11 items-center justify-between gap-x-5 rounded bg-ui_lighter px-6 py-2 max-md:mt-5 max-md:w-full border-[1px] border-ui_grey mx-auto mb-14">
            <span className="leading-[1.0]">
              {`${start}  - 
                ${end}`}
            </span>
          </PopoverButton>

          <PopoverPanel
            anchor="bottom"
            className="datePicker flex flex-col rounded bg-[#fff] px-4 py-5 shadow-[0_4px_8px_0_rgba(0,0,0,0.25)] max-md:w-[calc(100%-40px)] max-md:!max-w-[440px] md:px-5"
          >
            <DayPicker
              weekStartsOn={1}
              showWeekNumber
              showOutsideDays
              lang="en"
              locale={enGB}
              max={7}
              modifiers={{
                selected: { from: new Date(start), to: new Date(end) },
                range_start: new Date(start),
                range_end: new Date(end),
                weekend: true,
              }}
              onDayClick={day => {
                setSearchParams(prev => {
                  prev.set('start', getStartAndEndOfWeek(day).start);
                  return prev;
                });
                close();
              }}
            />
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
};
