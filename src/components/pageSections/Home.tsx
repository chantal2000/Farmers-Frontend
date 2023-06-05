import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, Box } from '@mui/material';
import Image from 'next/image';
import { useSpring, animated } from 'react-spring';
import Link from 'next/link';

const HomePage = () => {
    const [loaded, setLoaded] = useState(false);
    const [animationProps, setAnimationProps] = useSpring(() => ({ opacity: 0, transform: 'translateY(50px)' }));

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true);
            setAnimationProps({ opacity: 1, transform: 'translateY(0)' });
        }, 1000);
    }, []);

    return (
        <div>
            <AppBar position="static" sx={{ background: "#2e7d32" }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Agro Store
                    </Typography>
                    <Button color="inherit">
                        <Link href={"/signup"} style={{color:'#fff',textDecoration:"none"}}>
                            Signup
                        </Link>
                    </Button>
                    <Button color="inherit" >
                        <Link href={"/login"} style={{color:'#fff',textDecoration:"none"}}>
                            Login
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container spacing={2} sx={{ padding: '20px' }}>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <animated.div style={animationProps}>
                            <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', fontWeight: 600 }}>
                                Welcome to Agro-Input Store!
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2, fontSize: '21px' }}>
                                Our system is designed to streamline the process of buying fertilizers and seeds for farmers with specific land sizes. Here's how it works:
                            </Typography>
                            {loaded && (
                                <animated.ul style={animationProps}>
                                    <li>Step 1: Register an account on our platform.</li>
                                    <li>Step 2: Order Placement</li>
                                    <li>Step 3: Payment to be made using credit card</li>
                                    <li>Step 4: Approval Process once the payment has been made</li>
                                </animated.ul>
                            )}
                        </animated.div>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            src="https://businessinspection.com.bd/wp-content/uploads/2022/08/Top-Agro-Based-Company-1.jpg"
                            alt="Farmers"
                            width={500}
                            height={600}
                        />
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default HomePage;
