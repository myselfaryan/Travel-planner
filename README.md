# Mira Travel Planner

An AI-powered travel planning application that generates personalized travel itineraries based on your preferences, budget, and interests. Built with Flask and the Mira AI platform, this application helps travelers create detailed, customized travel plans that match their unique travel style.

![Mira Travel Planner](https://your-screenshot-url-here.png)

## 🌟 Features

- **Personalized Itinerary Generation**
  - Custom destination recommendations
  - Duration and date-based planning
  - Budget-conscious suggestions
  - Interest-based activities
  - Flexible travel styles
  - Accommodation preferences

- **Smart AI Integration**
  - Powered by Claude 3.5 Sonnet
  - Natural language processing
  - Context-aware recommendations

## 🚀 Quick Start

1. **Prerequisites**
   - Python 3.8 or higher
   - [Mira API key](https://flows.mira.network/) (Sign up with invitation code `SRICITY`)

2. **Installation**
   ```bash
   # Create and activate virtual environment
   python -m venv .venv
   source .venv/bin/activate  # On Linux/macOS
   
   # Install dependencies
   pip install -r requirements.txt
   ```

3. **Configuration**
   ```bash
   # Create .env file with your Mira API key
   echo "MIRA_API_KEY=your_api_key_here" > .env
   ```

4. **Run the Application**
   ```bash
   python app.py
   ```

5. **Access the Application**
   - Open your browser and navigate to `http://localhost:5000`
   - Start planning your dream trip!

## 🛠️ Tech Stack

- **Backend**: Python/Flask
- **Frontend**: JavaScript, HTML, CSS
- **AI Integration**: Mira SDK, Anthropic's Claude
- **Configuration**: YAML-based flow definitions

## 📁 Project Structure

```
mira-flows/
├── app.py              # Flask application
├── flows/
│   └── travel-planner.yaml  # Mira flow definition
├── static/            
│   ├── css/           # Stylesheets
│   └── js/            # JavaScript files
├── templates/         # HTML templates
└── requirements.txt   # Python dependencies
```

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Mira](https://mira.com) for providing the AI platform
- [Anthropic](https://anthropic.com) for Claude AI model
- All contributors and users of this project

---

Made with ❤️ using [Mira](https://mira.com) - Making AI workflows accessible and powerful.
