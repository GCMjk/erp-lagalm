import NextLink from 'next/link'
import { Chip, Link, Grid, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { useQuery } from '@apollo/client'
import { GetProspectsDocument } from '@gql/graphql'

import { ErpLayout } from '@components/layouts'
import { LoadingScreen } from '@components/ui'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'company', headerName: 'Empresa', flex: 1 },
    { field: 'businessActivity', headerName: 'Actividad empresarial', flex: 1 },
    { field: 'phone', headerName: 'Teléfono', flex: 1 },
    { field: 'email', headerName: 'Correo', flex: 1 },
    { field: 'message', headerName: 'Mensaje', flex: 1 },
    { field: 'lastMatch', headerName: 'Ultimo contacto', flex: 1 },
    {
        field: 'attended',
        headerName: 'Atendido',
        flex: 1,
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.attended
                    ? <Chip color='success' label='Atendido' variant='outlined' />
                    : <Chip color='error' label='No atendido' variant='outlined' />
            )
        }
    },
    {
        field: 'available',
        headerName: 'Disponilble',
        flex: 1,
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.available
                    ? <Chip color='success' label='Dispobile' variant='outlined' />
                    : <Chip color='error' label='No dispobile' variant='outlined' />
            )
        }
    },
    {
        field: 'view',
        headerName: 'Ver registro',
        flex: 1,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <NextLink href={`/app/ventas/prospectos/${params.row.id}`} passHref prefetch={false}>
                    <Link underline='always'>
                        Ver elemento
                    </Link>
                </NextLink>
            )
        }
    }
]

const ProspectosPage = () => {

    const { data, loading } = useQuery(GetProspectsDocument);
    const rows = data?.prospects?.prospects?.map(({ id, company, businessActivity, contact, message, matches, attended, details }) => {
        const lastMatch = matches?.slice(-1)[0];
        return {
            id,
            company,
            businessActivity,
            phone: contact?.phone,
            email: contact?.email,
            message,
            lastMatch,
            attended,
            available: details?.status
        }
    })

    if (loading) return <LoadingScreen />

    return (
        <ErpLayout title='Prospectos' pageDescription='Listado de prospectos'>
            <Typography variant='h2' component='h2'>Listado de prospectos</Typography>


            <Grid container marginTop={4}>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={rows || []}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>

        </ErpLayout>
    )
}

export default ProspectosPage