import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Dalle3Image from '../src/components/Dalle3Image';

describe('Dalle3Image component', () => {
  test('renders prompt input and generate button', () => {
    const { getByPlaceholderText, getByText } = render(<Dalle3Image />);
    const promptInput = getByPlaceholderText('Enter a prompt') as HTMLInputElement;
    const generateButton = getByText('Generate');
    expect(promptInput).toBeInTheDocument();
    expect(generateButton).toBeInTheDocument();
  });

  // Add more tests as needed
});
