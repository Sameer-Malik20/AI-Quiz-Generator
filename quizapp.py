from flask import Flask, jsonify, request
from flask_cors import CORS
from google import genai
from dotenv import load_dotenv
import re
import json
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

@app.route('/generate-quiz', methods=['POST'])
def generate_quiz():
    data = request.get_json()
    topic = data.get('topic')

    prompt = f"""
    Generate a quiz with 5 multiple-choice questions (MCQs) about {topic}.
    For each question, provide:
    - question
    - 4 options (A, B, C, D)
    - correct answer key (e.g., 'A')

    Return JSON format like:
    [
        {{
            "question": "...",
            "options": {{
                "A": "...",
                "B": "...",
                "C": "...",
                "D": "..."
            }},
            "answer": "B"
        }},
        ...
    ]
    Make sure your response is only valid JSON, no markdown or explanation.
    """

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
        )

        # Extract raw text from Gemini response
        raw_content = response.candidates[0].content.parts[0].text
        print("RAW Response:\n", raw_content)

        # Clean JSON: remove markdown code blocks if any
        cleaned = re.sub(r"```json|```", "", raw_content).strip()

        # Parse to Python object
        quiz_data = json.loads(cleaned)

        return jsonify({"quiz": quiz_data})

    except json.JSONDecodeError as jde:
        return jsonify({
            "error": f"JSON Decode Error: {str(jde)}",
            "raw": raw_content
        }), 500
    except Exception as e:
        return jsonify({"error": f"Unexpected Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

