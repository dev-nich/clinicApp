const assert = require("node:assert");
const { test, describe, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const bcrypt = require("bcrypt");
const Model = require("../../models/person");
const User = require("../../models/user");
const initialData = require("../api/mock_data/person");
const helper = require("../../utils/test_helper");
const responses = require("../../constants/responses");

const api = supertest(app);
const route = "/api/persons";

describe(`[API Test] ${route}`, () => {
  beforeEach(async () => {
    await Model.deleteMany({});
    await Model.insertMany(initialData);
  });

  test("Create item", async () => {
    const dbCollection = await helper.allDbPersons();

    const newItem = {
      first_name: "New First Name",
      middle_name: "New Middle Name",
      last_name: "New Last Name",
      address: "New Address",
      contact: "00000000000",
      gender: "F",
      suffix: " ",
      email: "test@mail.com",
      birth_date: new Date("02-02-3003"),
    };

    await api
      .post(route)
      .send(newItem)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const newDbCollection = await helper.allDbPersons();
    assert.strictEqual(newDbCollection.length, dbCollection.length + 1);

    const firstName = newDbCollection.map((u) => u.first_name);
    assert(firstName.includes(newItem.first_name));
  });

  test("Create existing item", async () => {
    const dbCollection = await helper.allDbPersons();

    const newItem = {
      first_name: "Test",
      middle_name: "Test",
      last_name: "Test",
      address: "New Address",
      contact: "00000000000",
      gender: "F",
      suffix: "Jr",
      birth_date: "02-02-2001",
      email: "test@mail.com",
    };

    const response = await api
      .post(route)
      .send(newItem)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert(response.body.error.includes(responses.ERR_VALUE_NOT_UNIQUE));
  });

  test("Update item", async () => {
    const dbCollection = await helper.allDbPersons();

    const firstItem = dbCollection[0];
    const newItem = {
      first_name: "Updated",
      middle_name: "Updated",
      last_name: "Updated",
      address: "Updated Address",
      contact: "1111111",
      gender: "M",
      suffix: "Sr",
      birth_date: "02-02-2222",
      email: "update@mail.com",
    };

    await api
      .patch(`${route}/${firstItem.id}`)
      .send(newItem)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const newDbCollection = await helper.allDbPersons();
    assert.strictEqual(newDbCollection.length, dbCollection.length);

    const firstName = newDbCollection.map((u) => u.first_name);
    assert(firstName.includes(newItem.first_name));

    const middleName = newDbCollection.map((u) => u.middle_name);
    assert(middleName.includes(newItem.middle_name));

    const lastName = newDbCollection.map((u) => u.last_name);
    assert(lastName.includes(newItem.last_name));

    const address = newDbCollection.map((u) => u.address);
    assert(address.includes(newItem.address));

    const contact = newDbCollection.map((u) => u.contact);
    assert(contact.includes(newItem.contact));

    const email = newDbCollection.map((u) => u.email);
    assert(email.includes(newItem.email));
  });

  test("Delete item", async () => {
    const dbCollection = await helper.allDbPersons();

    const firstItem = dbCollection[4];

    await api.delete(`${route}/${firstItem.id}`).expect(204);

    const newDbCollection = await helper.allDbPersons();
    assert.strictEqual(newDbCollection.length, dbCollection.length - 1);
  });
});

after(async () => {
  await mongoose.connection.close();
});
