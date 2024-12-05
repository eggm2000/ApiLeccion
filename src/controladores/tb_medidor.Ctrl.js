import { conmysql } from '../db.js';

// Obtener todos los medidores
export const getMedidores = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM tb_medidor');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar medidores" });
    }
};

// Obtener un medidor específico por ID
export const getMedidorById = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM tb_medidor WHERE med_id = ?', [req.params.id]);
        if (result.length <= 0) return res.status(404).json({
            med_id: 0,
            message: "Medidor no encontrado"
        });
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Crear un nuevo medidor
export const postMedidor = async (req, res) => {
    try {
        const { cli_cedula, med_num_medidor, med_longitud, med_latitud, med_estado } = req.body;
        const [rows] = await conmysql.query(
            'INSERT INTO tb_medidor (cli_cedula, med_num_medidor, med_longitud, med_latitud, med_estado) VALUES (?, ?, ?, ?, ?)',
            [cli_cedula, med_num_medidor, med_longitud, med_latitud, med_estado]
        );
        res.send({ id: rows.insertId });
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Actualizar completamente un medidor existente
export const putMedidor = async (req, res) => {
    try {
        const { id } = req.params;
        const { cli_cedula, med_num_medidor, med_longitud, med_latitud, med_estado } = req.body;
        const [result] = await conmysql.query(
            'UPDATE tb_medidor SET cli_cedula = ?, med_num_medidor = ?, med_longitud = ?, med_latitud = ?, med_estado = ? WHERE med_id = ?',
            [cli_cedula, med_num_medidor, med_longitud, med_latitud, med_estado, id]
        );

        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Medidor no encontrado' });

        const [rows] = await conmysql.query('SELECT * FROM tb_medidor WHERE med_id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Actualizar parcialmente un medidor existente
export const patchMedidor = async (req, res) => {
    try {
        const { id } = req.params;
        const { cli_cedula, med_num_medidor, med_longitud, med_latitud, med_estado } = req.body;
        const [result] = await conmysql.query(
            'UPDATE tb_medidor SET cli_cedula = IFNULL(?, cli_cedula), med_num_medidor = IFNULL(?, med_num_medidor), med_longitud = IFNULL(?, med_longitud), med_latitud = IFNULL(?, med_latitud), med_estado = IFNULL(?, med_estado) WHERE med_id = ?',
            [cli_cedula, med_num_medidor, med_longitud, med_latitud, med_estado, id]
        );

        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Medidor no encontrado' });

        const [rows] = await conmysql.query('SELECT * FROM tb_medidor WHERE med_id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Eliminar un medidor
export const deleteMedidor = async (req, res) => {
    try {
        const [rows] = await conmysql.query('DELETE FROM tb_medidor WHERE med_id = ?', [req.params.id]);
        if (rows.affectedRows <= 0) return res.status(404).json({ id: 0, message: "No pudo eliminar el medidor" });
        res.sendStatus(202);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};
