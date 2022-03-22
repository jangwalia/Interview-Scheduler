describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  // second test
  it("should navigate to Tuesday",()=>{
    cy.visit("/");
    cy.contains('[data-testid=day]','Tuesday')
    .click()
    .should("have.css", "background-color", "rgb(242, 242, 242)");
  })   
});