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
        return <ListItem disablePadding {...props}>
            <ListItemText
                primary="Trash"
                primaryTypographyProps={{
                    fontWeight: 'medium',
                    variant: 'h1',
                }}
                className="li"
            />
        </ListItem>
    }

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }} className="list-container">
            <nav aria-label="secondary mailbox folders">
                <Item textAlign="center" />
                <Item textAlign="center" />
                <Item textAlign="center" />
                <Item textAlign="center" />
            </nav>
        </Box>
    );
}
