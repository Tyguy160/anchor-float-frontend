const { parseMarkup } = require("../scraper");
const { markup } = require("./mockSite");

describe("parseMarkup function", () => {
  test("exists and is imported", () => {
    expect(parseMarkup).toBeDefined();
  });
  test("returns true", () => {
    expect(parseMarkup(markup)).toBe(true);
  });
});
