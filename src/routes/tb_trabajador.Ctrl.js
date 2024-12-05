import { Router } from 'express';
import {getTrabajadores,getTrabajadorByCedula,postTrabajador,putTrabajador,patchTrabajador, deleteTrabajador} from '../controladores/tb_trabajador.Ctrl.js';

const router = Router();

// Ruta para obtener todos los trabajadores
router.get('/trabajadores', getTrabajadores);

// Ruta para obtener un trabajador específico por cédula
router.get('/trabajadores/:cedula', getTrabajadorByCedula);

// Ruta para crear un nuevo trabajador
router.post('/trabajadores', postTrabajador);

// Ruta para actualizar un trabajador existente (completa)
router.put('/trabajadores/:cedula', putTrabajador);

// Ruta para actualizar un trabajador parcialmente
router.patch('/trabajadores/:cedula', patchTrabajador);

// Ruta para eliminar un trabajador
router.delete('/trabajadores/:cedula', deleteTrabajador);

export default router;
