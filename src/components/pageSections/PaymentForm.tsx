import { useState, useEffect } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import Cards from "react-credit-cards-2"
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import axios from 'axios';
import { formatCreditCardNumber,formatCVC, formatExpirationDate } from '@/utils/cardUtils';

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [focus, setFocus] = useState<any>('');
  const [payedFlag, setPayedFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!window.document.getElementById('stripe-script')) {
      const s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://js.stripe.com/v2/';
      s.onload = () => {
        (window as any).Stripe.setPublishableKey('pk_test_51NDsFIAtBcpHWb8jggtKvQnXXkEindIuwL16Cv933zMtIqsRD8pf6SyJUQNgJhE7f1hTQOMYXdYAxPtVZTafMP7M00p7Rcvmce');
      };
      window.document.body.appendChild(s);
    }
  }, []);

  useEffect(() => {
    setAmount(localStorage.getItem("amount") || '');
  }, []);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    if (name === 'number') {
      setCardNumber(formatCreditCardNumber(value));
    } else if (name === 'expiry') {
      setExpiry(formatExpirationDate(value));
    } else if (name === 'cvc') {
      setCvc(formatCVC(value, value));
    } else if (name === 'name') {
      setName(value);
    } else if (name === 'amount') {
      setAmount(value);
    }
  };

  const handlePayment = async () => {
    setIsLoading(true);

    let amount = localStorage.getItem("amount");
    try {
      (window as any).Stripe.card.createToken(
        {
          number: cardNumber,
          exp_month: expiry.split('/')[0],
          exp_year: expiry.split('/')[1],
          cvc,
          name,
        },
        (status: number, response: any) => {
          if (status === 200) {
            let orderId = localStorage.getItem("orderId")
            axios
              .post('https://farmers-be.onrender.com/api/v1/payment', {
                token: response,
                amount,
                orderId
              })
              .then((res) => {
                window.alert("We have successfully received your payment");
                setPayedFlag(true)
              })
              .catch((err) => console.log(err));
          } else {
            alert(response.error.message);
          }
          setIsLoading(false); 
        }
      );
    } catch (error) {
      console.error('Error processing payment:', error);
      setIsLoading(false); 
    }
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePayment();
  };

  return (
    <Box sx={{ marginTop: '4rem' }}>
      <Cards
        number={cardNumber}
        name={name}
        expiry={expiry}
        cvc={cvc}
        focused={focus}
      />

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '100vh',
          margin: '2rem auto',
          border: '1px solid #ccc',
          padding: '1rem',
        }}
      >
        <TextField
          type="text"
          name="number"
          label="Card Number"
          value={cardNumber}
          onChange={handleInputChange}
          onFocus={(e: { target: { name: any; }; }) => setFocus(e.target.name)}
        />
        <TextField
          type="text"
          name="expiry"
          label="Expiration Date (MM/YYYY)"
          value={expiry}
          onChange={handleInputChange}
          onFocus={(e: { target: { name: any; }; }) => setFocus(e.target.name)}
        />
        <TextField
          type="text"
          name="cvc"
          label="CVC"
          value={cvc}
          onChange={handleInputChange}
          onFocus={(e: { target: { name: any; }; }) => setFocus(e.target.name)}
        />
        <TextField
          type="text"
          name="name"
          label="Cardholder Name"
          value={name}
          onChange={handleInputChange}
          onFocus={(e: { target: { name: any; }; }) => setFocus(e.target.name)}
        />
        <TextField
          type="text"
          name="amount"
          label="Amount"
          value={amount}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {
            !payedFlag ?
              <Button type="submit" variant="contained" color="success" size="small">
                {isLoading ? <CircularProgress size={20} color="inherit" /> : "Checkout"}
              </Button> :
              <Button variant="contained" color="success" size="small" disabled>
                Payed
              </Button>
          }
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentForm;
