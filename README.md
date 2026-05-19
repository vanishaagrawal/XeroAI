# 🚀 XeroAI — LLM-Powered Multi-Agent Career Intelligence Platform

![XeroAI Dashboard](frontend/public/dashboard-preview.png)

<p align="center">

<img src="https://img.shields.io/badge/Frontend-React.js-61DAFB?style=for-the-badge&logo=react" />
<img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi" />
<img src="https://img.shields.io/badge/AI-LLM-purple?style=for-the-badge" />
<img src="https://img.shields.io/badge/Multi--Agent-CrewAI-orange?style=for-the-badge" />
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />

</p>

---

## 🧠 Overview

XeroAI is an enterprise-grade AI-powered career intelligence ecosystem designed to revolutionize resume optimization, ATS evaluation, interview preparation, and career guidance using Large Language Models (LLMs) and autonomous multi-agent AI workflows.

The platform integrates intelligent resume analysis pipelines, ATS scoring systems, conversational AI copilots, and AI-driven interview simulation engines into a unified career acceleration platform.

---

# ✨ Core Features

## 🤖 AI Resume Intelligence
- LLM-powered resume analysis engine
- Semantic skill extraction and evaluation
- Resume quality enhancement recommendations
- AI-generated optimization insights

---

## 📊 ATS Optimization System
- ATS compatibility prediction
- Intelligent keyword matching
- Resume-job description alignment scoring
- Dynamic ATS evaluation workflows

---

## 🎤 AI Mock Interview Engine
- AI-generated HR & technical interview questions
- Intelligent interview preparation assistance
- Real-time AI interview simulation workflows
- Context-aware conversational interactions

---

## 💬 Career Copilot Assistant
- Conversational AI career assistant
- Personalized career guidance
- Resume improvement recommendations
- Intelligent AI-powered interactions

---

## 📚 Analysis History Tracking
- Resume analysis history management
- Persistent ATS records
- Historical interview sessions
- User-specific analytics tracking

---

# 🧠 Multi-Agent AI Architecture

XeroAI leverages autonomous AI agents orchestrated through modern LLM workflows.

### AI Agents
- Resume Analysis Agent
- ATS Intelligence Agent
- Interview Simulation Agent
- Career Copilot Agent

Each agent operates independently while collaborating through orchestrated workflows to generate contextual career intelligence.

---

# ⚡ System Capabilities

- Real-Time Resume Intelligence
- Dynamic ATS Match Prediction
- AI-Powered Career Guidance
- Multi-Agent LLM Orchestration
- Conversational AI Pipelines
- Authentication & Session Management
- Scalable Modular Architecture

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios
- Vite

---

## Backend
- FastAPI
- SQLAlchemy
- JWT Authentication
- SQLite

---

## AI & LLM Stack
- CrewAI
- Groq LLM API
- Multi-Agent Systems
- Prompt Engineering
- AI Workflow Orchestration

---

# 📂 Project Architecture

```text
XeroAI/
│
├── backend/
│   ├── agents/
│   │   ├── crew_setup.py
│   │   ├── interview_agent.py
│   │   ├── resume_agent.py
│   │   └── tasks.py
│   │
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   ├── auth.py
│   ├── schemas.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── vite.svg
│   │   └── dashboard-preview.png
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── ResumeUpload.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── CareerChat.jsx
│   │   │   ├── MockInterview.jsx
│   │   │   ├── AnalyticsDashboard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── README.md
├── LICENSE
└── .gitignore
```


#🚀 Installation & Setup

1️⃣ Clone Repository
git clone https://github.com/vanishaagrawal/XeroAI.git

2️⃣ Navigate Into Project
cd XeroAI

#⚙️ Backend Setup
3️⃣ Navigate to Backend
cd backend

4️⃣ Create Virtual Environment
Windows
python -m venv venv

Activate environment:

venv\Scripts\activate
Mac/Linux
python3 -m venv venv
source venv/bin/activate

5️⃣ Install Backend Dependencies
pip install -r requirements.txt

6️⃣ Create Environment File
Create:
.env
Add:
GROQ_API_KEY=your_groq_api_key_here

7️⃣ Run Backend Server
uvicorn main:app --reload
Backend runs on:
http://127.0.0.1:8000


#🎨 Frontend Setup

8️⃣ Open New Terminal
Navigate to frontend:
cd frontend

9️⃣ Install Frontend Dependencies
npm install

🔟 Start Frontend
npm run dev
Frontend runs on:
http://localhost:5173

#🔐 Environment Variables
Create .env inside backend:
GROQ_API_KEY=your_api_key

📸 Platform Preview
Dashboard Interface

#🚀 Future Roadmap

🎙️ Voice-Based AI Interviews
☁️ Cloud Deployment
📈 Recruiter Analytics Dashboard
🧠 RAG-Based Resume Intelligence
🔗 LinkedIn Resume Parsing
📊 AI Career Growth Tracking
🌐 Real-Time Collaboration Features
🔐 Security Features
JWT-Based Authentication
Protected User Sessions
Secure API Communication
Environment Variable Protection
Secret Key Isolation

#👩‍💻 Developed By
Vanisha Agrawal

B.Tech Computer Science Student
AI/LLM Enthusiast • Full-Stack Developer • Multi-Agent AI Explorer

#⭐ Contributing

Contributions are welcome.
Fork the repository and submit a pull request to improve XeroAI.

#📜 License
This project is licensed under the MIT License.

#🌟 Support
If you found this project useful, consider giving it a ⭐ on GitHub.
