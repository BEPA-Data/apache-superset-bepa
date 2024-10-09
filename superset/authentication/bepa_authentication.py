from flask import Flask, g, request, session
from flask_login import login_user

from superset.extensions import security_manager


class BepaAuthentication:
    @staticmethod
    def init_app(app: Flask) -> None:
        return
        @app.before_request
        def authenticate_bepa():
            user_id = session.get("_user_id")
            print("Is there a user? " + str(user_id))

            if user_id:
                user = security_manager.get_user_by_id(user_id)
                if user:
                    print(user)
                    g.user = user
