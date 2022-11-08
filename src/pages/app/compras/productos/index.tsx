import NextLink from 'next/link'
import { Chip, Link, Grid, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { useQuery } from '@apollo/client'
import { GetProductsDocument } from '@gql/graphql'

import { ErpLayout } from '@components/layouts'
import { LoadingScreen } from '@components/ui'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Nombre', flex: 1 },
    { field: 'description', headerName: 'Descripción', flex: 1 },
    { field: 'typeProduct', headerName: 'Tipo de producto', flex: 1 },
    { field: 'brand', headerName: 'Marca', flex: 1 },
    {
        field: 'audited',
        headerName: 'Auditable',
        flex: 1,
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.audited
                    ? <Chip color='success' label='Auditable' variant='filled' />
                    : <Chip color='error' label='No auditable' variant='filled' />
            )
        }
    },
    { field: 'supplier', headerName: 'Proveedor', flex: 1 },
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
                <NextLink href={`/app/compras/productos/${params.row.id}`} passHref>
                    <Link underline='always'>
                        Ver elemento
                    </Link>
                </NextLink>
            )
        }
    }
]

const ProductosPage = () => {

    const { data, loading } = useQuery(GetProductsDocument);
    const rows = data?.products?.products?.map(({ id, name, description, type, brand, audited, supplierId, details }) => {
        return {
            id,
            name,
            description,
            typeProduct: `${type?.type}, ${type?.description}`,
            brand,
            audited,
            supplier: supplierId.name,
            available: details.status
        }
    })

    if (loading) return <LoadingScreen />

    return (
        <ErpLayout title='Productos' pageDescription='Listado de productos'>
            <Typography variant='h2' component='h2'>Listado de productos</Typography>


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

export default ProductosPage