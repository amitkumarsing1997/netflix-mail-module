from datetime import timedelta
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from src.app.config.authkey import bcrypt_context
from src.app.models.models import Users
from src.app.user.user_schema import CreateUserRequest
from src.app.authmain.util.authmain_util import create_access_token


class AuthMainRepo:
    @staticmethod
    async def create_user(create_user_request: CreateUserRequest, db: Session) -> str:

        create_user_model = Users(
            email=create_user_request.email,
            first_name=create_user_request.first_name,
            last_name=create_user_request.last_name,
            mob_no=create_user_request.mob_no,
            hashed_password=bcrypt_context.hash(create_user_request.password)

        )

        # first check if email is already present in db or not
        user_email = db.query(Users).filter(Users.email == create_user_request.email).first()
        if user_email:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail='Email already registered')
        user_mobno = db.query(Users).filter(Users.mob_no == create_user_request.mob_no).first()
        if user_mobno:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail='Mob-No already registered')
        db.add(create_user_model)
        db.commit()
        return "hi amit data successfully inserted"

    @staticmethod
    def authenticate_user(email: str, password: str, db: Session) -> Users | bool:
        user = db.query(Users).filter(Users.email == email).first()
        if not user:
            return False
        if not bcrypt_context.verify(password, user.hashed_password):
            return False
        return user

    @staticmethod
    def login_get_access_token(email: str, password: str, db: Session) -> dict[str, str]:
        user = AuthMainRepo.authenticate_user(email, password, db)
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail='Could not validate user. ')
        token = create_access_token(user.email, user.id, timedelta(minutes=20))
        user_name = user.first_name
        print("user name is ")
        print(user_name)
        return {"user_token": token, "user_name": user_name}
