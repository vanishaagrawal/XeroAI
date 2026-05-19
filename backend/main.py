import random
import re
from groq import Groq
from dotenv import load_dotenv
import os
from pydantic import BaseModel
from fastapi import (
    FastAPI,
    UploadFile,
    File,
    Form,
    Header
)
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
import io
from auth import (
    hash_password,
    verify_password,
    create_access_token,
    decode_token
)

from models import User, Analysis
from database import SessionLocal

from database import engine
from models import Base

from agents.crew_setup import run_crew
from schemas import UserRequest

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware (
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str

class InterviewAnswer(BaseModel):
    question: str
    answer: str

class ResumeOptimizeRequest(BaseModel):
    resume_text: str

class AuthRequest(BaseModel):
    email: str
    password: str

@app.post("/signup")
async def signup(data: AuthRequest):

    db = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == data.email
    ).first()

    if existing_user:

        return {
            "message": "User already exists"
        }

    new_user = User(
        email=data.email,
        password=hash_password(
            data.password
        )
    )

    db.add(new_user)

    db.commit()

    return {
        "message": "Signup successful"
    }

@app.post("/login")
async def login(user: UserRequest):

    db = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:

        return {
            "message": "User not found"
        }

    if existing_user.password != user.password:

        return {
            "message": "Wrong password"
        }

    token = create_access_token(
        {"sub": existing_user.email}
    )

    print("TOKEN:", token)

    return {
        "token": token
    }

@app.get("/")
def home():

    return {
        "message": "XeroAI Backend Running"
    }


@app.post("/chat")
async def chat(request: ChatRequest):

    user_message = request.message

    prompt = f"""
You are XeroAI Career Copilot.

You help users with:
- resume improvement
- interview preparation
- career guidance
- internships
- AI careers
- data analyst careers
- skill roadmaps

Give practical, concise, modern advice.

User Question:
{user_message}
"""

    response = client.chat.completions.create(

        model="llama-3.1-8b-instant",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    ai_response = response.choices[0].message.content

    return {
        "response": ai_response
    }

@app.post("/mock-interview")
async def mock_interview():

    prompt = """
You are an expert interviewer.

Generate ONLY ONE interview question.

The question should be:
- short
- realistic
- professional
- suitable for a data analyst candidate

Return ONLY the question text.
Do not add categories.
Do not add explanations.
"""

    response = client.chat.completions.create(

        model="llama-3.1-8b-instant",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    question = response.choices[0].message.content

    return {
        "question": question
    }

@app.post("/evaluate-answer")
async def evaluate_answer(data: InterviewAnswer):

    if len(data.answer.split()) < 5:

     return {
        "feedback": "Your answer is too short. Please provide a more professional and detailed response.",
        "next_question": data.question
    }

    prompt = f"""
You are an AI interviewer.

Evaluate this interview answer.

Provide:

1. Answer Quality Score /10
2. Confidence Score %
3. Communication Skill
4. Professionalism Level
5. Strengths
6. Weak Areas
7. Better Answer Suggestion

Question:
{data.question}

Answer:
{data.answer}
"""

    response = client.chat.completions.create(

        model="llama-3.1-8b-instant",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    feedback = response.choices[0].message.content

    next_question_prompt = f"""
Based on this previous interview answer,
generate the NEXT interview question.

Previous Question:
{data.question}

Candidate Answer:
{data.answer}

Generate ONLY ONE next interview question.
"""

    next_response = client.chat.completions.create(

        model="llama-3.1-8b-instant",

        messages=[
            {
                "role": "user",
                "content": next_question_prompt
            }
        ]
    )

    next_question = next_response.choices[0].message.content

    return {
        "feedback": feedback,
        "next_question": next_question
    }

@app.post("/optimize-resume")
async def optimize_resume(
    data: ResumeOptimizeRequest
):

    prompt = f"""
You are an expert ATS resume writer.

Improve this resume professionally.

Provide:

1. Improved Professional Summary
2. Better Skills Section
3. Stronger Project Descriptions
4. ATS Keywords to Add
5. Resume Improvement Suggestions

Resume:
{data.resume_text}
"""

    response = client.chat.completions.create(

        model="llama-3.1-8b-instant",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    optimized_resume = response.choices[0].message.content

    return {
        "optimized_resume":
        optimized_resume
    }

@app.post("/upload-resume")
async def upload_resume(
    authorization: str = Header(...),
    file: UploadFile = File(...),
    job_description: str = Form(...)
):

    user_email = "demo_user"

    contents = await file.read()

    pdf_reader = PyPDF2.PdfReader(
        io.BytesIO(contents)
    )

    text = ""

    for page in pdf_reader.pages:

        extracted = page.extract_text()

        if extracted:
            text += extracted

    ai_response = run_crew(
        text,
        job_description
    )

    ats_score = str(
        random.randint(65, 95)
    )

    analysis = Analysis(

        resume_name=file.filename,

        job_description=job_description,

        ats_score=ats_score,

        analysis_result=str(ai_response),

        user_email=user_email
    )

    db = SessionLocal()

    db.add(analysis)

    db.commit()

    return {
    "analysis": str(ai_response)
}



@app.get("/history")
async def get_history(
    authorization: str = Header(...)
):

    user_email = "demo_user"

    db = SessionLocal()

    analyses = db.query(Analysis).filter(
        Analysis.user_email == user_email
    ).all()

    results = []

    for item in analyses:

        results.append({

            "id": item.id,

            "resume_name": item.resume_name,

            "ats_score": item.ats_score,

            "analysis_result": item.analysis_result,

            "job_description": item.job_description
        })

    return results