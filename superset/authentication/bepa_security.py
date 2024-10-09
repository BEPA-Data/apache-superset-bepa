from flask_appbuilder.security.decorators import no_cache
from flask_appbuilder.utils.base import get_safe_redirect
from flask_login import login_user

from superset.security import SupersetSecurityManager
from flask_appbuilder.security.views import AuthDBView
from flask_appbuilder.views import expose
from flask import (
    redirect,
    request, g,
    url_for
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
        # response = requests.get('http://172.28.64.1:5000/', headers={"Authorization": f"Bearer {cookie_value}"}, timeout=5)

        # if response.status_code == 200:
        # user_data = response.json()
        user_data = {'id': 5, 'role': 'Admin'}
        user_id = user_data['id']  # Get the ID from the API response
        role_name = user_data['role']  # Get the role from the API response

        # Retrieve or create the user based on the ID
        user = self.appbuilder.sm.get_user_by_id(user_id)
        if not user:
            user = self.appbuilder.sm.create_user(user_id, role_name)

        login_user(user)

        print("Logged in user")
        next_url = get_safe_redirect(request.args.get("next", ""))
        return redirect(next_url)

