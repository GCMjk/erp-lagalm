import NextLink from 'next/link'
import { Chip, Link, Grid, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { useQuery } from '@apollo/client'
import { GetVacantsDocument } from '@gql'

import { ErpLayout } from '@components/layouts'
import { LoadingScreen } from '@components/ui'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'titleWorkArea', headerName: 'Area', flex: 1 },
    { field: 'title', headerName: 'Titulo', flex: 1 },
    { field: 'description', headerName: 'Descripción', flex: 1 },
    {
        field: 'availableUntil',
        headerName: 'Disponibilidad',
        flex: 1,
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.availableUntil.available
                    ? <>{params.row.availableUntil.date}</>
                    : <Chip color='error' label="No disponible" variant='outlined' />
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
        width: 150,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <NextLink href={`/app/rrhh/vacantes/${params.row.id}`} passHref>
                    <Link underline='always'>
                        Ver elemento
                    </Link>
                </NextLink>
            )
        }
    }
]

const VacantesPage = () => {

    const { data, loading } = useQuery(GetVacantsDocument);
    const rows = data?.vacants?.vacants?.map(({ id, title, description: { description }, available: { date, available }, workAreaId: { title: titleWorkArea }, details: { status } }) => {
        return {
            id,
            titleWorkArea,
            title,
            description,
            availableUntil: {
                date,
                available
            },
            available: status
        }
    })

    if (loading) return <LoadingScreen />

    return (
        <ErpLayout title='Vacantes' pageDescription='Listado de vacantes'>
            <Typography variant='h2' component='h2'>Listado de vacantes</Typography>


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

export default VacantesPage