import NextLink from 'next/link'
import { Chip, Link, Grid, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { useQuery } from '@apollo/client'
import { GetPermissionsDocument } from '@gql'

import { ErpLayout } from '@components/layouts'
import { LoadingScreen } from '@components/ui'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'user', headerName: 'Usuario', flex: 1 },
    { field: 'type', headerName: 'Tipo', flex: 1 },
    { field: 'time', headerName: 'Hora del permiso', flex: 1 },
    {
        field: 'authorization',
        headerName: 'Autorización',
        flex: 1,
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.authorization
                    ? <Chip color='success' label='Autorizado' variant='outlined' />
                    : <Chip color='error' label='No autorizado' variant='outlined' />
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
                <NextLink href={`/app/rrhh/permisos/${params.row.id}`} passHref>
                    <Link underline='always'>
                        Ver elemento
                    </Link>
                </NextLink>
            )
        }
    }
]

const PermisosPage = () => {

    const { data, loading } = useQuery(GetPermissionsDocument);
    const rows = data?.permissions?.permissions?.map(({ id, userId, type, from, to, authorization, details: { status } }) => {
        return {
            id,
            user: userId.name + " " + userId.lastname,
            type,
            time: `De ${from} a ${to}`,
            authorization,
            available: status
        }
    })

    if (loading) return <LoadingScreen />

    return (
        <ErpLayout title='Permisos' pageDescription='Listado de permisos'>
            <Typography variant='h2' component='h2'>Listado de permisos</Typography>


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

export default PermisosPage