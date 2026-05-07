jest.mock("../../src/repositories/tag.repository", () => ({
  createTag: jest.fn(),
  attachTagToFile: jest.fn()
}));

const repository = require("../../src/repositories/tag.repository");
const service = require("../../src/services/tag.service");

describe("Tagging Service Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("creates tag successfully", async () => {
    repository.createTag.mockResolvedValue({
      id: 1,
      name: "important"
    });

    const result = await service.createTag({
      name: "Important"
    });

    expect(result).toEqual({
      id: 1,
      name: "important"
    });

    expect(repository.createTag).toHaveBeenCalledWith("important");
  });

  test("rejects empty tag name", async () => {
    await expect(service.createTag({
      name: ""
    })).rejects.toMatchObject({
      code: "INVALID_TAG_NAME"
    });
  });

  test("rejects duplicate tag", async () => {
    repository.createTag.mockRejectedValue({
      code: "23505"
    });

    await expect(service.createTag({
      name: "important"
    })).rejects.toMatchObject({
      code: "DUPLICATE_TAG"
    });
  });

  test("attaches tag to file successfully", async () => {
    const relation = {
      file_id: "11111111-1111-1111-1111-111111111111",
      tag_id: 1
    };

    repository.attachTagToFile.mockResolvedValue(relation);

    const result = await service.attachTagToFile(relation);

    expect(result).toEqual(relation);
  });

  test("rejects duplicate file tag relation", async () => {
    repository.attachTagToFile.mockRejectedValue({
      code: "23505"
    });

    await expect(service.attachTagToFile({
      file_id: "11111111-1111-1111-1111-111111111111",
      tag_id: 1
    })).rejects.toMatchObject({
      code: "DUPLICATE_FILE_TAG"
    });
  });
});