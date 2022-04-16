import React from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import isBefore from 'date-fns/isBefore';
import getDay from 'date-fns/getDay';
import addDays from 'date-fns/addDays';
import addWeeks from 'date-fns/addWeeks'
import getWeekOfMonth from 'date-fns/getWeekOfMonth'

class AdapterDateFnsOverride extends AdapterDateFns {
    constructor() {
        super();

        this.getNextMonth = this.switchToNextWeek;
        this.getPreviousMonth = this.switchToPrevWeek;

        this.getWeekArray = (date: Date) => {
            const start = startOfWeek(date);
            const weekStartsOn = getDay(start);
            const end = endOfWeek(addWeeks(date, 1), { weekStartsOn });
            let count = 0;
            let current = start;
            const nestedWeeks: Date[][] = [];
            let lastDay = null;
            while (isBefore(current, end)) {
                var weekNumber = Math.floor(count / 7);
                nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
                
                var day = getDay(current);
                if (lastDay !== day) {
                    lastDay = day;
                    nestedWeeks[weekNumber].push(current);
                    count += 1;
                }
                current = addDays(current, 1);
            }
            return nestedWeeks;
          }
      }

    switchToNextWeek(date: Date) {
        const weekNumber = getWeekOfMonth(date);
        if (1 <= weekNumber && weekNumber <= 3) {
            return addWeeks(date, 2);
        } else {
            return addWeeks(date, 1);
        }
    }

    switchToPrevWeek(date: Date) {
        const weekNumber = getWeekOfMonth(date);
        
        if (2 <= weekNumber && weekNumber <= 3) {
            return addWeeks(date, -2);
        } else {
            return addWeeks(date, -1);
        }
    }
}

export const DatePickerComponent:React.FC<{selectedDay(day: string): void}> = ({selectedDay}) => {
    const [value, setValue] = React.useState<Date | null>(new Date());

    const handleDayChange = (day: Date | null) => {
        selectedDay(day!.toLocaleDateString("en-US"))
        setValue(day);
    }

    return <LocalizationProvider dateAdapter={AdapterDateFnsOverride}>
        <StaticDatePicker
            displayStaticWrapperAs="desktop"
            openTo="day"
            showDaysOutsideCurrentMonth
            value={value}
            components={{
                SwitchViewIcon: KeyboardArrowDownIcon
              }}
            onChange={(day) => handleDayChange(day)}
            renderInput={() => <></>}
        />
    </LocalizationProvider>
};