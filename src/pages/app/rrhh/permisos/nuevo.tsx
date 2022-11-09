import { Box, Button, Grid, } from "@mui/material"
import { ErpLayout } from "@components/layouts"

const NuevoPermisoPage = () => {
    return (
        <ErpLayout title="Nuevo Permiso" pageDescription="Creación de un permiso">

            <Grid container spacing={2} sx={{ mt: 2 }}>

            </Grid>

            <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
                <Button color="secondary" className="circular-btn" size="large">
                    Guardar
                </Button>
            </Box>

        </ErpLayout>
    )
}

export default NuevoPermisoPage