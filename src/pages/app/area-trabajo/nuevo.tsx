import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material"
import { ErpLayout } from "@components/layouts"

const NuevaAreaTrabajoPage = () => {
    return (
        <ErpLayout title="Nueva Area" pageDescription="Creación de una area de trabajo">

            <Grid container spacing={2} sx={{ mt: 2 }}>

                <Grid item xs={12}>
                    <TextField label="Titulo" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Descripción" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Select
                            variant="filled"
                            label="Opciones"
                            value={1}
                        >
                            <MenuItem value={1}>Opcion 1</MenuItem>
                            <MenuItem value={2}>Opcion 2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

            </Grid>

            <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
                <Button color="secondary" className="circular-btn" size="large">
                    Guardar
                </Button>
            </Box>

        </ErpLayout>
    )
}

export default NuevaAreaTrabajoPage