import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";

const DashboardCalendar: React.FC<{ tourDates: Date[] }> = ({ tourDates }) => {
    const [date, setDate] = useState<Date | null>(new Date());

    const onChange = (value: Date | Date[]) => {
        if (Array.isArray(value)) {
            // Handle range selection
            // For simplicity, we'll just take the first date in this example
            setDate(value[0]);
        } else {
            // Handle single date selection
            setDate(value);
        }
    };

    return (
        <div className="p-card p-m-4 p-d-flex p-jc-center" style={{ marginTop: '100px' }}>
            <Calendar
                onChange={onChange}
                value={date}
                calendarType="gregory"
                showWeekNumbers
                tileContent={({ date, view }) => {
                    if (view === 'month') {
                        const formattedDate = date.toISOString().split('T')[0];
                        if (tourDates.some(tourDate => tourDate.toISOString().split('T')[0] === formattedDate)) {
                            return <span style={{ backgroundColor: 'white', color: 'pink' }}><TwoWheelerIcon/></span>;
                        }
                    }
                    return null;
                }}
            />
        </div>
    );
};

export default DashboardCalendar;
