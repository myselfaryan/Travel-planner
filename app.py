from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from mira_sdk import MiraClient
import os

app = Flask(__name__)

# Load environment variables and initialize Mira client
load_dotenv()
client = MiraClient(config={"API_KEY": os.getenv("MIRA_API_KEY")})
FLOW_ID = "hellovoid/travel-planner"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate-plan', methods=['POST'])
def generate_plan():
    try:
        data = request.json
        inputs = {
            "destination_preferences": data.get('destination_preferences', ''),
            "travel_dates": data.get('travel_dates', ''),
            "budget": data.get('budget', ''),
            "interests": data.get('interests', ''),
            "travel_style": data.get('travel_style', ''),
            "accommodation_preferences": data.get('accommodation_preferences', '')
        }
        
        # Execute the flow
        result = client.flow.execute(FLOW_ID, inputs)
        return jsonify({"success": True, "result": result})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
