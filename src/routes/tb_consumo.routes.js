import { Router } from 'express'
import {getConsumos,getConsumoById,postConsumo,putConsumo,patchConsumo,deleteConsumo} from '../controladores/tb_consumo.Ctrl.js';

const router = Router();

// Ruta para obtener todos los consumos
router.get('/consumos', getConsumos);

// Ruta para obtener un consumo específico por ID
router.get('/consumos/:id', getConsumoById);

// Ruta para crear un nuevo consumo
router.post('/consumos', postConsumo);

// Ruta para actualizar un consumo existente (completa)
router.put('/consumos/:id', putConsumo);

// Ruta para actualizar un consumo parcialmente
router.patch('/consumos/:id', patchConsumo);

// Ruta para eliminar un consumo
router.delete('/consumos/:id', deleteConsumo);

export default router;
