import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperElement from './SwiperElement';
import 'swiper/css';
import { Typography } from '@mui/material';


export default function Swipe() {
    return (
        <Swiper
            spaceBetween={0}
            slidesPerView={7}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            <SwiperSlide><SwiperElement /></SwiperSlide>
            <SwiperSlide><SwiperElement /></SwiperSlide>
            <SwiperSlide><SwiperElement /></SwiperSlide>
            <SwiperSlide><SwiperElement /></SwiperSlide>
            <SwiperSlide>
                <Typography variant='h4' style={{ transform: 'rotate(90deg)', textAlign: "center" }} border={1} flex={1}>
                    Caden Juang
                </Typography>
            </SwiperSlide>
            <SwiperSlide><SwiperElement /></SwiperSlide>
            <SwiperSlide><SwiperElement /></SwiperSlide>
            <SwiperSlide><SwiperElement /></SwiperSlide>
            <SwiperSlide><SwiperElement /></SwiperSlide>
            <SwiperSlide><SwiperElement /></SwiperSlide>
            <SwiperSlide><SwiperElement /></SwiperSlide>
            <SwiperSlide><SwiperElement /></SwiperSlide>
            <SwiperSlide><SwiperElement /></SwiperSlide>
            <SwiperSlide><SwiperElement /></SwiperSlide>
        </Swiper>
    );
};
