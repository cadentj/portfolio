import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Swipe from './Swiper';
import Stack from '@mui/material/Stack';
import { Container, Typography } from '@mui/material';
import SwiperElement from './SwiperElement';

export default function ProjectContainer() {
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '90vh' }}
        >
            <Stack
                direction="row"
                spacing="10px"
            >
                <SwiperElement/>
                <SwiperElement/>
                <SwiperElement/>
                <SwiperElement/>
            </Stack>
            <Container >
                <Typography variant="h4" sx={{ textAlign: "center" }}>
                    Featured Work
                </Typography>
            </Container>
        </Stack>
    );
}