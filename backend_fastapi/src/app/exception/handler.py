from typing import Any
from fastapi import Request, FastAPI, HTTPException
from fastapi.responses import JSONResponse
from src.app.exception.custom_exception import GenericException
from src.app.shared.response import Response


def exception_handlers(app: FastAPI):
    @app.exception_handler(GenericException)
    def generic_exception_handler(request: Request, exc: GenericException):
        return JSONResponse(
            status_code=200,
            content=Response[Any](success=False, msg=exc.msg, msg_code=exc.msg_code, body=exc.body).model_dump()
        )

    @app.exception_handler(HTTPException)
    def http_exception_handler(request: Request, exc: HTTPException):
        return JSONResponse(
            status_code=200,
            content=Response[Any](success=False, msg=exc.detail, msg_code=str(exc.status_code)
                                  , body=exc.headers).model_dump()
        )

    @app.exception_handler(Exception)
    def other_exceptions(request: Request, exc: Exception):
        return JSONResponse(
            status_code=500,
            content=Response[Any](success=False, msg='Exception occurred while procession your request',
                                  msg_code='server_error', body=None).model_dump()
        )
