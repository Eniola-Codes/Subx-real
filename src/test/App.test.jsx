import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import LandingPage from '../routes/LandingPage';
import DeveloperSignup from '../routes/signup/developer';
import InvestorSignup from '../routes/signup/investor';

describe('App Component', () => {
  test('renders landing page by default', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText(/Connect Developers/i)).toBeInTheDocument();
  });
});

describe('LandingPage Component', () => {
  test('renders developer and investor signup buttons', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/I'm a Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/I'm an Investor/i)).toBeInTheDocument();
  });
});

describe('DeveloperSignup Component', () => {
  test('renders signup form fields', () => {
    render(
      <BrowserRouter>
        <DeveloperSignup />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Website/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bio/i)).toBeInTheDocument();
  });
});

describe('InvestorSignup Component', () => {
  test('renders signup form fields', () => {
    render(
      <BrowserRouter>
        <InvestorSignup />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Investment Interests/i)).toBeInTheDocument();
  });
}); 