describe("Tickets" , () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));
   
    it("fil all the text input fields", () => {
        const firstName = "Lucas"
        const lastName = "Casanova"

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("qalenium@test.com");
        cy.get("#requests").type("Any Type Here");
        cy.get("#signature").type(`${firstName} ${lastName}`);
    });
    
    it("select two tickets", () => {
        cy.get("#ticket-quantity").select("2");
    });

    it("select 'vip' ticket type", () => {
        // what's is the difference between click and check?
        cy.get('#vip').click();   
        cy.get('#vip').check();
    });

    it("selects 'social media' checkbox",() => {
        cy.get('#social-media').check();
    });

    it("selects 'friend', and 'publication', then uncheck 'friend'", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get('#friend').uncheck();
    });

    it("has 'TICKETBOX' header's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX")
    });

    it("alerts on invalid email", () => {
        //validate email is invalid
        cy.get("#email")
        //this is an alias
        //the alias reserves the current status of the component, it cannot be reused
          .as("email")
          .type("email-invalid.com");

        cy.get("@email.invalid").should("exist")

        //validate email is valid
        cy.get("@email")
          .clear()
          .type("email@valid.com")

        cy.get("#email.invalid").should("not.exist")

    });

    it("fill and reset the form", () => {
        const firstName = "Lucas";
        const lastName = "Casanova";
        const fullName = `${firstName} ${lastName}`;

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("email@valid.com");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#requests").type("IPA Beer");

        cy.get(".agreement p")
          .should("contain", 
          `I, ${fullName}, wish to buy 2 VIP tickets.`
        );

        cy.get("#agree").click();
        cy.get("#signature").type(fullName);

        cy.get("button[type='submit']")
          .as("submitButton")
          .should("not.be.disabled");

        cy.get("button[type='reset']").click();

        cy.get("@submitButton").should("be.disabled");

    });

    it("Fill only mandatory fields using support command", () => {
        const customer = {
            firstName: "João",
            lastName: "Das Cove",
            email: "joaodascoveemail@teste.com"
        };

        cy.fillAllMandatoryFields(customer);

        cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled");

        cy.get("#agree").uncheck();

        cy.get("@submitButton").should("be.disabled");
    });
});