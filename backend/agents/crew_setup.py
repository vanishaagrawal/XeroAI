from crewai import Crew, Process, LLM

from agents.resume_agent import resume_agent
from agents.interview_agent import interview_agent

from agents.tasks import create_tasks


llm = LLM(
    model="groq/llama-3.1-8b-instant",
    api_key="GROQ_API_KEY"
)


def run_crew(resume_text, job_description):

    tasks = create_tasks(
        resume_text,
        job_description
    )

    crew = Crew(

        agents=[
            resume_agent,
            interview_agent,
            
        ],

        tasks=tasks,

        process=Process.sequential,

        verbose=True,

        llm=llm
    )

    result = crew.kickoff()

    return result