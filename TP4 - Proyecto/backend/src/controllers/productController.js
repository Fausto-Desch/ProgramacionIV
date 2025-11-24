const { db } = require("../config/database");

const getProducts = (req, res) => {
  const categoria = req.query.category;
  const busqueda = req.query.search;

  // Lista de patrones peligrosos para bloquear inyeccion sql
  const patronesPeligrosos = ["'", "--", ";"];

  // Esta funcion detecta si un texto contiene patrones peligrosos
  const inyeccionSql = (texto) => {
    if (!texto) return false;
    const t = texto.toLowerCase();
    return patronesPeligrosos.some((p) => t.includes(p.trim()));
  };

  // Usamos la funcion para detectar posibles patrones peligrosos en categoria y busqueda
  if (inyeccionSql(categoria) || inyeccionSql(busqueda)) {
    return res.status(200).json([]);
  }

  // Construimos una consulta usando prepared statements
  let sql = "SELECT * FROM products WHERE 1 = 1";
  let params = [];

  if (categoria) {
    sql += " AND category = ?";
    params.push(categoria);
  }

  if (busqueda) {
    sql += " AND name LIKE ?";
    params.push("%" + busqueda + "%");
  }

  // Ejecutamos consulta parametrizada
  db.query(sql, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error en el servidor" });
    }

    return res.status(200).json(results);
  });
};

module.exports = { getProducts };
