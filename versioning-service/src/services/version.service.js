const repository = require("../repositories/version.repository");
const { publishVersionCreated } = require("../kafka/producer");

async function createVersion(input) {
  const { file_id, version_no, metadata_json } = input;

  if (!file_id) {
    const error = new Error("file_id is required");
    error.code = "FILE_ID_REQUIRED";
    error.statusCode = 400;
    throw error;
  }

  if (!version_no || Number(version_no) <= 0) {
    const error = new Error("version_no must be a positive integer");
    error.code = "INVALID_VERSION_NO";
    error.statusCode = 400;
    throw error;
  }

  try {
    const version = await repository.createVersion({
      file_id,
      version_no,
      metadata_json
    });

    await publishVersionCreated(version);

    return version;
  } catch (err) {
    if (err.code === "23505") {
      const error = new Error("Version already exists for this file");
      error.code = "DUPLICATE_VERSION";
      error.statusCode = 409;
      throw error;
    }

    throw err;
  }
}

async function getVersionsByFileId(file_id) {
  if (!file_id) {
    const error = new Error("file_id query parameter is required");
    error.code = "FILE_ID_REQUIRED";
    error.statusCode = 400;
    throw error;
  }

  return repository.getVersionsByFileId(file_id);
}

module.exports = {
  createVersion,
  getVersionsByFileId
};