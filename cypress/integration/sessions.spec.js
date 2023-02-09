//use of selectors
/// <reference types="cypress"/>


describe("Sessions page", () => {
 beforeEach(() => {
    cy.visit("/conference");
    cy.get("h1").contains("View Sessions").click();
    cy.url().should("include", "/sessions");
//define aliases name for each of the buttons
//dataCy is a custom built command
        cy.get("[data-cy=AllSessions]").as("AllSessionsBtn");
        cy.get("[data-cy=Wednesday]").as("WednesdayBtn");;
        cy.get("[data-cy=Thursday]").as("ThursdayBtn");;
        cy.get("[data-cy=Friday]").as("FridayBtn");;
    });
    //1st test
 it("Should navigate to conference sessions page and view day filter buttons", () => {

//Validate that buttons to filter by day exists.
        cy.get("@AllSessionsBtn");
        cy.get("@WednesdayBtn");
        cy.get("@ThursdayBtn");
        cy.get("@FridayBtn");
    });

    //2nd new test
    it("should filter sessions and only display Wednesday sessions when Wednesday button is clicked", () => {
       //intercept
           
      // assert that a matching request has been made
       
     cy.intercept("POST", "http://localhost:4000/graphql").as("getSessionsInfo"); //won't work without the wait command
      
      cy.get("@WednesdayBtn").click();
      cy.wait(1000);
      //cy.wait("@getSessionsInfo"); //the wait is taking longer than 5000ms so will 
      
        //Assertions
        cy.get("[data-cy=day]").should("have.length", 21); //checks how many sessions have been displayed
        cy.get("[data-cy=day]").contains("Wednesday");
        cy.get("[data-cy=day]").contains("Wednesday").should("be.visible");
        cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
        cy.get("[data-cy=day]").contains("Friday").should("not.exist");
    });        
   
    //3rd new test
    it("should filter sessions and only display Thursday sessions when Thursday button is clicked", () => {
    
        cy.get("@ThursdayBtn").click();
      
        //Assertions
        cy.get("[data-cy=day]").contains("Wednesday").should("not.exist");
        cy.get("[data-cy=day]").contains("Thursday").should("be.visible");
        cy.get("[data-cy=day]").contains("Friday").should("not.exist");

    });

      //4th new test
      it("should filter sessions and only display Friday sessions when Friday button is clicked", () => {
     
        cy.get("@FridayBtn").click();
        
        //Assertions
        cy.get("[data-cy=day]").contains("Wednesday").should("not.exist");
        cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
        cy.get("[data-cy=day]").contains("Friday").should("be.visible");

     });

   //5th new test
   it("should filter sessions and only display All Sessions sessions when All Sessions button is clicked", () => {
    cy.get("@AllSessionsBtn").click();
    //Assertions
    //cy.get("[data-cy=day]").should("have.length", 215); //checks how many sessions have been displayed
    cy.get("[data-cy=day]").contains("Wednesday").should("be.visible");
    cy.get("[data-cy=day]").contains("Thursday").should("be.visible");
    cy.get("[data-cy=day]").contains("Friday").should("be.visible");

     });
 
});


