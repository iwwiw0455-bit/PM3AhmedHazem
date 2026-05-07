const pool = require("../config/db");

async function createTag(name) {
  const query = `
    INSERT INTO tags (name)
    VALUES ($1)
    RETURNING id, name
  `;

  const result = await pool.query(query, [name]);
  return result.rows[0];
}

async function attachTagToFile(file_id, tag_id) {
  const query = `
    INSERT INTO file_tags (file_id, tag_id)
    VALUES ($1, $2)
    RETURNING file_id, tag_id
  `;

  const result = await pool.query(query, [file_id, tag_id]);
  return result.rows[0];
}

module.exports = {
  createTag,
  attachTagToFile
};