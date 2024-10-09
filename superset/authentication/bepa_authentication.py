from flask import Flask, g, request

from superset import security_manager


class BepaAuthentication:
    @staticmethod
    def init_app(app: Flask) -> None:
        @app.before_request
        def authenticate_bepa():
            if not g.user:
                cookie_value = request.cookies.get(
                    'session_token')  # Replace with your cookie name
                if cookie_value:
                    user = security_manager.authenticate_with_cookie(cookie_value)
                    if user:
                        g.user = user
