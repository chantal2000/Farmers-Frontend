import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Box, Container } from '@mui/material';
import axios from 'axios';
import { useRouter } from "next/router";

interface IOrder {
    _id: number;
    farmerName: string;
    landSize: string;
    fertilizer: string;
    seeds: string;
    paid: boolean;
    status: string;
    fertilizerQuantity: number;
    seedsQuantity: number;
    amountToBePaid: number;
}

const FarmerDetails = () => {
    const [order, setOrder] = useState<IOrder | null>(null);
    const router = useRouter();

    const handlePayment = async () => {
        router.push("/payment");
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                let userId = localStorage.getItem("farmerId")
                const response = await axios.get(`https://farmers-be.onrender.com/api/v1/orders/${userId}`);
                setOrder(response.data.data);
                console.log(response.data.data.amountToBePaid)
                console.log(response.data.data._id)
                localStorage.setItem("orderId", response.data.data._id);
                localStorage.setItem("amount", response.data.data.amountToBePaid);
            } catch (error) {
                const responseError = error as { response: { data: { error: string } } };
                alert(responseError.response.data.error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom sx={{ textAlign: "center" }}>
                        Farmer Details
                    </Typography>
                    {order ? (
                        <Box sx={{ width: "30rem", display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column" }}>
                            <Box >
                                <Typography variant="subtitle1">
                                    Farmer Name: {order.farmerName}
                                </Typography>
                            </Box>
                            <Box >
                                <Typography variant="subtitle1">
                                    Land Size: {order.landSize} per acre
                                </Typography>
                            </Box>
                            <Box >
                                <Typography variant="subtitle1">
                                    Fertilizer: {order.fertilizer}
                                </Typography>
                            </Box>
                            <Box >
                                <Typography variant="subtitle1">
                                    Fertilizer Quantity: {order.fertilizerQuantity} kgs
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1">
                                    Seeds: {order.seeds}
                                </Typography>
                            </Box>
                            <Box >
                                <Typography variant="subtitle1">
                                    Seeds Quantity: {order.seedsQuantity} kgs
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1">
                                    Amount to be Paid: {order.amountToBePaid} $
                                </Typography>
                            </Box>
                            <Box>
                                <Button onClick={() => handlePayment()} variant="contained" color="success" size="small">
                                    Go to checkout page
                                </Button>
                            </Box>
                        </Box>
                    ) : (
                        <Typography variant="body1" align="center">
                            {order === null ? 'No order found' : 'Loading...'}
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Container >
    );
};

export default FarmerDetails;
