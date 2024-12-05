import { Router } from 'express'
import {getCliente, getClienteById, postCliente, putCliente, patchCliente, deleteCliente} from '../controladores/tb_cliente.Ctrl.js'
const router=Router()
// armar nuestras rutas

// Ruta para obtener todos los clientes
router.get('/clientes', getCliente);

// Ruta para obtener un cliente específico por ID
router.get('/clientes/:id', getClienteById);

// Ruta para crear un nuevo cliente
router.post('/clientes', postCliente);

// Ruta para actualizar un cliente existente (completa)
router.put('/clientes/:id', putCliente);

// Ruta para actualizar un cliente parcialmente
router.patch('/clientes/:id', patchCliente);

// Ruta para eliminar un cliente
router.delete('/clientes/:id', deleteCliente);

export default router;