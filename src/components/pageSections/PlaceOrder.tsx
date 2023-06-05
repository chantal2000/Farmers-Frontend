import { Box, CircularProgress, Container, FormGroup, Typography } from "@mui/material";
import CustomTextField from "../formElements/Textfield";
import CustomButton from "../formElements/Button";
import axios from "axios";
import { FormikHelpers, useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
interface IValue {
    farmerName: string;
    landSize: number;
    fertilizer: string;
    fertilizerQuantity: number;
    seeds: string;
    seedsQuantity: number;
}
export default function PlaceOrder() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const customButtonStyle: React.CSSProperties = {
        marginBottom: '16px',
        marginTop: '16px',
        background: "#2e7d32",
        color: "#fff",
        width: '42rem',
        height: '2.5rem',
        textTransform: 'none',
    };
    const textFieldStyle = {
        width: "20rem",
        marginBottom: '16px',
    };

    const handleFormSubmit = async (values: IValue, { resetForm } : FormikHelpers<any>) => {
        setIsLoading(true)
        console.log(values);
        await axios({
            method: 'POST',
            url:  'https://farmers-be.onrender.com/api/v1/orders',
            data: values
        })
            .then(function (res) {
                resetForm();
                localStorage.setItem("farmerId",res.data.data._id);
                router.push("/payPage");
        })
            .catch(function (error) {
                const responseError = error as { response: { data: { error: string } } };
                alert(responseError.response.data.error);
        });
        setIsLoading(false)
    };
    const initialValues = {
        farmerName: "",
        landSize: 0,
        fertilizer: "",
        fertilizerQuantity: 0,
        seeds: "",
        seedsQuantity: 0
    };
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleFormSubmit,
    });
    return (
        <>

            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "10rem" }}>
                <Typography sx={{ fontWeight: "bold", marginBottom: "3rem",fontSize:"30px",textDecoration:"underline" }}>
                    Welcome farmer place an order
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <Box sx={{ display: "flex", gap: "2rem" }}>
                                <CustomTextField
                                    label="farmerName"
                                    type="text"
                                    name="farmerName"
                                    placeholder="farmerName"
                                    containerStyle={textFieldStyle}
                                    value={formik.values.farmerName}
                                    onChange={formik.handleChange}
                                />
                                <CustomTextField
                                    label="landSize/acre"
                                    type="number"
                                    name="landSize"
                                    placeholder="landSize"
                                    containerStyle={textFieldStyle}
                                    value={formik.values.landSize}
                                    onChange={formik.handleChange}
                                />
                            </Box>
                            <Box sx={{ display: "flex", gap: "2rem" }}>
                                <CustomTextField
                                    label="fertilizer"
                                    type="text"
                                    name="fertilizer"
                                    placeholder="fertilizer"
                                    containerStyle={textFieldStyle}
                                    value={formik.values.fertilizer}
                                    onChange={formik.handleChange}
                                />
                                <CustomTextField
                                    label="fertilizerQuantity/kg"
                                    type="number"
                                    name="fertilizerQuantity"
                                    placeholder="fertilizerQuantity"
                                    containerStyle={textFieldStyle}
                                    value={formik.values.fertilizerQuantity}
                                    onChange={formik.handleChange}
                                />
                            </Box>
                            <Box sx={{ display: "flex", gap: "2rem" }}>
                                <CustomTextField
                                    label="seeds"
                                    type="text"
                                    name="seeds"
                                    placeholder="seeds"
                                    containerStyle={textFieldStyle}
                                    value={formik.values.seeds}
                                    onChange={formik.handleChange}
                                />
                                <CustomTextField
                                    label="seedsQuantity/kg"
                                    type="number"
                                    name="seedsQuantity"
                                    placeholder="seedsQuantity"
                                    containerStyle={textFieldStyle}
                                    value={formik.values.seedsQuantity}
                                    onChange={formik.handleChange}
                                />
                            </Box>
                            <CustomButton
                                label={isLoading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : "Place Order"}
                                containerStyle={customButtonStyle}
                                type="submit"
                                onClick={formik.submitForm}
                                disabled={isLoading}
                                color="success"
                            />
                        </FormGroup>
                    </form>
                </Box>
            </Box>
        </>
    );
}