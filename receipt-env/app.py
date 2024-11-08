import base64
import pickle
import requests
from flask import Flask, request, send_from_directory
from crypto import decrypt

app = Flask(__name__)

CRYPTO_KEY = b'\x83y\xe6pI\xbbh{(wv\x8d\xcbvkX'
CRYPTO_NONCE = b'\x93\xb1&aU\xc9\xb8\x1d'

@app.route("/")
def get():
    return {"status": "ok"}

@app.route("/ybnq_cl", methods=["GET"])
def download_page():
    ticket = request.args.get("uuid", None)
    if (ticket):
        ticket_url = f"https://www.infobazaar.store/api/purchase/{ticket}/"
        response = requests.get(ticket_url)
        print("OK")
        if response.status_code == 200:
            print(response.content)
            cipher_text = base64.urlsafe_b64decode(response.content)
            plain_bytes = decrypt(cipher_text, CRYPTO_KEY, CRYPTO_NONCE)
            try:
                receipt = pickle.loads(plain_bytes)
                # Continue
            except Exception as error:
                print(plain_bytes)
                return app.response_class(repr(error), status=500)
        return app.response_class(status=500)
    return app.response_class(
        status=400
    )

@app.get("/openapi.yaml")
def get_flag():
    return send_from_directory(".", "openapi.yml")