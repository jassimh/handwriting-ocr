from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from PIL import Image

app = Flask(__name__)
CORS(app)  # Allow CORS so React can communicate with Flask

@app.route("/")
def home():
    return "Flask server is running!"

@app.route("/process-image", methods=["POST"])
def process_image():
    if "file" not in request.files:
        print("❌ No file uploaded")
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        print("❌ No file selected")
        return jsonify({"error": "No file selected"}), 400

    try:
        print(f"✅ Received file: {file.filename}")  # Debugging logc
        image = Image.open(file)

        # Tesseract processing
        text = pytesseract.image_to_string(image, lang="handwgerm")
        print(f"✅ Extracted text: {text[:100]}...")  # Print first 100 chars for debugging

        return jsonify({"text": text})

    except Exception as e:
        print(f"❌ Error processing image: {e}")  # Debugging log
        return jsonify({"error": "Error processing image"}), 500

if __name__ == "__main__":
    app.run(debug=True)
