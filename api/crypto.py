from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes

def encrypt(plaintext, key, nonce):
    """Encrypts the plaintext using AES in CTR mode with the given key and nonce."""
    cipher = AES.new(key, AES.MODE_CTR, nonce=nonce)
    return cipher.encrypt(plaintext)