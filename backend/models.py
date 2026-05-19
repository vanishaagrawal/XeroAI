from sqlalchemy import Column, Integer, String, Text
from database import Base


class Analysis(Base):

    __tablename__ = "analyses"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    resume_name = Column(String)

    job_description = Column(Text)

    ats_score = Column(String)

    analysis_result = Column(Text)

    user_email = Column(String)


class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    email = Column(
        String,
        unique=True
    )

    password = Column(String)