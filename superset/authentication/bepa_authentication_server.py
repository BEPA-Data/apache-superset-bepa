import requests

from pydantic import BaseModel
from enum import Enum

BEPA_AUTH_URL = "http://172.28.64.1:5434/"


class UserRole(str, Enum):
    admin = 'Admin'
    alpha = 'Alpha'
    gamma = 'Gamma'


class UserData(BaseModel):
    ID: str
    role: UserRole

def fetch_user_info(session_token: str) -> UserData:
    response = requests.get(BEPA_AUTH_URL, headers={"Authorization": f"Bearer {session_token}"}, timeout=5)

    data = UserData.model_validate(response.json())
    return data