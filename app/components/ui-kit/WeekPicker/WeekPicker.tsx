import { useEffect, useState } from 'react';
import { useSearchParams } from '@remix-run/react';
import { endOfWeek, getTime, startOfWeek } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { enGB } from 'date-fns/locale';

import 'react-day-picker/style.css';

export const WeekPicker = () => {
  const [_, setSearchParams] = useSearchParams();
  const [selectedWeek, setSelectedWeek] = useState<DateRange>({
    from: startOfWeek(new Date(), { weekStartsOn: 1 }),
    to: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  useEffect(() => {
    setSearchParams(prev => {
      prev.set(
        'start',
        selectedWeek.from
          ? String(getTime(new Date(selectedWeek.from)))
          : 'undefined',
      );
      prev.set(
        'end',
        selectedWeek.to
          ? String(getTime(new Date(selectedWeek.to)))
          : 'undefined',
      );
      return prev;
    });
  }, [selectedWeek, setSearchParams]);

  return (
    <Popover>
      {({ close }) => (
        <>
          <p className="text-center mb-4">Select date range:</p>

          <PopoverButton className="flex h-11 items-center justify-between gap-x-5 rounded bg-ui_lighter px-6 py-2 max-md:mt-5 max-md:w-full border-[1px] border-ui_grey mx-auto mb-14">
            <span className="leading-[1.0]">
              {`${selectedWeek?.from?.toLocaleDateString('en-GB')} -
                ${selectedWeek?.to?.toLocaleDateString('en-GB')}`}
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
                selected: selectedWeek,
                range_start: selectedWeek?.from,
                range_end: selectedWeek?.to,
                weekend: true,
              }}
              onDayClick={(day, modifiers) => {
                if (modifiers.selected) {
                  setSelectedWeek({
                    from: startOfWeek(new Date(), { weekStartsOn: 1 }),
                    to: endOfWeek(new Date(), { weekStartsOn: 1 }),
                  });
                  return;
                }
                setSelectedWeek({
                  from: startOfWeek(day, { weekStartsOn: 1 }),
                  to: endOfWeek(day, { weekStartsOn: 1 }),
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
