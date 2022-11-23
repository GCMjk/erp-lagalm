import { useState } from 'react'
import { Box, Grid, TextField, Typography, Button, Snackbar, Alert } from '@mui/material'

import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { LoginDocument } from '@gql/graphql'

import { isEmail } from '@libs/validations'
import { AuthLayout } from '@components/layouts'

type FormDataLogin = {
    email: string,
    password: string
}

const LoginPage = () => {
    const [toast, setToast] = useState({
        status: false,
        message: '',
        open: false,
    })
    const handleClose = () => {
        setToast({
            ...toast,
            open: false
        })
    }
    const { register, handleSubmit, formState: { errors } } = useForm<FormDataLogin>();

    const [login] = useMutation(LoginDocument)
    const onLoginUser = async ({ email, password }: FormDataLogin) => {

        try {
            const { data } = await login({
                variables: {
                    email,
                    password
                }
            });
            setToast({
                status: data?.login?.status as boolean,
                message: data?.login?.message as string,
                open: true
            })

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <AuthLayout title="Ingresar">
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={toast.open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={toast.message === 'El usuario no existe.' ? 'warning' : !toast.status ? 'error' : 'success'}>
                    {toast.message}
                </Alert>
            </Snackbar>
            <form onSubmit={handleSubmit(onLoginUser)} noValidate>
                <Box sx={{ width: 450, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h1" component="h1">Iniciar sesión</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                type={'email'}
                                label="Correo"
                                variant="filled"
                                fullWidth
                                {...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: isEmail
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Contraseña"
                                type="password"
                                variant="filled"
                                fullWidth
                                {...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                color="secondary"
                                className="circular-btn"
                                size="large"
                                fullWidth >
                                Ingresar
                            </Button>
                        </Grid>

                        {/* <Grid item xs={12} display="flex" justifyContent="end">
                        <NextLink href="/app/auth/reset-pass" passHref>
                            <Link underline='always'>
                                Recuperar contraseña
                            </Link>
                        </NextLink>
                    </Grid> */}
                    </Grid>
                </Box>
            </form>
        </AuthLayout >
    )
}

export default LoginPage