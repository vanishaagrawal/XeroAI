from crewai import LLM
from crewai import Agent

llm = LLM(
    model="groq/llama-3.1-8b-instant",
    api_key="GROQ_API_KEY"
)

resume_agent = Agent(

    role="Resume Analyst",

    llm=llm,

    goal="""
    Analyze resumes for ATS optimization,
    hiring potential,
    and technical strengths.
    """,

    backstory="""
    You are an expert ATS recruiter
    with 15 years of experience
    hiring software engineers,
    AI engineers,
    and data analysts.
    """,

    verbose=True
)