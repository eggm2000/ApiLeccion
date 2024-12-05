import { Router } from 'express';
import {
    getMedidores,
    getMedidorById,
    postMedidor,
    putMedidor,
    patchMedidor,
    deleteMedidor} from '../controladores/tb_medidor.Ctrl.js';

const router = Router();

// Ruta para obtener todos los medidores
router.get('/medidores', getMedidores);

// Ruta para obtener un medidor específico por ID
router.get('/medidores/:id', getMedidorById);

// Ruta para crear un nuevo medidor
router.post('/medidores', postMedidor);

// Ruta para actualizar un medidor existente (completa)
router.put('/medidores/:id', putMedidor);

// Ruta para actualizar un medidor parcialmente
router.patch('/medidores/:id', patchMedidor);

// Ruta para eliminar un medidor
router.delete('/medidores/:id', deleteMedidor);

export default router;
