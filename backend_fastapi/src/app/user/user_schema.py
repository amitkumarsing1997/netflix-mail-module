from typing import TypeVar, Generic
from pydantic import BaseModel

T = TypeVar('T', bound=BaseModel)


class UserResponse(BaseModel, Generic[T]):
    resp: str = "in user schema"
    content: T | None = None


class CreateUserRequest(BaseModel):
    first_name: str
    last_name: str
    email: str
    mob_no: str
    password: str


class UserRespSchema(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    mob_no: str


class UserLocationSchema(BaseModel):
    name: str
    email: str
    latitude: str
    longitude: str
