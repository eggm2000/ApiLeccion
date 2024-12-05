import { conmysql } from '../db.js';

// Obtener todos los consumos
export const getConsumos = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM tb_consumo');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar consumos" });
    }
};

// Obtener un consumo específico por ID
export const getConsumoById = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM tb_consumo WHERE con_id = ?', [req.params.id]);
        if (result.length <= 0) return res.status(404).json({
            con_id: 0,
            message: "Consumo no encontrado"
        });
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Crear un nuevo consumo
export const postConsumo = async (req, res) => {
    try {
        const { med_id, mes, anio, consumo, longitudToma, latitudToma } = req.body;
        const [rows] = await conmysql.query(
            'INSERT INTO tb_consumo (med_id, mes, anio, consumo, longitudToma, latitudToma) VALUES (?, ?, ?, ?, ?, ?)',
            [med_id, mes, anio, consumo, longitudToma, latitudToma]
        );
        res.send({ id: rows.insertId });
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Actualizar completamente un consumo existente
export const putConsumo = async (req, res) => {
    try {
        const { id } = req.params;
        const { med_id, mes, anio, consumo, longitudToma, latitudToma } = req.body;
        const [result] = await conmysql.query(
            'UPDATE tb_consumo SET med_id = ?, mes = ?, anio = ?, consumo = ?, longitudToma = ?, latitudToma = ? WHERE con_id = ?',
            [med_id, mes, anio, consumo, longitudToma, latitudToma, id]
        );

        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Consumo no encontrado' });

        const [rows] = await conmysql.query('SELECT * FROM tb_consumo WHERE con_id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Actualizar parcialmente un consumo existente
export const patchConsumo = async (req, res) => {
    try {
        const { id } = req.params;
        const { med_id, mes, anio, consumo, longitudToma, latitudToma } = req.body;
        const [result] = await conmysql.query(
            'UPDATE tb_consumo SET med_id = IFNULL(?, med_id), mes = IFNULL(?, mes), anio = IFNULL(?, anio), consumo = IFNULL(?, consumo), longitudToma = IFNULL(?, longitudToma), latitudToma = IFNULL(?, latitudToma) WHERE con_id = ?',
            [med_id, mes, anio, consumo, longitudToma, latitudToma, id]
        );

        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Consumo no encontrado' });

        const [rows] = await conmysql.query('SELECT * FROM tb_consumo WHERE con_id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Eliminar un consumo
export const deleteConsumo = async (req, res) => {
    try {
        const [rows] = await conmysql.query('DELETE FROM tb_consumo WHERE con_id = ?', [req.params.id]);
        if (rows.affectedRows <= 0) return res.status(404).json({ id: 0, message: "No pudo eliminar el consumo" });
        res.sendStatus(202);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};
