const { parseMarkup } = require("../scraper");
const { markup } = require("./mockSite");

describe("parseMarkup function", () => {
  test("exists and is imported", () => {
    expect(parseMarkup).toBeDefined();
  });
  const result = parseMarkup(markup);
  console.log(result.links);
  test("returns an object", () => {
    expect(typeof result).toBe("object");
  });
  test("parses 54 links", () => {
    expect(result.links.length).toBe(45);
  });
});
