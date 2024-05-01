from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from fastapi import Depends
SECRET_KEY = '1b12971d44e18538e9cd51020e0588718c59d21ee962bcb0f0e78694bb682b69'
ALGORITHM = 'HS256'
bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
oauth2_bearer = OAuth2PasswordBearer(tokenUrl='auth/main/token')
token_str = Annotated[str, Depends(oauth2_bearer)]




