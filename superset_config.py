SECRET_KEY = "ZpLHFj6WXeMKhF936AAPxfgtYn4FnkgxEhfkulnvpZDkLtOQW67h3aQy"

# from superset.authentication.bepa_security import BEPASecurityManager
# CUSTOM_SECURITY_MANAGER = BEPASecurityManager

BEPA_AUTH_URL = "http://172.28.64.1:5434/"

# ZITADEL_CLIENT_ID = "304789429959065603"

# from flask_appbuilder.security.manager import AUTH_OAUTH
# # Set the AUTH_OAUTH type to OAuth
# AUTH_TYPE = AUTH_OAUTH

# # OPENID_PROVIDERS = [
# #     { 'name': 'Zitadel', 'url': 'http://172.28.64.1:8080/oidc/v1/' },
# # ]

# OAUTH_PROVIDERS = [
#     {
#         'name': 'zitadel',
#         'icon': 'fa-zitadel',
#         "token_key": "code",
#         "remote_app": {
#             "client_id": ZITADEL_CLIENT_ID,
#             "api_base_url": "http://localhost:8080",
#             "client_kwargs": {
#                 "scope": "email profile openid",
#             },
#             "request_token_url": None,
#             "access_token_url": "http://localhost:8080/oauth/v2/token",
#             "authorize_url": "http://localhost:8080/oauth/v2/authorize",
#         },
#     }
# ]
