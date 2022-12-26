import NextLink from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { Box, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Language, Email, Phone, ConnectWithoutContact } from '@mui/icons-material'

import { useQuery } from '@apollo/client'
import { Address, GetProspectDocument } from '@gql'

import { ErpLayout } from '@components/layouts'
import { LoadingScreen } from '@components/ui'
import { formatAddress, formatDate } from '@libs'

const ProspectoPage = () => {
    const { query } = useRouter();

    const { data, loading } = useQuery(GetProspectDocument, { variables: { prospectId: `${query.id}` } });
    const prospect = data?.prospect?.prospect;


    if (loading) return <LoadingScreen />
    return (
        <ErpLayout title={prospect?.company as string} pageDescription={`Descripcion del prospecto ${prospect?.businessActivity}`}>
            <Typography variant='h2' component='h2'>
                {prospect?.businessActivity?.charAt(0).toUpperCase()}{prospect?.businessActivity?.slice(1)}.
            </Typography>

            <Grid container spacing={2} sx={{ marginTop: 1 }}>
                <Grid item xs={12} sm={4}>
                    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                        <Image alt={`Logo de ${prospect?.company}`} src={
                            prospect?.logo?.url
                                ? prospect?.logo?.url as string
                                : "https://us.123rf.com/450wm/mattbadal/mattbadal2012/mattbadal201200056/161901103-sin-vector-de-icono-de-imagen-no-hay-s%C3%ADmbolo-de-imagen-disponible-adecuado-para-el-elemento-de-inter.jpg?ver=6"
                        } layout='fill' objectFit='cover' />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            {/* Dirección */}
                            {
                                prospect?.address
                                    ? (
                                        <Box paddingY={2}>
                                            <Typography variant='subtitle1'>
                                                Dirección
                                            </Typography>
                                            <Typography variant='body1'>
                                                {
                                                    formatAddress(prospect?.address as Address)
                                                }
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Box paddingY={2}>
                                            <Typography variant='subtitle1'>No hay dirección registrada</Typography>
                                        </Box>
                                    )
                            }
                            {/* Mensaje */}
                            {
                                prospect?.message
                                    ? (
                                        <Box paddingY={2}>
                                            <Typography variant='subtitle1'>
                                                Mensaje
                                            </Typography>
                                            <Typography variant='body1'>
                                                {prospect?.message}
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Box paddingY={2}>
                                            <Typography variant='subtitle1'>
                                                No hay mensaje registrado
                                            </Typography>
                                        </Box>
                                    )
                            }
                            {/* Ultimo contacto */}
                            <Box paddingY={2}>
                                <Typography variant='subtitle1'>Contactos</Typography>
                                {
                                    prospect?.matches?.map(
                                        contact => (
                                            <Typography key={contact} variant='body1'>{formatDate(contact as string)}</Typography>
                                        )
                                    )
                                }
                            </Box>
                            {/* Estado */}
                            <Box paddingY={2}>
                                <Typography variant='subtitle1'>
                                    Estado
                                </Typography>
                                <Typography variant='body1' color={prospect?.attended ? 'success' : 'error'}>
                                    {
                                        prospect?.attended
                                            ? 'Atendido'
                                            : 'Sin atender'
                                    }
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {/* Contacto */}
                            <List>
                                <Typography variant='subtitle1'>
                                    Contacto
                                </Typography>
                                <NextLink href={prospect?.contact?.web as string}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Language />
                                        </ListItemIcon>
                                        <ListItemText primary={prospect?.contact?.web ? prospect?.contact?.web : "Sin registro"} />
                                    </ListItem>
                                </NextLink>
                                <ListItem>
                                    <ListItemIcon>
                                        <Email />
                                    </ListItemIcon>
                                    <ListItemText primary={prospect?.contact?.email ? prospect?.contact?.email : "Sin registro"} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Phone />
                                    </ListItemIcon>
                                    <ListItemText primary={prospect?.contact?.phone ? prospect?.contact?.phone : "Sin registro"} />
                                </ListItem>
                                {
                                    prospect?.contact?.personalizedContact
                                        ? (
                                            <ListItem>
                                                <List>
                                                    <Typography variant='subtitle1'>Contacto(s) directo(s)</Typography>
                                                    {
                                                        prospect?.contact?.personalizedContact?.map(
                                                            contact => (
                                                                <>
                                                                    <ListItem key={contact?.name} >
                                                                        <ListItemIcon>
                                                                            <ConnectWithoutContact />
                                                                        </ListItemIcon>
                                                                        <ListItemText primary={`${contact?.title} ${contact?.name} de ${contact?.workPosition}`} />
                                                                    </ListItem>
                                                                    <ListItem>
                                                                        <ListItemIcon>
                                                                            <Email />
                                                                        </ListItemIcon>
                                                                        <ListItemText primary={contact?.email} />
                                                                    </ListItem>
                                                                    <ListItem>
                                                                        <ListItemIcon>
                                                                            <Phone />
                                                                        </ListItemIcon>
                                                                        <ListItemText primary={contact?.phone} />
                                                                    </ListItem>
                                                                </>
                                                            )
                                                        )
                                                    }
                                                </List>
                                            </ListItem>
                                        ) : <Box>
                                            <Typography variant='subtitle1'>
                                                No hay contactos directos
                                            </Typography>
                                        </Box>
                                }
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </ErpLayout>
    )
}

export default ProspectoPage