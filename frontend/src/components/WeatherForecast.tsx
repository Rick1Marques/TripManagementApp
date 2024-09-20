import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {Trip} from "../model/Trip.ts";
import {
    Divider,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {getDaysOfTheWeek} from "../util/formatting.ts";
import useFetchWeatherForecast from "../hooks/useFetchWeatherForecast.ts";
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import {Destination} from "../model/Destination.ts";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2
};


type WeatherForecastProps = {
    trip: Trip,
    disable: boolean,
    currentDestination?: Destination
}

type WeatherForecastSingleData = {
        date: string,
        temperature_2m_max: string,
        temperature_2m_min: string,
        daylight_duration: string,
        uv_index_max: string,
        precipitation_probability_max: string
}

export default function WeatherForecast({trip, disable, currentDestination}: WeatherForecastProps) {
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
    ): WeatherForecastSingleData {
        return {
            date,
            temperature_2m_max,
            temperature_2m_min,
            daylight_duration,
            uv_index_max,
            precipitation_probability_max
        };
    }

    const rows: WeatherForecastSingleData[] = []

    date.forEach((_e: string, index: number) => {
        const data: WeatherForecastSingleData = createData(
            date[index],
            `${Math.round(+temperature_2m_max[index])}°`,
            `${Math.round(+temperature_2m_min[index])}°`,
            `${Math.round(+daylight_duration[index] / 60 / 60)}h`,
            (+uv_index_max[index]).toFixed(1).toString(),
            `${precipitation_probability_max[index]}%`
        )
        rows.push(data)
    });

    return (
        <div>
            <Button disabled={disable} onClick={handleOpen}><CloudQueueIcon fontSize="large"/></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Stack alignItems="center" sx={style} gap=".5rem">
                    <Typography variant="h5" gutterBottom>Weather Forecast</Typography>
                    <Stack width="100%" direction="row" justifyContent="center">
                        <Stack alignItems="center" width="50%">
                            <Typography variant="subtitle2">7 Days</Typography>
                        </Stack>
                        <Stack alignItems="center" width="50%">
                            <Typography variant="subtitle2">
                                {currentDestination ?
                                    `${currentDestination.countryFlag} ${currentDestination.city}`
                                    :
                                    `${trip.destinations[1].countryFlag} ${trip.destinations[1].city}`}


                            </Typography>
                        </Stack>
                    </Stack>
                    <Divider/>
                    <TableContainer component={Box}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="center"><DeviceThermostatIcon/></TableCell>
                                    <TableCell align="center"><WbSunnyIcon/></TableCell>
                                    <TableCell align="center">UV</TableCell>
                                    <TableCell align="center"><UmbrellaIcon/></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow
                                        key={row.date}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {index === 0 ?
                                                <Typography variant="subtitle2">
                                                    Today
                                                </Typography>
                                                :
                                                <Typography variant="subtitle2">
                                                    {getDaysOfTheWeek(row.date)}
                                                </Typography>
                                            }
                                        </TableCell>
                                        <TableCell
                                            align="center">
                                            <Typography variant="caption">
                                                {row.temperature_2m_min}{row.temperature_2m_max}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="caption">
                                                {row.daylight_duration}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="caption">
                                                {row.uv_index_max}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="caption">
                                                {row.precipitation_probability_max}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>


                </Stack>
            </Modal>
        </div>
    );
}