import request from "supertest";
import app from "../../src/index"; // Adjust the path according to your structure

describe("GraphQL API", () => {
  it("should create a new customer and return it", async () => {
    const getCurrentTimestamp = () => new Date().toISOString();

    const newCustomer = {
      name: "John Doe",
      email: "john@example.com",
    };

    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            createCustomer(name: "${newCustomer.name}", email: "${newCustomer.email}") {
              name
              email
            }
          }
        `,
      })
      .expect(200);

    expect(response.body.data.createCustomer).toEqual(newCustomer);
  });

  it("should return an error if required fields are missing", async () => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            createCustomer(id: "", name: "", email: "") {
              id
              name
              email
            }
          }
        `,
      })
      .expect(400);

    expect(response.body.errors).toBeTruthy();
  });
});
