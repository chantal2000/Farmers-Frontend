import PaymentForm from "@/components/pageSections/PaymentForm";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PaymentPage = () => {

  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    setUserRole(storedUserRole);
  }, []);

  const handleGoBack = () => {
    router.back();
  };
  return (
    <>
    {userRole === 'user' ? (
      <PaymentForm />
    ) : (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Box textAlign="center">
          <Typography>You do not have rights to see this page</Typography>
          <Button variant="contained" color="success" onClick={handleGoBack}>
            Go Back
          </Button>
        </Box>
      </Box>
    )}
  </>
  );
};

export default PaymentPage;
