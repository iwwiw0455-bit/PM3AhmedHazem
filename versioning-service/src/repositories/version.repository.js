const pool = require("../config/db");

async function createVersion({ file_id, version_no, metadata_json }) {
  const query = `
    INSERT INTO file_versions (file_id, version_no, metadata_json, created_at)
    VALUES ($1, $2, $3, NOW())
    RETURNING id, file_id, version_no, metadata_json, created_at
  `;

  const result = await pool.query(query, [
    file_id,
    version_no,
    metadata_json || {}
  ]);

  return result.rows[0];
}

async function getVersionsByFileId(file_id) {
  const query = `
    SELECT id, file_id, version_no, metadata_json, created_at
    FROM file_versions
    WHERE file_id = $1
    ORDER BY version_no ASC
  `;

  const result = await pool.query(query, [file_id]);
  return result.rows;
}

module.exports = {
  createVersion,
  getVersionsByFileId
};