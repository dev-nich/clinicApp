const assert = require("node:assert");
const { test, describe, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const Model = require("../../models/position");
const initialData = require("../api/mock_data/position");
const helper = require("../../utils/test_helper");
const responses = require("../../constants/responses");

const api = supertest(app);
const route = "/api/positions";

describe(`[API Test] ${route}`, () => {
  beforeEach(async () => {
    await Model.deleteMany({});
    await Model.insertMany(initialData);
  });

  test("Create item", async () => {
    const dbCollection = await helper.allDbPositions();

    const newItem = {
      title: "new title",
      description: "new description",
    };

    await api
      .post(route)
      .send(newItem)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const newDbCollection = await helper.allDbPositions();
    assert.strictEqual(newDbCollection.length, dbCollection.length + 1);

    const titles = newDbCollection.map((u) => u.title);
    assert(titles.includes(newItem.title));
  });

  test("Create existing item", async () => {
    const dbCollection = await helper.allDbPositions();

    const newItem = {
      title: "Physical Therapy Assistant",
    };

    const response = await api
      .post(route)
      .send(newItem)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    console.log(response.body.error);

    assert(response.body.error.includes(responses.ERR_VALUE_NOT_UNIQUE));
  });

  test("Update item", async () => {
    const dbCollection = await helper.allDbPositions();
    const firstItem = dbCollection[0];
    const newItem = {
      title: "updated title",
    };

    await api
      .patch(`${route}/${firstItem.id}`)
      .send(newItem)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const newDbCollection = await helper.allDbPositions();
    assert.strictEqual(newDbCollection.length, dbCollection.length);

    const titles = newDbCollection.map((u) => u.title);
    assert(titles.includes(newItem.title));
  });

  test("Delete item", async () => {
    const dbCollection = await helper.allDbPositions();
    const firstItem = dbCollection[0];

    await api.delete(`${route}/${firstItem.id}`).expect(204);

    const newDbCollection = await helper.allDbPositions();
    assert.strictEqual(newDbCollection.length, dbCollection.length - 1);
  });
});

after(async () => {
  await mongoose.connection.close();
});
