import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {Trip} from "../model/Trip.ts";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {getDaysOfTheWeek} from "../util/formatting.ts";
import useFetchWeatherForecast from "../hooks/useFetchWeatherForecast.ts";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};


type WeatherForecastProps = {
    trip: Trip,
}

type WeatherForecastData = {
    date: string,
    temperature_2m_max: string,
    temperature_2m_min: string,
    daylight_duration: string,
    uv_index_max: string,
    precipitation_probability_max: string
}

export default function WeatherForecast({trip}: WeatherForecastProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const weatherForecastData = useFetchWeatherForecast(trip)

    if (!weatherForecastData) {
        return <h1>Loading...</h1>
    }

    const {
        time: date,
        temperature_2m_max,
        temperature_2m_min,
        daylight_duration,
        uv_index_max,
        precipitation_probability_max
    } = weatherForecastData.daily


    function createData(
        date: string,
        temperature_2m_max: string,
        temperature_2m_min: string,
        daylight_duration: string,
        uv_index_max: string,
        precipitation_probability_max: string
    ) {
        return {
            date,
            temperature_2m_max,
            temperature_2m_min,
            daylight_duration,
            uv_index_max,
            precipitation_probability_max
        };
    }

    const rows: WeatherForecastData[] = []

    date.forEach((_e: string, index: number) => {
        const data = createData(
            date[index],
            `${Math.round(temperature_2m_max[index])}°`,
            `${Math.round(temperature_2m_min[index])}°`,
            `${Math.round(daylight_duration[index] / 60 / 60)}h`,
            uv_index_max[index].toFixed(1).toString(),
            `${precipitation_probability_max[index]}%`
        )
        rows.push(data)
    });

    return (
        <div>
            <Button onClick={handleOpen}>Weather Forecast</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="center">Temp</TableCell>
                                    <TableCell align="center">Daylight</TableCell>
                                    <TableCell align="center">UV</TableCell>
                                    <TableCell align="center">precip prob</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow
                                        key={row.date}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {index === 0 ? "Today" : getDaysOfTheWeek(row.date)}
                                        </TableCell>
                                        <TableCell
                                            align="center">{row.temperature_2m_min} - {row.temperature_2m_max}</TableCell>
                                        <TableCell align="center">{row.daylight_duration}</TableCell>
                                        <TableCell align="center">{row.uv_index_max}</TableCell>
                                        <TableCell align="center">{row.precipitation_probability_max}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>


                </Box>
            </Modal>
        </div>
    );
}