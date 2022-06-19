import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Swipe from './Swiper';
import Stack from '@mui/material/Stack';
import { Container, Typography } from '@mui/material';
import SwiperElement from './SwiperElement';
import useHover from './useHover';

import '../styles/slides.css';


export default function ProjectContainer() {

    let initialTxt = "Featured Work";
    const [text, setText] = React.useState(initialTxt);
    
    const Slide = ({project, stagger}) => {
        console.log(stagger)
        return <Box 
            // sx={{mt:stagger}}
            className={"slide " + stagger}
            onMouseOver={() => setText(project)}
            onMouseLeave={() => setText(initialTxt)} 
            >
            <SwiperElement/>
        </Box>
    }

    return (
        <Stack
            alignItems="center"
            style={{ minHeight: '90vh' }}
            mt={4}
            spacing={3}
        >
            <Stack
                direction="row"
                spacing="20px"
            >
                <Slide project="Housing Precarity Model" stagger="one"/>
                <Slide project="Community Tutoring" stagger="two" />
                <Slide project="Mav App 2.0" stagger="three" />
                <Slide project="Receipt Bot" stagger="two"/>
                <Slide project="Maverick Debate" stagger="one" />
                <Slide project="Razors 'N' Blade" stagger="three"/>
            </Stack>



            <Container sx={{ textAlign: "center", border: 0 }}>
                <Typography variant="h4">
                    {text}
                </Typography>
                <Typography variant="subtitle2">Explore some of my projects</Typography>
            </Container>
        </Stack>
    );
}