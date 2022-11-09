import NextLink from 'next/link'
import { Chip, Link, Grid, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { useQuery } from '@apollo/client'
import { GetRequisitionsDocument } from '@gql/graphql'

import { ErpLayout } from '@components/layouts'
import { LoadingScreen } from '@components/ui'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'product', headerName: 'Producto', flex: 1 },
    { field: 'number', headerName: 'Cantidad', flex: 1 },
    { field: 'type', headerName: 'Tipo', flex: 1 },
    { field: 'user', headerName: 'Usuario solicitante', flex: 1 },
    {
        field: 'autorization',
        headerName: 'Autorización',
        flex: 1,
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.autorization
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
                <NextLink href={`/app/compras/proveedores/${params.row.id}`} passHref>
                    <Link underline='always'>
                        Ver elemento
                    </Link>
                </NextLink>
            )
        }
    }
]

const RequisicionesPage = () => {

    const { data, loading } = useQuery(GetRequisitionsDocument);
    const rows = data?.requisitions?.requisitions?.map(({ id, product: typeProduct, userId, autorization, details }) => {
        return {
            id,
            product: typeProduct?.map((product) => product?.productId?.name),
            number: typeProduct?.map((product) => product?.number),
            type: typeProduct?.map((product) => product?.type),
            user: userId?.name,
            autorization,
            available: details.status
        }
    })

    if (loading) return <LoadingScreen />

    return (
        <ErpLayout title='Requisiciones' pageDescription='Listado de requisiciones'>
            <Typography variant='h2' component='h2'>Listado de requisiciones</Typography>


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

export default RequisicionesPage