from crewai import Task

from agents.resume_agent import resume_agent
from agents.interview_agent import interview_agent


def create_tasks(resume_text, job_description):

    resume_task = Task(

        description=f"""

Analyze this resume against the job description.

You MUST provide:

1. ATS Match Score in percentage format
Example:
ATS Match Score: 82%

2. Matching Skills

3. Missing Skills

4. Resume Strengths

5. Weak Areas

6. Suggestions for Improvement

Resume:
{resume_text}

Job Description:
{job_description}

""",

        agent=resume_agent,

        expected_output="""

ATS Match Score: XX%

Matching Skills

Missing Skills

Strengths

Weaknesses

Improvement Suggestions

"""
    )

    interview_task = Task(

        description=f"""
Generate interview questions
based on this resume.

Resume:
{resume_text}
""",

        agent=interview_agent,

        expected_output="""
HR questions

Technical questions

Behavioral questions
"""
    )

    return [

        resume_task,

        interview_task

    ]