/// <reference types="cypress"/>
describe("Submit sessions", () => {
    //run before each test in this describe block,  if the commands are repeatable and you have multiple tests on one page
    beforeEach(() => {
        cy.visit("/conference");
        cy.get("h1").contains("View Sessions").click();
        cy.url().should("include", "/sessions");
        cy.get("a").contains ("Submit a Session!").click();
    
    });
    
    it("should navigate to submit sessions page", () => {
        cy.url().should("include", "/sessions/new");
    
    });
    
    it("should submit a session successfully", () => {
    
    //filling the for with session information
    cy.contains("Title").type("New session title");
    cy.contains("Description").type("This is the Second greatest session");
    cy.contains("Day").type("Monday");
    cy.contains("Level").type("Beginner");
    
    //submit the form
    cy.get("form").submit();
    
    //validate that forn was submitted successfully
    cy.contains("Session Submitted Successfully!");
    
    
      });
    });