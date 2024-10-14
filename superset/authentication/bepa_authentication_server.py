import requests

from pydantic import BaseModel
from enum import Enum

class UserRole(str, Enum):
    admin = 'Admin'
    alpha = 'Alpha'
    gamma = 'Gamma'


class UserData(BaseModel):
    ID: str
    role: UserRole

def fetch_user_info(session_token: str) -> UserData:
    response = requests.get('http://172.28.64.1:5434/', headers={"Authorization": f"Bearer {session_token}"}, timeout=5)

    data = UserData.model_validate(response.json())
    return data