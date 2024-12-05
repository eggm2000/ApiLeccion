import express from 'express'
import cors from 'cors' //importa los paquetes cors --permisos de accesos
import { fileURLToPath } from 'url'
import tb_clienteRoutes from './routes/tb_cliente.routes.js'
import tb_consumoRoutes from './routes/tb_consumo.routes.js'
import tb_medidorRoutes from './routes/tb_medidor.routes.js'
import tb_rutaasignadaRoutes from './routes/tb_rutaasignada.routes.js'
import tb_trabajdorRoutes from './routes/tb_trabajador.Ctrl.js'
import path from 'path'

//definir el modulo de ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const corsOptions={
    origin:'*',//la direccion ip del servidor
    methods:['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    cedentials:true
}
app.use(cors(corsOptions));
app.use(express.json()); // Para que interprete los objetos JSON
app.use(express.urlencoded({extended:true})); //se añade para poder receptar formularios
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// Rutas
app.use('/api', tb_clienteRoutes);
app.use('/api', tb_consumoRoutes);
app.use('/api', tb_medidorRoutes); 
app.use('/api', tb_rutaasignadaRoutes);
app.use('/api', tb_trabajdorRoutes);


// Middleware para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    });
});

export default app;
