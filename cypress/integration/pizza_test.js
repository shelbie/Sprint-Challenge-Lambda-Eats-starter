describe('Select Multiple Toppings', () => {
    it('should allow multiple toppings to be selected', () => {
        cy.visit('http://localhost:3000/pizza')
        cy.get('[for="pepperoni"] > input').check().should("pepperoni")
    })  
})

describe('Add text to textarea', () => {
    it('should allow input in textarea', () => {
      cy.visit('http://localhost:3000/pizza') 
      cy.get('#instructions').type("ranch please")
    })
  })


  describe('Submit Form', () => {
    
      it('Must be able to submit form', () => {
        cy.visit('http://localhost:3000/pizza')
    cy.get('form')
        .submit()
      })
  })
