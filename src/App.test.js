/* eslint-disable semi */
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  render(<App />)
  // eslint-disable-next-line semi
  const linkElement = screen.getByText(/learn react/i)
  // eslint-disable-next-line semi
  expect(linkElement).toBeInTheDocument()
})
