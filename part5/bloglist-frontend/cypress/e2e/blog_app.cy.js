describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "asd",
      username: "user2",
      password: "salasana",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);

    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login tests", function () {
    it("succeeds with correct credentials", function () {
      cy.get("input:first").type("user2");
      cy.get("input:last").type("salasana");
      cy.contains("login").click();
      cy.contains("Logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("input:first").type("user2");
      cy.get("input:last").type("sdadksadakls");
      cy.contains("login").click();
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("input:first").type("user2");
      cy.get("input:last").type("salasana");
      cy.contains("login").click();
    });

    it("A blog can be created", function () {
      cy.contains("Add new blog").click();
      cy.get("input:first").type("New blog1");
      cy.get("input").eq(1).type("meikä");
      cy.get("input:last").type("net.com");
      cy.contains("add").click();
      cy.contains("New blog");
    });

    it("A blog can be liked", function () {
      cy.contains("Add new blog").click();
      cy.get("input:first").type("New blog2");
      cy.get("input").eq(1).type("meikä");
      cy.get("input:last").type("net.com");
      cy.contains("add").click();
      cy.contains("view").click();
      cy.contains("0");
      cy.contains("like").click();
      cy.contains("1");
    });
    it("A blog can be deleted", function () {
      cy.contains("Add new blog").click();
      cy.get("input:first").type("New blog3");
      cy.get("input").eq(1).type("meikä");
      cy.get("input:last").type("net.com");
      cy.contains("add").click();
      cy.contains("view").click();
      cy.contains("remove").click();
    });
  });
});
