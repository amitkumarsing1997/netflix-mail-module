from sqlalchemy.orm import Session
from src.app.authmain.authmain_schema import AuthResponse, UserRespSchema
from fastapi import HTTPException
from src.app.authmain.authmain_schema import Token
from src.app.authmain.authmain_iservice import IAuthMainService
from src.app.authmain.authmain_repo import AuthMainRepo
from src.app.user.user_schema import CreateUserRequest


class AuthMainService(IAuthMainService):

    def __init__(self):
        pass

    async def reg_user(self, create_user_request: CreateUserRequest, db: Session) -> AuthResponse[str]:
        return AuthResponse[str](content=await AuthMainRepo.create_user(create_user_request, db))

    async def auth_user(self, email: str, password: str, db: Session) -> AuthResponse[UserRespSchema]:
        user_obj = AuthMainRepo.authenticate_user(email, password, db)
        if not user_obj:
            raise HTTPException(status_code=401, detail="Authentication Failed.")

        user_resp_sch = UserRespSchema(
            id=user_obj.id,
            first_name=user_obj.first_name,
            last_name=user_obj.last_name,
            email=user_obj.email,
            mob_no=user_obj.mob_no

        )

        return AuthResponse[UserRespSchema](content=user_resp_sch)

    def login_get_access_token(self, email: str, password: str, db: Session) -> Token:
        token_details = AuthMainRepo.login_get_access_token(email, password, db)
        token_obj = Token(access_token=token_details.get("user_token"),
                          token_type="bearer",
                          user_email=email,
                          user_name=token_details.get("user_name"))
        return token_obj
