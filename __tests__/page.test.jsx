/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import Page from '../src/app/page'
 
describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)
 
    const heading = screen.getByRole('heading', { 
      name: /welcome to next\.js!/i, level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
})