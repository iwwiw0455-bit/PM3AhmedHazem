const express = require("express");
const controller = require("../controllers/version.controller");

const router = express.Router();
/**
 * @swagger
 * /versions:
 *   post:
 *     summary: Create a new file version
 *     tags:
 *       - Versioning
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - file_id
 *               - version_no
 *             properties:
 *               file_id:
 *                 type: string
 *               version_no:
 *                 type: integer
 *               metadata_json:
 *                 type: object
 *     responses:
 *       201:
 *         description: Version created successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Duplicate version
 */
router.post("/versions", controller.createVersion);

/**
 * @swagger
 * /versions:
 *   get:
 *     summary: Get versions by file_id
 *     tags:
 *       - Versioning
 *     parameters:
 *       - in: query
 *         name: file_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of versions
 *       400:
 *         description: Missing file_id
 */
router.get("/versions", controller.getVersions);
router.post("/versions", controller.createVersion);
router.get("/versions", controller.getVersions);

module.exports = router;