import { Box, CircularProgress, Container, FormGroup, Typography } from "@mui/material";
import Link from "next/link";
import CustomTextField from "../formElements/Textfield";
import CustomSelect from "../formElements/Select";
import CustomButton from "../formElements/Button";
import { FormikHelpers, useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

interface IValue {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}
export default function Signup() {
    const [isLoading, setIsLoading] = useState(false);
    const options = [
        { value: 'user', label: 'User' },
    ];
    const customButtonStyle: React.CSSProperties = {
        marginBottom: '16px',
        marginTop: '16px',
        background: "#2e7d32",
        color: "#fff",
        width: '40rem',
        height: '2.5rem',
        textTransform: 'none',
    };
    const textFieldStyle = {
        width: "40rem",
        marginBottom: '16px',
    };
    const selectStyle = {
        width: "40rem",
    };
    const router = useRouter();

    const handleFormSubmit = async (values: IValue, { resetForm }: FormikHelpers<any>) => {
        setIsLoading(true);
        console.log(values);
        await axios({
            method: 'POST',
            url: 'https://farmers-be.onrender.com/api/v1/signup',
            data: values
        })
            .then(function (res) {
                console.log(res.data.data.role);
                localStorage.setItem('userRole', res.data.data.role);
                resetForm();
                if(res.data.data.role === 'user'){
                    router.push("/placeOrder");
                }else{
                    router.push('/ordersPage');
                }
            })
            .catch(function (error) {
                const responseError = error as { response: { data: { error: string } } };
                alert(responseError.response.data.error);
            });
        setIsLoading(false);
    };
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: ""
    };
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleFormSubmit,
    });
    return (
        <>

            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "10rem" }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "30px", textDecoration: "underline" }}>
                    Welcome to Agro-input store
                </Typography>
                <Box sx={{ display: 'flex', marginBottom: "2rem" }}>
                    <Typography>
                        Already signed up?
                    </Typography>
                    <Link href={"/login"}>
                        Login
                    </Link>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <CustomTextField
                                label="firstname"
                                type="text"
                                name="firstName"
                                placeholder="firstname"
                                containerStyle={textFieldStyle}
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                            />
                            <CustomTextField
                                label="lastName"
                                type="text"
                                name="lastName"
                                placeholder="lastname"
                                containerStyle={textFieldStyle}
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                            />
                            <CustomTextField
                                label="email"
                                type="text"
                                name="email"
                                placeholder="email"
                                containerStyle={textFieldStyle}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            <CustomTextField
                                label="password"
                                type="password"
                                name="password"
                                placeholder="password"
                                containerStyle={textFieldStyle}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            <CustomSelect
                                name="role"
                                label="role"
                                options={options}
                                width="40rem"
                                containerStyle={selectStyle}
                                value={formik.values.role}
                                onChange={formik.handleChange}
                            />
                            <CustomButton
                                label={isLoading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : "signup"}
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