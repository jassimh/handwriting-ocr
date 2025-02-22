# Introduction 
This project is an Optical Character Recognition (OCR) system for German handwritten text. It leverages a fine-tuned Tesseract 5 model to convert handwritten text into digital format.

This is still a prototype, therefore the accuracy is not very high and some images may not give an output.

# Authors

- Jassim Hameed Ayobkhan
- Batuhan Namazci
- Berat Erkan Elçelik

Tesseract was fine-tune with a custom Handwritten German Dataset using this repository: https://github.com/tesseract-ocr/tesstrain?tab=readme-ov-file

# Requirements

- Python 3.8+
- Git
- Node.js & npm
- Flask
- Tesseract OCR (Windows users should install it manually)

# Setup 

### **Clone the Repository**

```sh git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY.git
cd handwriting-ocr
```

### **Backend Setup (Flask API)**

```sh
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
```

#### **Ensure Tesseract is Installed**

- Windows:
  - Download and install [Tesseract OCR](https://github.com/UB-Mannheim/tesseract/wiki)
  - Add `Tesseract-OCR` to the system PATH
- Linux:
  ```sh
  sudo apt install tesseract-ocr
  ```

#### **Run the Backend**

```sh
python app.py
```

---

### **Frontend Setup (React UI)**

```sh
cd ../frontend
npm install
npm start
```

The UI will be available at `http://localhost:3000/`

---

## 📤 API Usage

- **Endpoint:** `POST /process-image`
- **Request:** Upload a `.jpg` or `.png` file
- **Response:** Extracted text in JSON format

Example:

```json
{
  "text": "Das ist ein Beispiel für deutsche Handschrift."
}
```

### **Please find the Sample Images to test under  ./frontend/src/Sample_test/**

---

## 📌 Model Details

- Fine-tuned **Tesseract 5 model** for German handwriting
- Hosted on **Hugging Face**: [`Jossom/Handwritten_German_Recognition`](https://huggingface.co/Jossom/Handwritten_German_Recognition)
- Trained on the **Hugging Face German Handwriting Dataset**: [`fhswf/german_handwriting`](https://huggingface.co/datasets/fhswf/german_handwriting)
- **Training Details:**
  - **Dataset Size:** 10,844 images
  - **Iterations:** 30,000
  - **Character Error Rate (CER):** 21.310%
  - **Word Error Rate (WER):** 54.620%

---

## 🤝 Contributing

Pull requests are welcome! Open an issue for feature requests or bugs.
---


## Acknowledgments

- University of Bremen for providing the opportunity to work on this project

## Contact

- Jassim Hameed Ayobkhan - [jhameed@uni-bremen.de]
- Batuhan Namazci - [bnamazci@uni-bremen.de]
- Berat Erkan Elçelik - [belcelik@uni-bremen.de]


Project Link: [https://github.com/jassimh/handwriting-ocr](https://github.com/jassimh/handwriting-ocr)






