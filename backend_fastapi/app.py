
from fastapi import FastAPI
from src.app.exception.handler import exception_handlers
from src.app.user import user_router
from src.app.authmain import authmain_router

from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

exception_handlers(app)
app.include_router(user_router.userRouter)
app.include_router(authmain_router.authMainRouter)








