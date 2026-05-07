jest.mock("../../src/repositories/version.repository", () => ({
  createVersion: jest.fn(),
  getVersionsByFileId: jest.fn()
}));

jest.mock("../../src/kafka/producer", () => ({
  publishVersionCreated: jest.fn()
}));

const repository = require("../../src/repositories/version.repository");
const { publishVersionCreated } = require("../../src/kafka/producer");
const service = require("../../src/services/version.service");

describe("Versioning Service Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("creates a version successfully", async () => {
    const input = {
      file_id: "11111111-1111-1111-1111-111111111111",
      version_no: 1,
      metadata_json: { size: 100 }
    };

    const created = { id: 1, ...input };

    repository.createVersion.mockResolvedValue(created);
    publishVersionCreated.mockResolvedValue();

    const result = await service.createVersion(input);

    expect(result).toEqual(created);
    expect(repository.createVersion).toHaveBeenCalledWith(input);
    expect(publishVersionCreated).toHaveBeenCalledWith(created);
  });

  test("rejects missing file_id", async () => {
    await expect(service.createVersion({
      version_no: 1
    })).rejects.toMatchObject({
      code: "FILE_ID_REQUIRED"
    });
  });

  test("rejects invalid version_no", async () => {
    await expect(service.createVersion({
      file_id: "11111111-1111-1111-1111-111111111111",
      version_no: 0
    })).rejects.toMatchObject({
      code: "INVALID_VERSION_NO"
    });
  });

  test("rejects duplicate version", async () => {
    repository.createVersion.mockRejectedValue({
      code: "23505"
    });

    await expect(service.createVersion({
      file_id: "11111111-1111-1111-1111-111111111111",
      version_no: 1
    })).rejects.toMatchObject({
      code: "DUPLICATE_VERSION"
    });
  });

  test("gets versions by file_id", async () => {
    const rows = [
      { id: 1, file_id: "11111111-1111-1111-1111-111111111111", version_no: 1 }
    ];

    repository.getVersionsByFileId.mockResolvedValue(rows);

    const result = await service.getVersionsByFileId("11111111-1111-1111-1111-111111111111");

    expect(result).toEqual(rows);
  });
});