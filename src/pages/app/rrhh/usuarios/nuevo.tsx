import { useState } from 'react'
import { Grid, TextField, Button, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem, InputAdornment } from '@mui/material'

import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@apollo/client'
import { RegisterDocument, UserInput, UserGenderEnum, UserMaritalStatusEnum, UserRoleEnum, UserSchoolingEnum, GetWorkAreasDocument } from '@gql/graphql'

import { ErpLayout } from '@components/layouts'
import { SectionForm } from '@components/ui'
import { isDate, isEmail, isCurp, isZipCode, isPhone, isRfc, isNss, isNumberCard, isTime, isPrice } from '@libs/validations'

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
            console.log('ERROR', error)
        }

    }

    const userGenderArray = Object.values(UserGenderEnum);
    const userMaritalStatusArray = Object.values(UserMaritalStatusEnum)
    const userAddressStateArray = [
        'Aguascalientes',
        'Baja California',
        'Baja California Sur',
        'Campeche',
        'Chiapas',
        'Chihuahua',
        'Coahuila de Zaragoza',
        'Colima',
        'Ciudad de México',
        'Durango',
        'Guanajuato',
        'Guerrero',
        'Hidalgo',
        'Jalisco',
        'Estado de Mexico',
        'Michoacan de Ocampo',
        'Morelos',
        'Nayarit',
        'Nuevo Leon',
        'Oaxaca',
        'Puebla',
        'Queretaro de Arteaga',
        'Quintana Roo',
        'San Luis Potosi',
        'Sinaloa',
        'Sonora',
        'Tabasco',
        'Tamaulipas',
        'Tlaxcala',
        'Veracruz de Ignacio de la Llave',
        'Yucatan',
        'Zacatecas',
    ]
    const userRoleArray = Object.values(UserRoleEnum)
    const userSchoolingArray = Object.values(UserSchoolingEnum)

    const { data: dataWorkAreas } = useQuery(GetWorkAreasDocument)
    const userWorkAreasArray = dataWorkAreas?.workAreas?.workAreas;

    registerForm('details.creatorUserId', { value: '1' })
    registerForm('details.status', { value: true })

    return (
        <ErpLayout title='Nuevo Usuario' pageDescription='Creación de un usuario'>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={toast.open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={!toast.status ? 'error' : 'success'}
                >
                    {toast.message}
                </Alert>
            </Snackbar>
            <form onSubmit={handleSubmit(onRegister)} noValidate>
                <SectionForm title='Información personal'>
                    {/* name */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            label='Nombre'
                            variant='outlined'
                            fullWidth
                            {...registerForm('name', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    </Grid>
                    {/* lastname */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            label='Apellidos'
                            variant='outlined'
                            fullWidth
                            {...registerForm('lastname', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.lastname}
                            helperText={errors.lastname?.message}
                        />
                    </Grid>
                    {/* bithday */}
                    <Grid item xs={12}>
                        <TextField
                            label='Fecha de nacimiento (DD/MM/AAAA)'
                            variant='outlined'
                            fullWidth
                            inputProps={{ maxLength: 10 }}
                            {...registerForm('birthday', {
                                required: 'Este campo es requerido',
                                validate: isDate
                            })}
                            error={!!errors.birthday}
                            helperText={errors.birthday?.message}
                        />
                    </Grid>
                    {/* gender */}
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id='gender'>Género</InputLabel>
                            <Select
                                labelId='gender'
                                label='Género'
                                defaultValue=''
                                {
                                ...registerForm('gender', {
                                    required: 'Este campo es requerido',
                                })}
                                error={!!errors.gender}
                            >
                                {userGenderArray.map(gender => (
                                    <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* maritalStatus */}
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id='maritalStatus'>Estado civil</InputLabel>
                            <Select
                                labelId='maritalStatus'
                                label='Estado civil'
                                defaultValue=''
                                {
                                ...registerForm('maritalStatus', {
                                    required: 'Este campo es requerido',
                                })}
                                error={!!errors.maritalStatus}
                            >
                                {userMaritalStatusArray.map(maritalStatus => (
                                    <MenuItem key={maritalStatus} value={maritalStatus}>{maritalStatus}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* curp */}
                    <Grid item xs={12}>
                        <TextField
                            label='CURP'
                            variant='outlined'
                            fullWidth
                            {...registerForm('curp', {
                                required: 'Este campo es requerido',
                                validate: isCurp
                            })}
                            error={!!errors.curp}
                            helperText={errors.curp?.message}
                        />
                    </Grid>
                    {/* address.street */}
                    <Grid item xs={12}>
                        <TextField
                            label='Calle'
                            variant='outlined'
                            fullWidth
                            {...registerForm('address.street', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.address?.street}
                            helperText={errors.address?.street?.message}
                        />
                    </Grid>
                    {/* address.number.exterior */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            label='Número exterior'
                            variant='outlined'
                            fullWidth
                            {...registerForm('address.number.exterior', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.address?.number?.exterior}
                            helperText={errors.address?.number?.exterior?.message}
                        />
                    </Grid>
                    {/* address.number.interior */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            label='Número interior (opcional)'
                            variant='outlined'
                            fullWidth
                            {...registerForm('address.number.interior')}
                        />
                    </Grid>
                    {/* address.colony */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            label='Colonia'
                            variant='outlined'
                            fullWidth
                            {...registerForm('address.colony', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.address?.colony}
                            helperText={errors.address?.colony?.message}
                        />
                    </Grid>
                    {/* address.municipality */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            label='Municipio'
                            variant='outlined'
                            fullWidth
                            {...registerForm('address.municipality', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.address?.municipality}
                            helperText={errors.address?.municipality?.message}
                        />
                    </Grid>
                    {/* address.state */}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id='address.state'>Estado</InputLabel>
                            <Select
                                labelId='address.state'
                                label='Estado'
                                defaultValue=''
                                {
                                ...registerForm('address.state', {
                                    required: 'Este campo es requerido',
                                })}
                                error={!!errors.address?.state}
                            >
                                {userAddressStateArray.map(state => (
                                    <MenuItem key={state} value={state}>{state}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* address.country */}
                    <Grid item xs={12} md={8}>
                        <TextField
                            label='Pais'
                            variant='outlined'
                            fullWidth
                            value={'México'}
                            {...registerForm('address.country', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.address?.country}
                            helperText={errors.address?.country?.message}
                        />
                    </Grid>
                    {/* address.zipCode */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            label='Codigo postal'
                            variant='outlined'
                            fullWidth
                            inputProps={{ maxLength: 5 }}
                            {...registerForm('address.zipCode', {
                                required: 'Este campo es requerido',
                                validate: isZipCode
                            })}
                            error={!!errors.address?.zipCode}
                            helperText={errors.address?.zipCode?.message}
                        />
                    </Grid>
                    {/* address.streets.a */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            label='Entre calle (opcional)'
                            variant='outlined'
                            fullWidth
                            {...registerForm('address.streets.a')}
                        />
                    </Grid>
                    {/* address.streets.b */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            label='y la calle (opcional)'
                            variant='outlined'
                            fullWidth
                            {...registerForm('address.streets.b')}
                        />
                    </Grid>
                </SectionForm>
                <SectionForm title='Cuenta'>
                    {/* email */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            type={'email'}
                            label='Correo'
                            variant='outlined'
                            fullWidth
                            {...registerForm('email', {
                                required: 'Este campo es requerido',
                                validate: isEmail
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Grid>
                    {/* password */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            type={'password'}
                            label='Contraseña'
                            variant='outlined'
                            fullWidth
                            {...registerForm('password', {
                                required: 'Este campo es requerido',
                                minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Grid>
                    {/* phone */}
                    <Grid item xs={12}>
                        <TextField
                            label='Teléfono'
                            variant='outlined'
                            fullWidth
                            {...registerForm('phone', {
                                required: 'Este campo es requerido',
                                validate: (phone) => isPhone(phone as string)
                            })}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Grid>
                    {/* role */}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id='role'>Role</InputLabel>
                            <Select
                                labelId='role'
                                label='Role'
                                defaultValue=''
                                {
                                ...registerForm('role', {
                                    required: 'Este campo es requerido',
                                })}
                                error={!!errors.role}
                            >
                                {userRoleArray.map(role => (
                                    <MenuItem key={role} value={role}>{role}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </SectionForm>
                <SectionForm title='Información laboral'>
                    {/* rfc */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            label='RFC'
                            variant='outlined'
                            fullWidth
                            {...registerForm('rfc', {
                                required: 'Este campo es requerido',
                                validate: (rfc) => isRfc(rfc as string)
                            })}
                            error={!!errors.rfc}
                            helperText={errors.rfc?.message}
                        />
                    </Grid>
                    {/* nss */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            label='NSS'
                            variant='outlined'
                            fullWidth
                            {...registerForm('nss', {
                                required: 'Este campo es requerido',
                                validate: (nss) => isNss(nss as string)
                            })}
                            error={!!errors.nss}
                            helperText={errors.nss?.message}
                        />
                    </Grid>
                    {/* schooling */}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id='schooling'>Escolaridad</InputLabel>
                            <Select
                                labelId='schooling'
                                label='Escolaridad'
                                defaultValue=''
                                {
                                ...registerForm('schooling', {
                                    required: 'Este campo es requerido',
                                })}
                                error={!!errors.schooling}
                            >
                                {userSchoolingArray.map(schooling => (
                                    <MenuItem key={schooling} value={schooling}>{schooling}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* job.workAreaId */}
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id='workAreas'>Areas de trabajo</InputLabel>
                            <Select
                                labelId='workAreas'
                                label='Areas de trabajo'
                                defaultValue=''
                                {
                                ...registerForm('job.workAreaId', {
                                    required: 'Este campo es requerido',
                                })}
                                error={!!errors.job?.workAreaId}
                            >
                                {userWorkAreasArray?.map(({ id, title }) => (
                                    <MenuItem key={id} value={id as string}>{title}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* job.description */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            label='Descripción del puesto'
                            variant='outlined'
                            fullWidth
                            {...registerForm('job.description', {
                                required: 'Este campo es requerido'
                            })}
                            error={!!errors.job?.description}
                            helperText={errors.job?.description?.message}
                        />
                    </Grid>
                    {/* job.schedule.from */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            label='Horario de trabajo (hh:mm)'
                            variant='outlined'
                            fullWidth
                            {...registerForm('job.schedule.from', {
                                required: 'Este campo es requerido',
                                validate: isTime
                            })}
                            error={!!errors.job?.schedule?.from}
                            helperText={errors.job?.schedule?.from?.message}
                        />
                    </Grid>
                    {/* job.schedule.to */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            label='a (hh:mm)'
                            variant='outlined'
                            fullWidth
                            {...registerForm('job.schedule.to', {
                                required: 'Este campo es requerido',
                                validate: isTime
                            })}
                            error={!!errors.job?.schedule?.to}
                            helperText={errors.job?.schedule?.to?.message}
                        />
                    </Grid>
                    {/* job.salary */}
                    <Grid item xs={12}>
                        <TextField
                            label='Salario'
                            variant='outlined'
                            fullWidth
                            InputProps={{
                                startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                            }}
                            {...registerForm('job.salary', {
                                required: 'Este campo es requerido',
                                validate: (price) => isPrice(price as string)
                            })}
                            error={!!errors.job?.salary}
                            helperText={errors.job?.salary?.message}
                        />
                    </Grid>
                    {/* job.accountNumber */}
                    <Grid item xs={12}>
                        <TextField
                            label='Número de cuenta'
                            variant='outlined'
                            fullWidth
                            inputProps={{ maxLength: 16 }}
                            {...registerForm('job.accountNumber', {
                                required: 'Este campo es requerido',
                                validate: isNumberCard
                            })}
                            error={!!errors.job?.accountNumber}
                            helperText={errors.job?.accountNumber?.message}
                        />
                    </Grid>
                    {/* button */}
                    <Grid item xs={12}>
                        <Button
                            type='submit'
                            color='secondary'
                            className='circular-btn'
                            size='large'
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