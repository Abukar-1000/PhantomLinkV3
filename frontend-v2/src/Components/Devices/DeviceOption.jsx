import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import DvrRoundedIcon from '@mui/icons-material/DvrRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

export default function DeviceOption({ device }) {
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [maxElevation, minElevation] = [24, 2]
    const destination = `device/${device.id}`;

    return (
        <Link
            to={destination}
            style={{
                textDecoration: "none"
            }}
        >
            <Box
                onMouseEnter={e => setIsMouseOver(true)}
                onMouseLeave={e => setIsMouseOver(false)}
                maxWidth={"20dvw"}
            >
                <Paper 
                    elevation={isMouseOver ? maxElevation : minElevation}
                    sx={{
                        padding: "1rem",
                        // width: "100%",
                        borderRadius: "10px"
                    }}
                >
                    <Stack
                        direction={"column"}
                        gap={2}
                        display={"flex"}
                        justifyContent={"center"}
                        alignContent={"center"}
                    >

                        <Stack 
                            direction={"column"}
                            gap={1}
                        >
                            <Stack
                                direction={"row"}
                                gap={1}
                            >
                                <DvrRoundedIcon color={"secondary"}/>
                                <Typography>Device</Typography>
                            </Stack>

                            <Typography variant='h5'>{device.name}</Typography>
                        </Stack>
                        
                        <Stack 
                            direction={"row"}
                            gap={1}
                        >
                            <Chip 
                                label={device.version}
                                color='secondary'
                                icon={
                                    <ArticleRoundedIcon />
                                }
                            />

                            <Chip 
                                label={device.username}
                                color='secondary'
                                icon={
                                    <PersonRoundedIcon />
                                }
                            />
                        </Stack>
                    </Stack>
                </Paper>
            </Box>
        </Link>
    );
}