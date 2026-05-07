const tagService = require("../services/tag.service");
const { successResponse } = require("../utils/response");
const logger = require("../observability/logger");

async function createTag(req, res, next) {
  try {
    const tag = await tagService.createTag(req.body);

    logger.info("Tag created successfully", req, {
      tag_id: tag.id,
      name: tag.name
    });

    const response = successResponse(req, tag, 201);
    res.status(response.statusCode).json(response.body);
  } catch (err) {
    next(err);
  }
}

async function attachTagToFile(req, res, next) {
  try {
    const result = await tagService.attachTagToFile({
      file_id: req.params.id,
      tag_id: req.body.tag_id
    });

    logger.info("Tag attached to file successfully", req, result);

    const response = successResponse(req, result, 201);
    res.status(response.statusCode).json(response.body);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createTag,
  attachTagToFile
};