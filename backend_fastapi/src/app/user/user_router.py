import logging
from fastapi import APIRouter, Depends
from typing import Annotated
from src.app.user.user_iservice import IUserService
from src.app.user.user_service import UserService

from src.app.authmain.util.authmain_util import get_current_user
from src.app.user.user_schema import UserLocationSchema

log = logging.getLogger()
userRouter = APIRouter(
    prefix='/user',
    tags=['User']
)

UserServiceIns = Annotated[IUserService, Depends(UserService)]
user_dependency = Annotated[dict, Depends(get_current_user)]


@userRouter.post('/send/location')
async def send_location_email(user: user_dependency,
                              location: UserLocationSchema,
                              user_service: UserServiceIns
                              ):
    await user_service.send_email_notification(user, location)
