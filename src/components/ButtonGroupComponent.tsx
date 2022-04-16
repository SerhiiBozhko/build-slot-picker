import React from "react";
import Button from '@mui/material/Button';
import ButtonGroup from "@mui/material/ButtonGroup";
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import './styles.css'

export const ButtonGroupComponent:React.FC<{dayType(day: string): void}> = ({dayType}) => {
    const btnGorup = [
        {
            key: 'morning',
            name: 'Morning',
            icon: <SolarPowerIcon />,
            active: false,
        },
        {
            key: 'afternoon',
            name: 'Afternoon',
            icon: <WbSunnyOutlinedIcon />,
            active: true,
        },
        {
            key: 'evening',
            name: 'Evening',
            icon: <NightsStayOutlinedIcon />,
            active: false,
            
        },
    ];

    const [btnGroupStat, setBtnGroupStat] = React.useState(btnGorup);
    const handleButtonClick = (index: number) => {
        dayType(btnGroupStat[index].key);
        const newBtnGorup = btnGroupStat.map((btn, i) => {
            btn.active = i === index ? true : false 
            return btn;
        });

        setBtnGroupStat(newBtnGorup);
    };

    return <ButtonGroup className="buttons-group-container" variant="outlined" aria-label="outlined button group">
        {btnGroupStat.length > 0 && btnGroupStat.map((button, index)=>{
            return <Button 
                startIcon={button.icon}
                className={`buttons-group-day-time ${button.active ? 'active' : 'inactive'}-day-time`} 
                key={button.key}
                onClick={() => handleButtonClick(index)} 
            >
                {button.name}
            </Button>
        })}
    </ButtonGroup>
};