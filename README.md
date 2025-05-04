# 🧠 AI Quiz Generator (React + Flask + Gemini API)

This is an AI-powered quiz generation application where users can input any topic, and the app will generate multiple-choice questions (MCQs) using **Google Gemini API**.

## 📌 Features

- Input any topic to generate quizzes
- MCQs with multiple options and correct answers
- React frontend with modern UI
- Flask backend connected to Gemini (Generative AI)
- Deployed easily using **Render**

---

## ⚙️ Tech Stack

- **Frontend**: React.js
- **Backend**: Flask (Python)
- **AI**: Google Gemini API
- **Deployment**: Render (or any platform)

---

## 📁 Project Structure

quiz-generator/
├── client/ # React frontend
│ ├── public/
│ └── src/
│ ├── App.js
│ └── index.js
├── server/ # Flask backend
│ ├── quizapp.py
│ └── .env
├── requirements.txt
├── Procfile
└── README.md

pip install -r requirements.txt
GOOGLE_API_KEY=your_google_genai_api_key
python quizapp.py
You are an expert quiz generator.

Generate 5 multiple-choice questions based on the following topic:
Topic: "Photosynthesis"

Format:
- Question
- 4 Options (A, B, C, D)
- Correct Answer

live Link: http://bespoke-quokka-a9b1bf.netlify.app
