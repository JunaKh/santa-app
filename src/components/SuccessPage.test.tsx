import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import SuccessPage from './SuccessPage';
import '@testing-library/jest-dom';

test('renders success message', () => {
    const initialEntries = [{ pathname: '/', state: { message: 'Wish submitted successfully!' } }];

    const { getByText } = render(
        <MemoryRouter initialEntries={initialEntries}>
            <Routes>
                <Route path="/" element={<SuccessPage />} />
            </Routes>
        </MemoryRouter>
    );

    expect(getByText(/Wish submitted successfully!/i)).toBeInTheDocument();
    expect(getByText(/Your request has been received!/i)).toBeInTheDocument();
});
