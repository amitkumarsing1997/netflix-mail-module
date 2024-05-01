from src.app.config.db_config import Base
from sqlalchemy import Column, Integer, String


class Users(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String, unique=True)
    mob_no = Column(String, unique=True)
    hashed_password = Column(String)




