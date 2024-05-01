from datetime import datetime
from src.app.user.user_iservice import IUserService
from src.app.user.util.emailjinjaofficial import send_with_template


class UserService(IUserService):

    async def send_email_notification(self, user, location):
        print("in location-----")
        print(location)
        print(location.email)

        token_dict = {
            "name": location.name,
            "email": location.email,
            "longitude": location.longitude,
            "latitude": location.latitude,
            "time": datetime.now().strftime("%H:%M:%S")

        }
        await send_with_template(token_dict)


