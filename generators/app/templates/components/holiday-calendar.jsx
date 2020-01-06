import Holidays from 'date-holidays';
import React from 'react';
import moment from 'moment';

const getHolidayListByRegion = (region, {year, monthFormat = "MMMM"} = {}) => {

    const currentYear = year || moment().year();
    
    const holidaysGroupedByMonth = new Holidays(region).getHolidays(currentYear)
       
        /** Adds Month Prop onto Holiday Object */
        .map( (holiday) => Object.assign( {}, holiday, { month: moment(holiday.date).month() } ) )
        
        /** Groups Holidays into an Object keyed off the Month Prop */
        .reduce( (holidaysByMonth = {}, currentHoliday ) => {

            const otherHolidaysInMonth = holidaysByMonth[currentHoliday.month] || [];

            holidaysByMonth[currentHoliday.month] = [
                ...otherHolidaysInMonth,
                currentHoliday
            ]

            return holidaysByMonth;

        }, {});

    /** Converts Object to array with human readable month */

    return Object.entries(holidaysGroupedByMonth).map( ( [monthKey, holidayList]) => ({
        month: moment().month(monthKey).format(monthFormat),
        holidayList
    }));
    
}

const HolidayDate = ({name, date}) => (
    <li>
        <h4>{name}</h4>
        <p>{moment(date).format('MM-DD-YYYY [at] h:mm a')}</p>
    </li>
);

const HolidayMonth = ({month, holidayList}) => (
    <React.Fragment>
        <h3>{month}</h3>
        <ol>
            { holidayList.map( (holiday, i) => (<HolidayDate {...holiday} key={i} />) ) }
        </ol>
    </React.Fragment>
);

const HolidayCalendar = ({countryName, code}) => {
    const monthList = getHolidayListByRegion(code);
    return (
        <React.Fragment>
            <h2>{countryName}</h2>
            { monthList.map( (props, i) => (<HolidayMonth {...props} key={i} />) ) }
        </React.Fragment>
    )
}

export default HolidayCalendar;