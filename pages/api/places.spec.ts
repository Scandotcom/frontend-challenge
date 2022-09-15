import { db } from "../../lib/db";
import handler from "./places";
import { createMocks } from "../../testing/httpMocks";

describe("api/items", () => {
  beforeEach(async () => {
    await db.place.deleteMany();
  });

  it("creates a new item", async () => {
    const { req, res } = createMocks({
      method: "POST",
      path: "api/places",
      body: {
        name: "My place",
        lat: 51.513301,
        long: -0.098671,
      },
    });
    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);

    const resposeBody = res._getJSONData();
    expect(resposeBody.data).toEqual(
      expect.objectContaining({ name: "My place", lat: expect.any(Number) })
    );

    expect(
      await db.place.findFirst({ where: { id: resposeBody.data.id } })
    ).toEqual(expect.objectContaining({ name: "My place" }));
  });

  it("returns errors if the body is invalid", async () => {
    const { req, res } = createMocks({
      method: "POST",
      path: "api/places",
      body: {
        notAField: "Boo",
        lat: 123,
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(422);

    const { errors } = res._getJSONData();
    expect(errors).toEqual([
      "Expecting number at long but instead got: undefined",
      "Expecting string at name but instead got: undefined",
    ]);
  });

  it("responds with an error if the request method is not POST", async () => {
    const { req, res } = createMocks({
      method: "DELETE",
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
  });
});
