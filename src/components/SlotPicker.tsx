import React from "react";
import { ButtonGroupComponent } from "./ButtonGroupComponent";
import { DatePickerComponent } from "./DatePicker";
import { DayTimeGroup } from "./DayTimeGroup";
import { seletedDate, slotItem, sortedSlot } from "./types";
import "./styles.css"
import Button from "@mui/material/Button";

export const SlotPicker: React.FC<{slots: string[], fetchDate(date: seletedDate): void}> = ({ slots, fetchDate }) => {
    const [slotObj, setSlotObj] = React.useState<sortedSlot>({});
    const [selectedDayType, setSelectedDayType] = React.useState('afternoon');
    const [selectedDate, setSelectedDate] = React.useState({day: new Date().toLocaleDateString("en-US"), time: ''});

    React.useEffect(() => {
        const dayTypesArr:Array<slotItem[]> = [[],[],[]];
        const sortedArr = slots.reduce((acc: sortedSlot, slot) => {
            const hour = parseInt(slot.split(':')[0]);

            if (hour >= 0 && hour < 12) {
                dayTypesArr[0].push({name: formatter24hTo12hr(slot), active: false});
                acc.morning = dayTypesArr[0];
            } else if ( hour >= 12 && hour < 16) {
                dayTypesArr[1].push({name: formatter24hTo12hr(slot), active: false});
                acc.afternoon = dayTypesArr[1];
            } else {
                dayTypesArr[2].push({name: formatter24hTo12hr(slot), active: false});
                acc.evening = dayTypesArr[2];
            }
            return acc;
        }, {});

        setSlotObj(sortedArr);
    },[slots]);


    const formatter24hTo12hr = (time:string) => {
        return new Date('1970-01-01T' + time + 'Z')
        .toLocaleTimeString('en-US',
          {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
        );
    };

    const handleChangeBtn = (selectedDayZone: string) => {
        setSelectedDayType(prevstate => {
            const activeSlotObj = slotObj[prevstate].map((slot:slotItem) => {
                slot.active = false;
                return slot;
            })
            setSlotObj({...slotObj, [prevstate]:activeSlotObj})
            setSelectedDate({...selectedDate, time:  ''});
            
            return selectedDayZone;
        });
    }

    const handleSelectedTime = (selectedSlotIndex: number) => {
        const activeSlotObj = slotObj[selectedDayType].map((slot:slotItem, index: number) => {
            slot.active = index === selectedSlotIndex ? true : false 
            return slot;
        });
        
        setSlotObj({...slotObj, [selectedDayType]: activeSlotObj});
        setSelectedDate({...selectedDate, time: slotObj[selectedDayType][selectedSlotIndex].name});
    };

    const handleSelectedDay = (day: string) => setSelectedDate({...selectedDate, day });

    return <div className="container">
        <DatePickerComponent selectedDay={handleSelectedDay}/>
        <ButtonGroupComponent dayType={handleChangeBtn} />
        <DayTimeGroup slots={slotObj[selectedDayType]} selectedTime={handleSelectedTime} /> 
        <Button 
            disabled={selectedDate.time === '' ? true : false}
            className="calendar-apply-button"
            onClick={() => fetchDate(selectedDate)} 
        > 
            APPLY 
        </Button>
    </div>
};