import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import type { RegistrationData, RegistrationPayload } from '../types/registration.ts';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRegister } from '../hooks/useRegister.ts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';

const RegisterPage = () => {
  const { mutate, isPending, error, isError, isSuccess } = useRegister();
  const navigate = useNavigate();
  const { login } = useAuth();

  const schema = yup.object({
    name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
    email: yup.string().required('Email is required').email('Email is not valid'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegistrationData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegistrationData) => {
    const payload: RegistrationPayload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    mutate(payload, {
      onSuccess: () => {
        login();
        setTimeout(() => navigate('/products'), 500);
      },
    });
  };

  return (
    <Container max-width="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            width: '450px',
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            backgroundColor: 'white',
          }}
        >
          <Typography variant="h5" align="center">
            User registration
          </Typography>

          {isError && <Alert severity="error">{error?.message}</Alert>}
          {isSuccess && <Alert severity="success">Registered successfully!</Alert>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Confirm password"
                  type="password"
                  fullWidth
                  margin="normal"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={!isValid || isPending}
              sx={{ mt: 2, py: 1.5 }}
            >
              {isPending ? <CircularProgress size={24} /> : 'Register'}
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
