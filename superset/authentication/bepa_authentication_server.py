import requests

from pydantic import BaseModel
from enum import Enum
from flask import Flask


class UserRole(str, Enum):
    admin = 'Admin'
    alpha = 'Alpha'
    gamma = 'Gamma'


class UserData(BaseModel):
    ID: str
    role: UserRole

def fetch_user_info(session_token: str, app: Flask) -> UserData | None:
    BEPA_AUTH_URL = app.config["BEPA_AUTH_URL"]

    try:
        response = requests.get(BEPA_AUTH_URL, headers={"Authorization": f"Bearer {session_token}"}, timeout=5)

        if response.status_code == 200:
            data = UserData.model_validate(response.json())
            return data
        else:
            return None
    
    except:
        return None