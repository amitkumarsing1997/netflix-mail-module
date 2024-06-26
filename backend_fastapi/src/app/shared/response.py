from typing import Generic, TypeVar
from pydantic import BaseModel

T = TypeVar('T', bound=BaseModel)


class Response(BaseModel, Generic[T]):
    success: bool = True
    msg: str | None = None
    msg_code: str | None = None
    body: T | None = None


class CreateUserResponse(BaseModel):
    message: str = "User created successfully"
