import { useState } from 'react';
import axios from 'axios';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import SuccessPage from './components/SuccessPage';

const App = () => {
    const [formData, setFormData] = useState({ userid: '', wish: '' });
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/submit', formData);
            navigate('/success', { state: { message: response.data.message } });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('Error response:', error.response);
                console.log('Error data:', error.response?.data);
                console.log('Navigating to error page with message:', error.response?.data.error);
                navigate('/error', { state: { message: error.response?.data.error || 'Unknown error occurred' } });
            } else {
                console.log('Navigating to error page with message: An unexpected error occurred');
                navigate('/error', { state: { message: 'An unexpected error occurred' } });
            }
        }
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <div className="App">
                        <header>
                            <h1>A letter to Santa</h1>
                        </header>
                        <main>
                            <p className="bold">Ho ho ho, what you want for Christmas?</p>
                            <input
                                name="userid"
                                placeholder="charlie.brown"
                                value={formData.userid}
                                onChange={handleChange}
                            />
                            <form onSubmit={handleSubmit}>
                                what do you want for christmas?
                                <textarea
                                    name="wish"
                                    rows={10}
                                    cols={45}
                                    maxLength={100}
                                    placeholder="Gifts!"
                                    value={formData.wish}
                                    onChange={handleChange}
                                ></textarea>
                                <br />
                                <button type="submit" id="submit-letter">Send</button>
                            </form>
                        </main>
                        <footer>
                            Made with love for Santa App!
                        </footer>
                        <div className="glitchButton" style={{ position: 'fixed', top: '20px', right: '20px' }}></div>
                        <script src="https://button.glitch.me/button.js"></script>
                    </div>
                }
            />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/success" element={<SuccessPage />} />
        </Routes>
    );
};

export default App;
