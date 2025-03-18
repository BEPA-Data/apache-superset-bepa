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
    email: str
    firstname: str
    lastname: str
    role: UserRole
    username: str

def fetch_user_info(app: Flask) -> UserData | None:
    BEPA_AUTH_URL = app.config["BEPA_AUTH_URL"]
    BEPA_USERINFO_URL = app.config["BEPA_USERINFO_URL"]
    BEPA_AUTH_PROJECT_ID = app.config["BEPA_AUTH_PROJECT_ID"]

    try:
        response = requests.get(BEPA_AUTH_URL, timeout=5)
        if response.status_code == 200:
            access_token = response.headers.get("x-auth-request-access-token")
        else:
            return None
    except:
        return None
    
    try:
        response = requests.get(BEPA_USERINFO_URL, headers={"Authorization": f"Bearer {access_token}"}, timeout=5)
        if response.status_code == 200:
            userinfo = response.json()
            rolekey = f"urn:zitadel:iam:org:project:{BEPA_AUTH_PROJECT_ID}:roles"
            userroles = userinfo.get(rolekey, {})
            # Check if the roles contains admin
            if UserRole.admin.value.lower() in userroles:
                role = UserRole.admin

            user = UserData(
                ID=userinfo.get("sub"), 
                role=role,
                email=userinfo.get("email"),
                firstname=userinfo.get("given_name"),
                lastname=userinfo.get("family_name"),
                username=userinfo.get("preferred_username")
            )
            return user
        else:
            return None
    except:
        return None
