import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
    const location = useLocation();
    const { message } = location.state || { message: 'No message available' };

    return (
        <div>
            <h1>{message}</h1>
            <p>Your request has been received!</p>
        </div>
    );
};

export default SuccessPage;
