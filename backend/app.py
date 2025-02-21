from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from PIL import Image
import requests
import os
import shutil
import subprocess

# Flask setup
app = Flask(__name__)
CORS(app)

# Define paths for Windows
TESSERACT_PATH = r"C:\Program Files\Tesseract-OCR\tesseract.exe"  # Adjust if installed elsewhere
TESSDATA_DIR = os.path.join(os.path.dirname(TESSERACT_PATH), "tessdata")
MODEL_NAME = "Jossom/Handwritten_German_Recognition"
MODEL_URL = f"https://huggingface.co/{MODEL_NAME}/resolve/main/handwgerm.traineddata"
MODEL_PATH = os.path.join(TESSDATA_DIR, "handwgerm.traineddata")

# 🔹 Function to check if Tesseract is installed
def check_tesseract():
    if not os.path.exists(TESSERACT_PATH):
        return False, "❌ Tesseract-OCR not found. Install it from https://github.com/UB-Mannheim/tesseract/wiki"
    
    try:
        result = subprocess.run([TESSERACT_PATH, "--version"], capture_output=True, text=True)
        if "tesseract" in result.stdout.lower():
            return True, "✅ Tesseract-OCR is installed."
    except Exception as e:
        return False, f"❌ Error checking Tesseract: {e}"
    
    return False, "❌ Tesseract installation check failed."

# 🔹 Function to check if PyTesseract is installed
def check_pytesseract():
    try:
        pytesseract.get_tesseract_version()
        return True, "✅ PyTesseract is installed and working."
    except Exception as e:
        return False, f"❌ PyTesseract error: {e}"

# 🔹 Ensure Tesseract is installed
tesseract_ok, tesseract_msg = check_tesseract()
pytesseract_ok, pytesseract_msg = check_pytesseract()

if not tesseract_ok:
    print(tesseract_msg)
if not pytesseract_ok:
    print(pytesseract_msg)

# Set the Tesseract-OCR path for PyTesseract
pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH

# 🔹 Download and place the model if missing
if not os.path.exists(MODEL_PATH):
    print("📥 Downloading the custom Tesseract model...")
    response = requests.get(MODEL_URL, stream=True)
    if response.status_code == 200:
        with open(MODEL_PATH, "wb") as f:
            shutil.copyfileobj(response.raw, f)
        print("✅ Model downloaded and placed successfully!")
    else:
        print("❌ Failed to download model from Hugging Face.")

@app.route("/")
def home():
    return "Flask server is running!"

@app.route("/process-image", methods=["POST"])
def process_image():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    try:
        image = Image.open(file)

        # Use the fine-tuned Tesseract model
        text = pytesseract.image_to_string(image, lang="handwgerm")  
        return jsonify({"text": text})

    except Exception as e:
        return jsonify({"error": f"Error processing image: {e}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
