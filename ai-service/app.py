import os
import tempfile
from flask import Flask, jsonify, request
from PIL import Image

app = Flask(__name__)
MAX_FILE_SIZE = 8 * 1024 * 1024


def is_potential_malware(file_bytes: bytes) -> bool:
    signatures = [b"MZ", b"\x7fELF", b"PK\x03\x04"]
    return any(file_bytes.startswith(sig) for sig in signatures)


@app.post("/analyze-xray")
def analyze_xray():
    file = request.files.get("image")
    if not file:
        return jsonify({"error": "Image file is required"}), 400

    file_bytes = file.read()
    if len(file_bytes) > MAX_FILE_SIZE:
        return jsonify({"error": "File too large"}), 413

    if is_potential_malware(file_bytes):
        return jsonify({"error": "Potentially unsafe file detected"}), 400

    temp_path = None
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".img") as temp_file:
            temp_file.write(file_bytes)
            temp_path = temp_file.name

        # Basic image decoding check to reject malformed binary payloads.
        with Image.open(temp_path) as img:
            img.verify()

        result = "Possible pneumonia detected"
        return jsonify({"result": result})
    except Exception:
        return jsonify({"error": "Invalid image or analysis failed"}), 400
    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)


@app.get("/health")
def health():
    return jsonify({"status": "ok", "service": "astra-ai-demo"})


if __name__ == "__main__":
    app.run(port=8000, debug=True)
