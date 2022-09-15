import { db } from "../../../lib/db";
import handler from "./[id]";
import { createMocks } from "../../../testing/httpMocks";

beforeEach(async () => {
  await db.place.deleteMany();
});

describe("PUT api/items/:id", () => {
  it("updates an existing item", async () => {
    const item = await db.place.create({
      data: { name: "My place", lat: 51.513301, long: -0.098671 },
    });

    const { req, res } = createMocks({
      method: "PUT",
      path: `/api/items/${item.id}`,
      query: { id: item.id },
      body: { name: "Foo place" },
    });
    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);

    const responseBody = res._getJSONData();
    expect(responseBody.data).toEqual(
      expect.objectContaining({ name: "Foo place" })
    );

    expect(await db.place.findFirst({ where: { id: item.id } })).toEqual(
      expect.objectContaining({ name: "Foo place" })
    );
  });

  it("responds with an error if the payload is invalid", async () => {
    const place = await db.place.create({
      data: { name: "My place", lat: 51.513301, long: -0.098671 },
    });

    const { req, res } = createMocks({
      method: "PUT",
      path: `/api/places/${place.id}`,
      query: { id: place.id },
      body: { long: "123" },
    });
    await handler(req, res);

    expect(res._getStatusCode()).toBe(422);

    const responseBody = res._getJSONData();
    expect(responseBody.errors).toEqual([
      'Expecting number at long but instead got: "123"',
    ]);

    expect(await db.place.findFirst({ where: { id: place.id } })).toEqual(
      expect.objectContaining({
        name: "My place",
      })
    );
  });

  it("responds with an error if no place exists", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      path: "/api/places/not-a-real-id",
      query: { id: "not-a-real-id" },
      body: { name: "Foo" },
    });
    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);

    const responseBody = res._getJSONData();
    expect(responseBody.errors).toEqual(["Record to update not found."]);
  });
});

describe("DELETE api/places/:id", () => {
  it("deletes an existing place", async () => {
    const place = await db.place.create({
      data: { name: "My place", lat: 51.513301, long: -0.098671 },
    });

    const { req, res } = createMocks({
      method: "DELETE",
      path: `/api/places/${place.id}`,
      query: { id: place.id },
    });
    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);

    expect(await db.place.count({ where: { id: place.id } })).toBe(0);
  });

  it("responds with a error if the item does not exist", async () => {
    const { req, res } = createMocks({
      method: "DELETE",
      path: `/api/items/not-a-real-id`,
      query: { id: "not-a-real-id" },
    });
    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });
});
