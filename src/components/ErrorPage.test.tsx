import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import '@testing-library/jest-dom';

test('renders error message', () => {
    const message = 'Test error message';

    const { getByText } = render(
        <MemoryRouter initialEntries={[{ pathname: '/error', state: { message } }]}>
            <Routes>
                <Route path="/error" element={<ErrorPage />} />
            </Routes>
        </MemoryRouter>
    );

    expect(getByText(/Test error message/i)).toBeInTheDocument();
});
