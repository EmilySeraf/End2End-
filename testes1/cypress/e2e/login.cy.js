describe('Teste da Página de Login', () => {
    it('Deve exibir mensagem de sucesso ao fazer login com credenciais corretas', () => {
        cy.visit('http://127.0.0.1:5500'); 
        
        cy.contains('Login').should('be.visible');

        cy.get('#username').type('admin');
        cy.get('#password').type('1234');

        cy.get('button').click();

        cy.contains('Login realizado com sucesso!').should('be.visible');
    });

    it('Deve exibir mensagem de erro ao fazer login com credenciais incorretas', () => {
        cy.visit('http://127.0.0.1:5500'); 

        cy.get('#username').type('user');
        cy.get('#password').type('wrongpassword');

        cy.get('button').click();

        cy.contains('Credenciais inválidas!').should('be.visible');
    });
});
