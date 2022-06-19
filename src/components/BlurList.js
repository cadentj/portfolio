import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import '../styles/blur_list.css';


export default function BlurList() {
    const Item = (props) => {
        return <ListItem disablePadding>
            <ListItemText
                primary={props.name}
                primaryTypographyProps={{
                    textAlign: 'center',
                    fontWeight: 'medium',
                    variant: 'h2',
                }}
                className="li"
            />
        </ListItem>
    }

    return (
        <Box sx={{ width: '100%', height: "2000px" }} className="list-container">
            <Item name="Housing Precarity Model" />
            <Item name="Community Tutoring" />
            <Item name="Mav App 2.0" />
            <Item name="Maverick Debate" />
            <Item name="Razors 'N' Blade" />
        </Box>
    );
}
