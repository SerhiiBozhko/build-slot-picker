import React from "react";
import Button from '@mui/material/Button';
import './styles.css'
import { slotItem } from "./types";

export const DayTimeGroup:React.FC<{slots:slotItem[], selectedTime(index: number): void}> = ({slots, selectedTime}) => {
    return <div className="slots-group-container">
        {slots?.length > 0 && slots.map((slot:slotItem, index:number)=>{
            return <Button 
                className={`slots-group-time ${slot.active ? 'active' : 'inactive'}-time`} 
                key={slot.name}
                onClick={() => selectedTime(index)} 
            >
                {slot.name}
            </Button>
        })}
    </div>
};
