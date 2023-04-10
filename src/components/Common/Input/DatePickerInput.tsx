import React, { useRef, useState } from "react";
import { addYears, format } from "date-fns";
import { Calendar } from "react-date-range";
import { pt } from "react-date-range/dist/locale";
import { FieldError, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { AiOutlineCalendar } from "react-icons/ai";
import DetectClickOutside from "../../DetectClickOutside";
import FormErrorMessage from "../../FormErrorMessage";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import "./styles/index.scss";

type DatePickerProps = {
  name: string;
  labelText: string;
  setValue: UseFormSetValue<any>;
  register: UseFormRegister<any>;
  placeholder?: string;
  error?: FieldError;
};

const DatePickerInput = ({
  name,
  register,
  labelText,
  setValue,
  placeholder,
  error,
}: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [calendarOpen, setCalendarOpen] = useState(false);

  const calendarRef = useRef<any>(null);

  const initialDate = "";

  const onChangeDate = (date: Date) => {
    setSelectedDate(date);
    setValue(name, format(date, "yyyy-MM-dd"));
    setCalendarOpen(false);
  };

  return (
    <div className="w-full flex flex-col gap-0.5">
      <label htmlFor={name} className="pl-0.5">
        {labelText}
      </label>
      <div className="relative">
        <input
          id={name}
          {...register(name)}
          placeholder={placeholder}
          className="bg-[var(--primary-light-gray)] w-full px-5 pl-10 py-3 border rounded-xl focus:outline--gray-500 border-none focus:ring-0"
          value={
            selectedDate ? format(selectedDate, "dd/MM/yyyy") : initialDate
          }
          onClick={() => setCalendarOpen(true)}
        />
        <AiOutlineCalendar className="absolute h-5 w-5 top-3.5 left-2.5" />
      </div>
      {error ? <FormErrorMessage error={error.message} /> : null}
      {calendarOpen ? (
        <DetectClickOutside
          elementRef={calendarRef}
          onClickOutside={() => setCalendarOpen(false)}
          hideOnEscape={() => setCalendarOpen(false)}
        >
          <div className="relative" ref={calendarRef}>
            <div className="absolute w-full z-[1000]">
              <Calendar
                onChange={(date) => onChangeDate(date)}
                maxDate={new Date()}
                minDate={addYears(new Date(), -30)}
                weekStartsOn={0}
                locale={pt}
                date={selectedDate as undefined}
                className="shadow-xl rounded-md w-full"
              />
            </div>
          </div>
        </DetectClickOutside>
      ) : null}
    </div>
  );
};

export default DatePickerInput;
