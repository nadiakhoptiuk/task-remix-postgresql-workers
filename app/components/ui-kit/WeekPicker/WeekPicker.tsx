import { useSearchParams } from '@remix-run/react';
import { DayPicker } from 'react-day-picker';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { enGB } from 'date-fns/locale';
import { isAfter } from 'date-fns';

import { getStartAndEndOfWeek } from '~/utils/getStartAndEndOfWeek';

import { START_RANGE_PARAMETER_NAME } from '~/constants/constants';
import 'react-day-picker/style.css';

export const WeekPicker = ({
  start,
  end,
  className,
}: {
  start: string;
  end: string;
  className?: string;
}) => {
  const [_, setSearchParams] = useSearchParams();

  return (
    <Popover className={className}>
      {({ close }) => (
        <>
          <p className="text-center mb-4">Select date range:</p>

          <PopoverButton className="flex h-11 items-center justify-center gap-x-5 rounded bg-ui_lighter px-6 py-2 min-w-[247px] max-md:w-full border-[1px] border-ui_grey mx-auto">
            <span className="leading-[1.0]">
              {`${start} -
                ${end}`}
            </span>
          </PopoverButton>

          <PopoverPanel
            anchor="bottom"
            className="datePicker flex flex-col rounded bg-white px-4 py-5 shadow-lg w-max max-md:!max-w-[440px] md:px-5"
          >
            <DayPicker
              weekStartsOn={1}
              showWeekNumber
              showOutsideDays
              lang="en"
              locale={enGB}
              max={7}
              defaultMonth={new Date(end)}
              modifiers={{
                selected: { from: new Date(start), to: new Date(end) },
                range_start: new Date(start),
                range_end: new Date(end),
                weekend: true,
                disabled: date => {
                  const { end } = getStartAndEndOfWeek(new Date());
                  return isAfter(date, new Date(end));
                },
              }}
              onDayClick={day => {
                setSearchParams(
                  prev => {
                    prev.set(
                      START_RANGE_PARAMETER_NAME,
                      getStartAndEndOfWeek(day).start,
                    );
                    return prev;
                  },
                  {
                    preventScrollReset: true,
                  },
                );
                close();
              }}
            />
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
};
