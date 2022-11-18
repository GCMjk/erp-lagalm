import { useState } from 'react'
import { Box, Grid, TextField, Typography, Button, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { RegisterDocument, UserInput, UserGenderEnum } from '@gql/graphql'

import { ErpLayout } from "@components/layouts"
import { SectionForm } from '@components/ui'
import { validations } from '@libs/index'

const NuevoUsuarioPage = () => {
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
    const { register: registerForm, handleSubmit, formState: { errors } } = useForm<UserInput>();

    const [register] = useMutation(RegisterDocument)
    const onRegister = async (user: UserInput) => {

        try {
            const { data } = await register({
                variables: {
                    user
                }
            })
            setToast({
                status: data?.register?.status as boolean,
                message: data?.register?.message as string,
                open: true
            })
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <ErpLayout title="Nuevo Usuario" pageDescription="Creación de un usuario">
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={toast.open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={!toast.status ? 'error' : 'success'}>
                    {toast.message}
                </Alert>
            </Snackbar>
            <form onSubmit={handleSubmit(onRegister)} noValidate>
                <SectionForm title='Información personal'>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Nombre"
                            variant="outlined"
                            fullWidth
                            {...registerForm('name', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Apellidos"
                            variant="outlined"
                            fullWidth
                            {...registerForm('lastname', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.lastname}
                            helperText={errors.lastname?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Fecha de nacimiento (DD/MM/AAAA)"
                            variant="outlined"
                            fullWidth
                            {...registerForm('birthday', {
                                required: 'Este campo es requerido',
                                pattern: {
                                    value: /([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})/,
                                    message: "Formato o fecha invalida"
                                }
                            })}
                            error={!!errors.birthday}
                            helperText={errors.birthday?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="gender">Genero</InputLabel>
                            <Select
                                labelId='gender'
                                label="Genero"
                                {
                                ...registerForm('gender', {
                                    required: 'Este campo es requerido',
                                })}
                                error={!!errors.gender}
                            >
                                {/* {(Object.keys(UserGenderEnum) as Array<string>).map(gender => (
                                    <MenuItem key={gender} value={gender}>{}</MenuItem>
                                ))} */}
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="CURP"
                            variant="outlined"
                            fullWidth
                            {...registerForm('curp', {
                                required: 'Este campo es requerido',
                                pattern: {
                                    value: /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
                                    message: 'CURP inválido'
                                }
                            })}
                            error={!!errors.curp}
                            helperText={errors.curp?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Calle"
                            variant="outlined"
                            fullWidth
                            {...registerForm('address.street', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.address?.street}
                            helperText={errors.address?.street?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Número exterior"
                            variant="outlined"
                            fullWidth
                            {...registerForm('address.number.exterior', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.address?.number?.exterior}
                            helperText={errors.address?.number?.exterior?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Número interior (opcional)"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Colonia"
                            variant="outlined"
                            fullWidth
                            {...registerForm('address.colony', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.address?.colony}
                            helperText={errors.address?.colony?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Municipio"
                            variant="outlined"
                            fullWidth
                            {...registerForm('address.municipality', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.address?.municipality}
                            helperText={errors.address?.municipality?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <TextField
                            label="Pais"
                            variant="outlined"
                            fullWidth
                            value={"México"}
                            {...registerForm('address.country', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.address?.country}
                            helperText={errors.address?.country?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Codigo postal"
                            variant="outlined"
                            fullWidth
                            {...registerForm('address.zipCode', {
                                required: 'Este campo es requerido',
                                pattern: {
                                    value: /^[0-9]{5}/,
                                    message: "Codigo postal inválido"
                                }
                            })}
                            error={!!errors.address?.zipCode}
                            helperText={errors.address?.zipCode?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Entre calle"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Y"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                </SectionForm>
                <SectionForm title='Cuenta'>
                    <Grid item xs={12}>
                        <TextField
                            type={'email'}
                            label="Correo"
                            variant="outlined"
                            fullWidth
                            {...registerForm('email', {
                                required: 'Este campo es requerido',
                                validate: validations.isEmail
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            type={'password'}
                            label="Contraseña"
                            variant="outlined"
                            fullWidth
                            {...registerForm('password', {
                                required: 'Este campo es requerido',
                                minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Teléfono"
                            variant="outlined"
                            fullWidth
                            {...registerForm('phone', {
                                required: 'Este campo es requerido',
                                pattern: { value: /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/, message: 'El número es inválido' }
                            })}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Grid>
                </SectionForm>
                <SectionForm title='Información laboral'>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="RFC"
                            variant="outlined"
                            fullWidth
                            {...registerForm('rfc', {
                                required: 'Este campo es requerido',
                                pattern: {
                                    value: /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
                                    message: 'RFC inválido'
                                }
                            })}
                            error={!!errors.rfc}
                            helperText={errors.rfc?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="NSS"
                            variant="outlined"
                            fullWidth
                            {...registerForm('nss', {
                                required: 'Este campo es requerido',
                                pattern: { value: /^(\d{2})(\d{2})(\d{2})\d{5}$/, message: 'NSS inválido' }
                            })}
                            error={!!errors.nss}
                            helperText={errors.nss?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Descripción del puesto"
                            variant="outlined"
                            fullWidth
                            {...registerForm('job.description', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.job?.description}
                            helperText={errors.job?.description?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Horario de trabajo"
                            variant="outlined"
                            fullWidth
                            {...registerForm('job.schedule.from', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.job?.schedule?.from}
                            helperText={errors.job?.schedule?.from?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="a"
                            variant="outlined"
                            fullWidth
                            {...registerForm('job.schedule.to', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.job?.schedule?.to}
                            helperText={errors.job?.schedule?.to?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Salario"
                            variant="outlined"
                            fullWidth
                            {...registerForm('job.salary', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.job?.salary}
                            helperText={errors.job?.salary?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Número de cuenta"
                            variant="outlined"
                            fullWidth
                            {...registerForm('job.accountNumber', {
                                required: 'Este campo es requerido',
                                pattern: { value: /^(\d){15,16}$/, message: 'Número de cuenta inválido' }
                            })}
                            error={!!errors.job?.accountNumber}
                            helperText={errors.job?.accountNumber?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            color="secondary"
                            className="circular-btn"
                            size="large"
                            fullWidth >
                            Registrar
                        </Button>
                    </Grid>

                </SectionForm>
            </form>

        </ErpLayout >
    )
}

export default NuevoUsuarioPage