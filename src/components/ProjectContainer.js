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


const Slide = React.forwardRef((props,ref) => (
    <Box ref={ref}>
        <SwiperElement/>
    </Box>
));


export default function ProjectContainer() {


    const [hoverRef1, isHovered1] = useHover();
    const [hoverRef2, isHovered2] = useHover();
    const [hoverRef3, isHovered3] = useHover();
    const [hoverRef4, isHovered4] = useHover();

    const text = "featued";
    const hoveredSlide = () => {
        if (isHovered1) text = "ISP";
        if (isHovered2) text =  "College Email Bot";
        if (isHovered3) text =  "Mav App";
        if (isHovered4) text =  "Community Tutoring";
        text = "Featured Works";
    }

    return (
        <Stack
            alignItems="center"
            style={{ minHeight: '90vh' }}
        >
            <Stack
                direction="row"
                spacing="10px"
            >
                <Slide ref={hoverRef1}/>
                <Slide ref={hoverRef2}/>
                <Slide ref={hoverRef3}/>
                <Slide ref={hoverRef4}/>
            </Stack>



            <Container >
                <Typography variant="h4" sx={{ textAlign: "center" }} border={1}>
                    {text}
                </Typography>
            </Container>
        </Stack>
    );
}