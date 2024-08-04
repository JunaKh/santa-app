import { useLocation } from 'react-router-dom';

const ErrorPage = () => {
    const location = useLocation();
    const { message } = location.state || { message: 'No message available' };

    console.log('ErrorPage rendered with message:', message);

    return (
        <div>
            <h1>Error</h1>
            <p>{message}</p>
        </div>
    );
};

export default ErrorPage;
