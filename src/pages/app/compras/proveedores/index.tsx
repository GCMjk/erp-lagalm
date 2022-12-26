import NextLink from 'next/link'
import { Chip, Link, Grid, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { useQuery } from '@apollo/client'
import { GetSuppliersDocument } from '@gql'

import { ErpLayout } from '@components/layouts'
import { LoadingScreen } from '@components/ui'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Nombre', flex: 1 },
    { field: 'email', headerName: 'Correo', flex: 1 },
    { field: 'address', headerName: 'Dirección', flex: 1 },
    { field: 'rfc', headerName: 'RFC', flex: 1 },
    {
        field: 'classification',
        headerName: 'Clasificación',
        flex: 1,
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.classification === 'A'
                    ? <Chip color='success' label='A' variant='filled' />
                    : params.row.classification === 'B'
                        ? <Chip color='warning' label='B' variant='filled' />
                        : params.row.classification === 'C'
                            ? <Chip color='error' label='C' variant='filled' />
                            : <Chip color='info' label='Indefinido' variant='outlined' />
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

const ProveedoresPage = () => {

    const { data, loading } = useQuery(GetSuppliersDocument);
    const rows = data?.suppliers?.suppliers?.map(({ id, name, infoContact, address, taxes, classification, details }) => {
        const fullAddress = `${address?.street} ${address?.number?.exterior}${address?.number?.interior}, ${address?.colony}, ${address?.municipality}, ${address?.state}, ${address?.zipCode}`
        return {
            id,
            name,
            email: infoContact?.email,
            address: address ? fullAddress : "No hay dirección registrada",
            rfc: taxes?.type === "DIRECTO" ? taxes?.rfc : taxes?.type,
            classification,
            available: details.status
        }
    })

    if (loading) return <LoadingScreen />

    return (
        <ErpLayout title='Proveedores' pageDescription='Listado de proveedores'>
            <Typography variant='h2' component='h2'>Listado de proveedores</Typography>


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

export default ProveedoresPage