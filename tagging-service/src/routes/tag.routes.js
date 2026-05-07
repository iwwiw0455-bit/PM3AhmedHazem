const express = require("express");
const controller = require("../controllers/tag.controller");

const router = express.Router();

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Create a new tag
 *     tags:
 *       - Tagging
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tag created successfully
 *       400:
 *         description: Invalid tag name
 *       409:
 *         description: Duplicate tag
 */
router.post("/tags", controller.createTag);

/**
 * @swagger
 * /files/{id}/tags:
 *   post:
 *     summary: Attach a tag to a file
 *     tags:
 *       - Tagging
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: File ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tag_id
 *             properties:
 *               tag_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tag attached successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Duplicate file tag
 */
router.post("/files/:id/tags", controller.attachTagToFile);

router.post("/tags", controller.createTag);
router.post("/files/:id/tags", controller.attachTagToFile);

module.exports = router;