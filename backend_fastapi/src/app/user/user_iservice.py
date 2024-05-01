from abc import ABC, abstractmethod


class IUserService(ABC):

    @abstractmethod
    async def send_email_notification(self, user, location):
        pass
