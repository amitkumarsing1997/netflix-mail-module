from typing import TypeVar, Generic
from pydantic import BaseModel

T = TypeVar('T', bound=BaseModel)


class AuthResponse(BaseModel, Generic[T]):
    resp: str = "in auth schema"
    content: T | None = None


class UserRespSchema(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    mob_no: str


class Token(BaseModel):
    access_token: str
    token_type: str
    user_email: str
    user_name: str
