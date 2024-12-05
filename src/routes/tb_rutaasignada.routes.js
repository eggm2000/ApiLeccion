import { Router } from 'express';
import {
    getRutasAsignadas,getRutaAsignadaById,postRutaAsignada,putRutaAsignada,patchRutaAsignada,deleteRutaAsignada} from '../controladores/tb_rutaasignada.Ctrl.js';

const router = Router();

// Ruta para obtener todas las rutas asignadas
router.get('/rutasasignadas', getRutasAsignadas);

// Ruta para obtener una ruta asignada específica por ID
router.get('/rutasasignadas/:id', getRutaAsignadaById);

// Ruta para crear una nueva ruta asignada
router.post('/rutasasignadas', postRutaAsignada);

// Ruta para actualizar una ruta asignada existente (completa)
router.put('/rutasasignadas/:id', putRutaAsignada);

// Ruta para actualizar una ruta asignada parcialmente
router.patch('/rutasasignadas/:id', patchRutaAsignada);

// Ruta para eliminar una ruta asignada
router.delete('/rutasasignadas/:id', deleteRutaAsignada);

export default router;
