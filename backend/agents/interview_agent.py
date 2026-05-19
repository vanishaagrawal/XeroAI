from crewai import LLM
from crewai import Agent

llm = LLM(
    model="groq/llama-3.1-8b-instant",
    api_key="GROQ_API_KEY"
)

interview_agent = Agent(

    role="Interview Specialist",
    llm=llm,

    goal="""
    Generate HR,
    technical,
    and behavioral interview questions.
    """,

    backstory="""
    You are an elite technical interviewer
    conducting hiring rounds
    for software engineering roles.
    """,

    verbose=True
)