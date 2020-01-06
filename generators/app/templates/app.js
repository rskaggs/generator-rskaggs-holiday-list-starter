import React from 'react';
import ReactDOM from 'react-dom';
import styled, {createGlobalStyle} from 'styled-components';
import HolidayCalendar from './components/holiday-calendar.jsx';
import moment from 'moment';

const HolidayPage = () => {
    
    const currentYear = moment().year();

    const northAmericanHolidays = [
        ["United States", 'US'],
        ["Mexico", 'MX'],
        ["Canada", 'CA']
    ]

    const GlobalStyles = createGlobalStyle`
        html, body {
            margin: 0;
            padding: 0;
            background: black;
        }    
    `;

    const MainLayout = styled.div`
        border-radius: 5px;
        padding: 20px;
        margin: 20px auto;
        background-color: white;
        max-width: 768px;
    `;

    return (
        <MainLayout>
            <GlobalStyles />
            <h1>{currentYear} North American Holidays!</h1>
            {northAmericanHolidays.map(([countryName, code], index) => (
                <HolidayCalendar countryName={countryName} code={code} key={index} />
            ) ) }
        </MainLayout>
    )
}

ReactDOM.render(<HolidayPage />, document.querySelector('[data-app]'));
