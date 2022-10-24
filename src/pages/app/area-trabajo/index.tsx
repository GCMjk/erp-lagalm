import NextLink from 'next/link'
import { Chip, Link, Grid, Typography } from '@mui/material'

import { ErpLayout } from '@components/layouts'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'title', headerName: 'Titulo', width: 150 },
    { field: 'description', headerName: 'Descripción', width: 200 },
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
                <NextLink href={`/app/area-trabajo/${params.row.id}`} passHref>
                    <Link underline='always'>
                        Ver área
                    </Link>
                </NextLink>
            )
        }
    }
]

const rows = [
    { id: 1, title: 'Programador', description: 'Descripcion del puesto', available: true },
    { id: 2, title: 'Programador', description: 'Descripcion del puesto', available: false },
]

const AreaTrabajoPage = () => {
    return (
        <ErpLayout title='Areas de trabajo' pageDescription='Listado de areas de trabajo'>
            <Typography variant='h2' component='h2'>Listado de las areas de trabajo</Typography>


            <Grid container marginTop={4}>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>

        </ErpLayout>
    )
}

export default AreaTrabajoPage