import re

from django.core.exceptions import ValidationError


def validate_username(username):
    forbidden_symb = re.sub(r"^[\w.@+-]+\Z", ' ', username)
    if username == 'me':
        raise ValidationError('Недопустимое имя пользователя!')
    elif username in forbidden_symb:
        raise ValidationError('Не допустимые символы в имени пользователя')
    return username


def validate_phone_number(value):
    if not re.match(r'^\+?1?\d{9,15}$', value):
        raise ValidationError('Неверный формат номера телефона')
    

def validate_password(value):
    if len(value) < 8:
        raise ValidationError('Пароль должен содержать не менее 8 символов')
    if not any(char.isdigit() for char in value):
        raise ValidationError('Пароль должен содержать хотя бы одну цифру')
    if not any(char.isalpha() for char in value):
        raise ValidationError('Пароль должен содержать хотя бы одну букву')