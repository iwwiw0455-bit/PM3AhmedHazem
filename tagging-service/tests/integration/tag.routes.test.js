jest.mock("../../src/repositories/tag.repository", () => ({
  createTag: jest.fn(),
  attachTagToFile: jest.fn()
}));

const request = require("supertest");
const app = require("../../src/app");
const repository = require("../../src/repositories/tag.repository");

describe("Tagging Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.SERVICE_NAME = "tagging-service";
  });

  test("GET /health returns UP", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("UP");
  });

  test("POST /tags creates tag", async () => {
    repository.createTag.mockResolvedValue({
      id: 1,
      name: "important"
    });

    const res = await request(app)
      .post("/tags")
      .send({
        name: "Important"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  test("POST /files/:id/tags attaches tag to file", async () => {
    repository.attachTagToFile.mockResolvedValue({
      file_id: "11111111-1111-1111-1111-111111111111",
      tag_id: 1
    });

    const res = await request(app)
      .post("/files/11111111-1111-1111-1111-111111111111/tags")
      .send({
        tag_id: 1
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });
});