from flask_appbuilder.security.decorators import no_cache
from flask_appbuilder.utils.base import get_safe_redirect
from flask_login import login_user

from superset.authentication.bepa_authentication_server import UserData, fetch_user_info
from superset.security import SupersetSecurityManager
from flask_appbuilder.security.views import AuthDBView
from flask_appbuilder.views import expose
from flask import (
    redirect,
    request, g,
)

class BEPASecurityManager(SupersetSecurityManager):

    def __init__(self, appbuilder):
        super(BEPASecurityManager, self).__init__(appbuilder)
        self.authdbview = AuthBEPAView

class AuthBEPAView(AuthDBView):

    @expose('/login/', methods=['GET', 'POST'])
    @no_cache
    def login(self, flag=True):
        if g.user is not None and g.user.is_authenticated:
            print("User already authenticated")
            return redirect(self.appbuilder.get_url_for_index)

        # Call API to get the user ID and role using the cookie
        # cookie_value = request.cookies["bepa_session"]
        cookie_value = "test_cookie"
        user_data: UserData = fetch_user_info(cookie_value)

        user_id = user_data.ID  # Get the ID from the API response
        role_name = user_data.role  # Get the role from the API response

        # Retrieve or create the user based on the ID
        user = self.appbuilder.sm.get_user_by_id(user_id)
        if not user:
            user = self.appbuilder.sm.create_user(user_id, role_name)

        # Check if user has correct role
        correct_roles = [role for role in user.roles if role.name == role_name]
        if len(correct_roles) == 0:
            self.appbuilder.sm.change_user_external_role(user_id, role_name)

        login_user(user)

        next_url = get_safe_redirect(request.args.get("next", ""))
        return redirect(next_url)

