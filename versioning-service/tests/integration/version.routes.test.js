jest.mock("../../src/repositories/version.repository", () => ({
  createVersion: jest.fn(),
  getVersionsByFileId: jest.fn()
}));

jest.mock("../../src/kafka/producer", () => ({
  publishVersionCreated: jest.fn()
}));

const request = require("supertest");
const app = require("../../src/app");
const repository = require("../../src/repositories/version.repository");

describe("Versioning Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.SERVICE_NAME = "versioning-service";
  });

  test("GET /health returns UP", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("UP");
  });

  test("POST /versions creates version", async () => {
    repository.createVersion.mockResolvedValue({
      id: 1,
      file_id: "11111111-1111-1111-1111-111111111111",
      version_no: 1,
      metadata_json: {}
    });

    const res = await request(app)
      .post("/versions")
      .send({
        file_id: "11111111-1111-1111-1111-111111111111",
        version_no: 1,
        metadata_json: {}
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  test("GET /versions returns versions", async () => {
    repository.getVersionsByFileId.mockResolvedValue([
      {
        id: 1,
        file_id: "11111111-1111-1111-1111-111111111111",
        version_no: 1
      }
    ]);

    const res = await request(app)
      .get("/versions?file_id=11111111-1111-1111-1111-111111111111");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
  });
});