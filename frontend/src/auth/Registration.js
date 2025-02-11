import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        middle_name: '',
        email: '',
        telephone: '',
        date_of_birth: null,
        profile_photo: null,
        role: 'student',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            profile_photo: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = new FormData();
            data.append('username', formData.username);
            data.append('password', formData.password);
            data.append('first_name', formData.first_name);
            data.append('last_name', formData.last_name);
            data.append('middle_name', formData.middle_name);
            data.append('email', formData.email);
            data.append('telephone', formData.telephone);
            data.append('date_of_birth', formData.date_of_birth);
            data.append('role', formData.role);
            if (formData.profile_photo) {
                data.append('profile_photo', formData.profile_photo);
            }

            const endpoint = formData.role === 'teacher' 
                ? 'http://127.0.0.1:8000/api/users/teacher_create/' 
                : 'http://127.0.0.1:8000/api/users/student_create/';

            const response = await axios.post(endpoint, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                navigate('/auth');
            }
        } catch (err) {
            setError('Ошибка при регистрации. Проверьте введенные данные.');
            console.error(err);
        }
    };

    return (
        <div className="registration-form">
            <h2>Регистрация</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Логин:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Имя:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Фамилия:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Отчество:</label>
                    <input
                        type="text"
                        name="middle_name"
                        value={formData.middle_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Почта:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Телефон:</label>
                    <input
                        type="text"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Дата рождения:</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    />
                </div>
                <div>
                    <label>Фото профиля:</label>
                    <input
                        type="file"
                        name="profile_photo"
                        onChange={handleFileChange}
                    />
                </div>
                <div>
                    <label>Роль:</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="student">Студент</option>
                        <option value="teacher">Учитель</option>
                    </select>
                </div>
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Registration;