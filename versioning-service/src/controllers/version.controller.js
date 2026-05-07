const versionService = require("../services/version.service");
const { successResponse } = require("../utils/response");
const logger = require("../observability/logger");

async function createVersion(req, res, next) {
  try {
    const version = await versionService.createVersion(req.body);

    logger.info("Version created successfully", req, {
      file_id: version.file_id,
      version_no: version.version_no
    });

    const response = successResponse(req, version, 201);
    res.status(response.statusCode).json(response.body);
  } catch (err) {
    next(err);
  }
}

async function getVersions(req, res, next) {
  try {
    const versions = await versionService.getVersionsByFileId(req.query.file_id);

    const response = successResponse(req, versions, 200);
    res.status(response.statusCode).json(response.body);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createVersion,
  getVersions
};