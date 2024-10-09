from superset.security import SupersetSecurityManager
from flask_appbuilder.security.views import AuthDBView
from flask_appbuilder.views import expose
from flask import (
    redirect,
    url_for, g, session
)

class BEPASecurityManager(SupersetSecurityManager):

    def __init__(self, appbuilder):
        super(BEPASecurityManager, self).__init__(appbuilder)
        self.authdbview = AuthBEPAView

class AuthBEPAView(AuthDBView):

    @expose('/login/', methods=['GET', 'POST'])
    def login(self, flag=True):
        return redirect(url_for('dashboard'))

    @expose('/logout/', methods=['GET', 'POST'])
    def logout(self):
        session.pop('user_id', None)
        g.user = None
        return redirect(url_for('login'))

