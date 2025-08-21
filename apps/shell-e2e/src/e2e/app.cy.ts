import { getGreeting } from '../support/app.po';

describe('shell-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.contains('p', 'AngularComponents works!');
  });

  it('should navigate to microfrontend', () => {
    cy.visit('/microfrontend-one');
    cy.contains('Welcome microfrontend-one');
  });
});
