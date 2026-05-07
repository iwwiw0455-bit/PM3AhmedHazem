const repository = require("../repositories/tag.repository");

async function createTag(input) {
  const { name } = input;

  if (!name || String(name).trim().length < 2) {
    const error = new Error("Tag name must be at least 2 characters");
    error.code = "INVALID_TAG_NAME";
    error.statusCode = 400;
    throw error;
  }

  try {
    return await repository.createTag(String(name).trim().toLowerCase());
  } catch (err) {
    if (err.code === "23505") {
      const error = new Error("Tag already exists");
      error.code = "DUPLICATE_TAG";
      error.statusCode = 409;
      throw error;
    }

    throw err;
  }
}

async function attachTagToFile(input) {
  const { file_id, tag_id } = input;

  if (!file_id) {
    const error = new Error("file_id is required");
    error.code = "FILE_ID_REQUIRED";
    error.statusCode = 400;
    throw error;
  }

  if (!tag_id) {
    const error = new Error("tag_id is required");
    error.code = "TAG_ID_REQUIRED";
    error.statusCode = 400;
    throw error;
  }

  try {
    return await repository.attachTagToFile(file_id, tag_id);
  } catch (err) {
    if (err.code === "23505") {
      const error = new Error("Tag is already attached to this file");
      error.code = "DUPLICATE_FILE_TAG";
      error.statusCode = 409;
      throw error;
    }

    throw err;
  }
}

module.exports = {
  createTag,
  attachTagToFile
};