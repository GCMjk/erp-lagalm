import NextLink from 'next/link'
import { Chip, Link, Grid, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { useQuery } from '@apollo/client'
import { GetUsersDocument } from '@gql/graphql'

import { ErpLayout } from '@components/layouts'
import { LoadingScreen } from '@components/ui'
import { formatDate } from '@hooks/index'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'fullName', headerName: 'Nombre completo', width: 200 },
    { field: 'gender', headerName: 'Genero', width: 200 },
    { field: 'email', headerName: 'Correo', width: 200 },
    { field: 'job', headerName: 'Area', width: 150 },
    { field: 'lastSession', headerName: 'Ultima sesión', width: 200 },
    {
        field: 'available',
        headerName: 'Disponilble',
        width: 150,
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
        width: 150,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <NextLink href={`/app/rrhh/usuarios/${params.row.id}`} passHref>
                    <Link underline='always'>
                        Ver elemento
                    </Link>
                </NextLink>
            )
        }
    }
]

const UsuariosPage = () => {

    const { data, loading } = useQuery(GetUsersDocument);
    const rows = data?.users?.users?.map(({ id, name, lastname, gender, email, job, lastSession, details: { status } }) => {
        const dateFormat = formatDate(lastSession)
        return {
            id,
            fullName: name + " " + lastname,
            gender,
            email,
            job: job?.workAreaId.title + ", " + job?.description,
            lastSession: lastSession ? dateFormat : "No hay inicio",
            available: status
        }
    })

    if (loading) return <LoadingScreen />

    return (
        <ErpLayout title='Usuarios' pageDescription='Listado de usuarios'>
            <Typography variant='h2' component='h2'>Listado de usuarios</Typography>


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

export default UsuariosPage