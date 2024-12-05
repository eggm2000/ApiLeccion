import { conmysql } from '../db.js';

// Obtener todas las rutas asignadas
export const getRutasAsignadas = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM tb_rutaasignada');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar rutas asignadas" });
    }
};

// Obtener una ruta asignada específica por ID
export const getRutaAsignadaById = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM tb_rutaasignada WHERE ruta_id = ?', [req.params.id]);
        if (result.length <= 0) return res.status(404).json({
            ruta_id: 0,
            message: "Ruta asignada no encontrada"
        });
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Crear una nueva ruta asignada
export const postRutaAsignada = async (req, res) => {
    try {
        const { med_id, tra_cedula } = req.body;
        const [rows] = await conmysql.query(
            'INSERT INTO tb_rutaasignada (med_id, tra_cedula) VALUES (?, ?)',
            [med_id, tra_cedula]
        );
        res.send({ id: rows.insertId });
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Actualizar completamente una ruta asignada existente
export const putRutaAsignada = async (req, res) => {
    try {
        const { id } = req.params;
        const { med_id, tra_cedula } = req.body;
        const [result] = await conmysql.query(
            'UPDATE tb_rutaasignada SET med_id = ?, tra_cedula = ? WHERE ruta_id = ?',
            [med_id, tra_cedula, id]
        );

        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Ruta asignada no encontrada' });

        const [rows] = await conmysql.query('SELECT * FROM tb_rutaasignada WHERE ruta_id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Actualizar parcialmente una ruta asignada existente
export const patchRutaAsignada = async (req, res) => {
    try {
        const { id } = req.params;
        const { med_id, tra_cedula } = req.body;
        const [result] = await conmysql.query(
            'UPDATE tb_rutaasignada SET med_id = IFNULL(?, med_id), tra_cedula = IFNULL(?, tra_cedula) WHERE ruta_id = ?',
            [med_id, tra_cedula, id]
        );

        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Ruta asignada no encontrada' });

        const [rows] = await conmysql.query('SELECT * FROM tb_rutaasignada WHERE ruta_id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Eliminar una ruta asignada
export const deleteRutaAsignada = async (req, res) => {
    try {
        const [rows] = await conmysql.query('DELETE FROM tb_rutaasignada WHERE ruta_id = ?', [req.params.id]);
        if (rows.affectedRows <= 0) return res.status(404).json({ id: 0, message: "No pudo eliminar la ruta asignada" });
        res.sendStatus(202);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};
