const supertest = require("supertest");
const app = require("../index");
const superApp = supertest(app);
const fs = require("fs");

const someCoffees = [
  {
    name: "Tumma paahto",
    weight: 300,
    price: 5.5,
    roast: 5,
  },
  {
    name: "Kulta Mogga",
    weight: 600,
    price: 1.5,
    roast: 2,
  },
];

beforeEach(async () => {
  fs.writeFileSync("./coffeesTest.json", "[]");
  await superApp.post("/api/coffees").send(someCoffees[0]);
  await superApp.post("/api/coffees").send(someCoffees[1]);
});

describe("Coffee routes", () => {
  test("get route returns correct coffees", async () => {
    const response = await superApp
      .get("/api/coffees")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const { body } = response;

    expect(body).toHaveLength(2);
    expect(body[0].name).toEqual("Tumma paahto");
  });

  test("post route adds new coffee with id when valid data is sent", async () => {
    await superApp
      .post("/api/coffees")
      .send({
        name: "Paulig",
        weight: 100,
        price: 3.4,
        roast: 3,
      })
      .expect(200);

    const response = await superApp.get("/api/coffees");
    const { body } = response;

    expect(body).toHaveLength(3);
    expect(body[2].name).toEqual("Paulig");
    expect(body[2]).toHaveProperty("id");
  });

  test("post route doesn't add new coffee if request is malformed", async () => {
    await superApp
      .post("/api/coffees")
      .send({
        name: "Bad coffee",
        weight: 100,
      })
      .expect(400);

    const response = await superApp.get("/api/coffees");
    const { body } = response;
    expect(body).toHaveLength(2);
  });
});

describe("Unkown endpoint", () => {
  test("correct status is returned for nonexisting route", async () => {
    await superApp.get("/api/kukkaruukku").expect(404);
  });
});

afterAll(() => {
  fs.writeFileSync("./coffeesTest.json", "[]");
});
