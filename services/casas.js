const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, renta, precio, ubicacion, foto, camas, baños 
    FROM casas LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function create(casa) {
    const result = await db.query(
        `INSERT INTO casas 
      (renta, precio , ubicacion, foto, camas, baños) 
      VALUES 
      ('${casa.casa}',
       '${casa.precio}',
        '${casa.ubicacion}',
        '${casa.foto}',
        '${casa.camas}',
        '${casa.baños}')`
    );

    let message = 'Error al crear los datos de la casa';

    if (result.affectedRows) {
        message = 'Datos de la casa creados correctamente';
    }

    return { message };
}

async function update( casa, id) {
    const result = await db.query(
        `UPDATE casas
     
       renta="${casa.renta}",
       precio="${casa.precio}",
       ubicacion="${casa.ubicacion}",
       foto="${casa.foto}",
       camas="${casa.camas}",
       baños="${casa.baños}",
      

      WHERE id=${id}`
    );

    let message = 'Error al actualizar los datos de la casa';

    if (result.affectedRows) {
        message = 'Datos de la casa actualizados correctamente';
    }

    return { message };
}

async function remove(id) {
    const result = await db.query(
        `DELETE FROM casas WHERE id=${id}`
    );

    let message = 'Error al eliminar los datos de la casa';

    if (result.affectedRows) {
        message = 'los Datos de la casa se eliminaron correctamnente';
    }

    return { message };
}

module.exports = {
    getMultiple,
    create,
    update,
    remove
}