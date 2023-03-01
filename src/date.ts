import axios from 'axios';

const apiUrl = 'https://date.nager.at/api/v3';

export async function getHolidaysForYear(year: number) {
    const holidaysArray: any[] = [];
    const response = await axios.get(`${apiUrl}/PublicHolidays/${year}/UA`);
    const data = response.data;
    for (let j = 0; j < data.length; j++) {
        const holiday = data[j];
        holidaysArray.push(holiday);
    }

    return holidaysArray;
}


