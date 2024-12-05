import { conmysql } from '../db.js';

// Obtener todos los trabajadores
export const getTrabajadores = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM tb_trabajador');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar trabajadores" });
    }
};

// Obtener un trabajador específico por cédula
export const getTrabajadorByCedula = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM tb_trabajador WHERE tra_cedula = ?', [req.params.cedula]);
        if (result.length <= 0) return res.status(404).json({
            tra_cedula: 0,
            message: "Trabajador no encontrado"
        });
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Crear un nuevo trabajador
export const postTrabajador = async (req, res) => {
    try {
        const { tra_cedula, tra_nombres, tra_apellidos, tra_estado } = req.body;
        const [rows] = await conmysql.query(
            'INSERT INTO tb_trabajador (tra_cedula, tra_nombres, tra_apellidos, tra_estado) VALUES (?, ?, ?, ?)',
            [tra_cedula, tra_nombres, tra_apellidos, tra_estado]
        );
        res.send({ id: rows.insertId });
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Actualizar completamente un trabajador existente
export const putTrabajador = async (req, res) => {
    try {
        const { cedula } = req.params;
        const { tra_nombres, tra_apellidos, tra_estado } = req.body;
        const [result] = await conmysql.query(
            'UPDATE tb_trabajador SET tra_nombres = ?, tra_apellidos = ?, tra_estado = ? WHERE tra_cedula = ?',
            [tra_nombres, tra_apellidos, tra_estado, cedula]
        );

        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Trabajador no encontrado' });

        const [rows] = await conmysql.query('SELECT * FROM tb_trabajador WHERE tra_cedula = ?', [cedula]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Actualizar parcialmente un trabajador existente
export const patchTrabajador = async (req, res) => {
    try {
        const { cedula } = req.params;
        const { tra_nombres, tra_apellidos, tra_estado } = req.body;
        const [result] = await conmysql.query(
            'UPDATE tb_trabajador SET tra_nombres = IFNULL(?, tra_nombres), tra_apellidos = IFNULL(?, tra_apellidos), tra_estado = IFNULL(?, tra_estado) WHERE tra_cedula = ?',
            [tra_nombres, tra_apellidos, tra_estado, cedula]
        );

        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Trabajador no encontrado' });

        const [rows] = await conmysql.query('SELECT * FROM tb_trabajador WHERE tra_cedula = ?', [cedula]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Eliminar un trabajador
export const deleteTrabajador = async (req, res) => {
    try {
        const [rows] = await conmysql.query('DELETE FROM tb_trabajador WHERE tra_cedula = ?', [req.params.cedula]);
        if (rows.affectedRows <= 0) return res.status(404).json({ id: 0, message: "No pudo eliminar al trabajador" });
        res.sendStatus(202);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};
