from fastapi import APIRouter, Depends, Form, HTTPException
from typing import Annotated
from starlette import status
from src.app.authmain.authmain_schema import AuthResponse, UserRespSchema, Token
from src.app.authmain.util.authmain_util import get_current_user
from src.app.authmain.authmain_iservice import IAuthMainService
from src.app.authmain.authmain_service import AuthMainService
from src.app.shared.response import Response
from src.app.user.user_schema import CreateUserRequest
from src.app.config.db_config import db_dependency

authMainRouter = APIRouter(
    prefix='/auth/main',
    tags=['AuthMain']
)
AuthMainServiceIns = Annotated[IAuthMainService, Depends(AuthMainService)]
user_dependency = Annotated[dict, Depends(get_current_user)]


@authMainRouter.post("/register/person", status_code=status.HTTP_201_CREATED, response_model=Response[AuthResponse])
async def create_user(
        create_user_request: CreateUserRequest,
        db: db_dependency,
        service: AuthMainServiceIns
):
    return Response[AuthResponse](body=await service.reg_user(create_user_request, db))


@authMainRouter.post("/login/user", status_code=status.HTTP_202_ACCEPTED,
                     response_model=Response[AuthResponse[UserRespSchema]])
async def login(email: Annotated[str, Form()],
                password: Annotated[str, Form()],
                db: db_dependency,
                service: AuthMainServiceIns):
    user_auth = await service.auth_user(email, password, db)
    return Response[AuthResponse[UserRespSchema]](body=user_auth)


@authMainRouter.post("/token", response_model=Token)
async def login_for_access_token(
        username: Annotated[str, Form()],
        password: Annotated[str, Form()],
        service: AuthMainServiceIns,
        db: db_dependency):
    return service.login_get_access_token(username, password, db)


@authMainRouter.get("/get/current/user", status_code=status.HTTP_200_OK)
async def read_all(user: user_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    return user
