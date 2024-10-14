from flask_appbuilder.security.decorators import has_access, no_cache
from flask_appbuilder.utils.base import get_safe_redirect, lazy_formatter_gettext
from flask_login import login_user

from werkzeug.wrappers import Response as WerkzeugResponse

from superset.authentication.bepa_authentication_server import UserData, fetch_user_info
from superset.security import SupersetSecurityManager
from flask_appbuilder.security.views import AuthDBView, _roles_custom_formatter
from flask_appbuilder.views import expose, ModelView
from flask_babel import lazy_gettext
from flask import (
    redirect,
    request, g,
)

class BEPASecurityManager(SupersetSecurityManager):

    def __init__(self, appbuilder):
        self.userdbmodelview = UserBEPAModelView
        self.authdbview = AuthBEPAView
        super(BEPASecurityManager, self).__init__(appbuilder)

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

class UserBEPAModelView(ModelView):
    route_base = "/users"

    list_title = lazy_gettext("List Users")
    show_title = lazy_gettext("Show User")
    add_title = lazy_gettext("Add User")
    edit_title = lazy_gettext("Edit User")

    label_columns = {
        "get_full_name": lazy_gettext("Full Name"),
        "first_name": lazy_gettext("First Name"),
        "last_name": lazy_gettext("Last Name"),
        "username": lazy_gettext("User Name"),
        "password": lazy_gettext("Password"),
        "active": lazy_gettext("Is Active?"),
        "email": lazy_gettext("Email"),
        "roles": lazy_gettext("Role"),
        "last_login": lazy_gettext("Last login"),
        "login_count": lazy_gettext("Login count"),
        "fail_login_count": lazy_gettext("Failed login count"),
        "created_on": lazy_gettext("Created on"),
        "created_by": lazy_gettext("Created by"),
        "changed_on": lazy_gettext("Changed on"),
        "changed_by": lazy_gettext("Changed by"),
    }

    description_columns = {
        "first_name": lazy_gettext("Write the user first name or names"),
        "last_name": lazy_gettext("Write the user last name"),
        "username": lazy_gettext(
            "Username valid for authentication on DB or LDAP, unused for OID auth"
        ),
        "active": lazy_gettext(
            "It's not a good policy to remove a user, just make it inactive"
        ),
        "email": lazy_gettext("The user's email, this will also be used for OID auth"),
        "roles": lazy_formatter_gettext(
            "The user role on the application,"
            " this will associate with a list of permissions",
            _roles_custom_formatter,
        ),
    }

    list_columns = ["first_name", "last_name", "username", "email", "active", "roles"]

    show_fieldsets = [
        (
            lazy_gettext("User info"),
            {"fields": ["username", "active", "roles", "login_count"]},
        ),
        (
            lazy_gettext("Personal Info"),
            {"fields": ["first_name", "last_name", "email"], "expanded": True},
        ),
        (
            lazy_gettext("Audit Info"),
            {
                "fields": [
                    "last_login",
                    "fail_login_count",
                    "created_on",
                    "created_by",
                    "changed_on",
                    "changed_by",
                ],
                "expanded": False,
            },
        ),
    ]

    user_show_fieldsets = [
        (
            lazy_gettext("User info"),
            {"fields": ["username", "active", "roles", "login_count"]},
        ),
        (
            lazy_gettext("Personal Info"),
            {"fields": ["first_name", "last_name", "email"], "expanded": True},
        ),
    ]
    search_columns = [
        "first_name",
        "last_name",
        "username",
        "email",
        "active",
        "roles",
        "created_on",
        "changed_on",
        "last_login",
        "login_count",
        "fail_login_count",
    ]

    add_columns = ["first_name", "last_name", "username", "active", "email", "roles"]
    edit_columns = ["roles"]
    user_info_title = lazy_gettext("Your user information")

    @expose("/userinfo/")
    @has_access
    def userinfo(self) -> WerkzeugResponse:
        item = self.datamodel.get(g.user.id, self._base_filters)
        widgets = self._get_show_widget(
            g.user.id, item, show_fieldsets=self.user_show_fieldsets
        )
        self.update_redirect()
        return self.render_template(
            self.show_template,
            title=self.user_info_title,
            widgets=widgets,
            appbuilder=self.appbuilder,
        )
