import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            const refreshToken = localStorage.getItem('refresh_token');
            const accessToken = localStorage.getItem('access_token');

            if (!refreshToken || !accessToken) {
                console.error('Токены отсутствуют в localStorage.');
                navigate('/auth');
                return;
            }

            try {
                const response = await axios.post(
                    'http://127.0.0.1:8000/api/logout/logout/',
                    { refresh: refreshToken },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                console.log('Ответ от сервера:', response.data);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');

                navigate('/auth');
            } catch (err) {
                console.error('Ошибка при выходе:', err);

                if (err.response) {
                    console.error('Данные ответа сервера:', err.response.data);
                    console.error('Статус ответа:', err.response.status);
                }
            }
        };

        logoutUser();
    }, [navigate]);

    return (
        <div className="logout-page">
            <h2>Выход из системы...</h2>
            <p>Пожалуйста, подождите, пока мы завершаем ваш сеанс.</p>
        </div>
    );
};

export default Logout;