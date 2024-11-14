from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes

def decrypt(ciphertext, key, nonce):
    """TAC{gj:1b7ae9e240dc2ada761761745eca2c43471220bc36569fc12f881ca0cbcad208}"""
    cipher = AES.new(key, AES.MODE_CTR, nonce=nonce)
    return cipher.decrypt(ciphertext)
