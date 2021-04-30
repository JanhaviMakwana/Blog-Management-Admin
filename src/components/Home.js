import React, { useState } from 'react';
import Drawer from './Dashboard/Drawer';
import AppBar from './Dashboard/AppBar';
const Home = React.memo(() => {
    //const useStyles = useStyles();
    const [open, setOpen] = useState(false);


    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <div >
            <AppBar onClick={handleDrawerOpen} />
            <Drawer onClick={handleDrawerClose} open={open} />
        </div >
    );
});

export default Home;
