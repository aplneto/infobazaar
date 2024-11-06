from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes

def encrypt(plaintext, key, nonce):
    """Encrypts the plaintext using AES in CTR mode with the given key and nonce."""
    cipher = AES.new(key, AES.MODE_CTR, nonce=nonce)
    return cipher.encrypt(plaintext)

def decrypt(ciphertext, key, nonce):
    """Decrypts the ciphertext using AES in CTR mode with the given key and nonce."""
    cipher = AES.new(key, AES.MODE_CTR, nonce=nonce)
    return cipher.decrypt(ciphertext)

def manipulate_ciphertext(ciphertext, known_plaintext, new_plaintext):
    """
    Takes an original ciphertext and known plaintext, along with a new plaintext.
    Returns a new ciphertext corresponding to the new plaintext without needing the key.
    """
    if len(ciphertext) != len(known_plaintext) or len(known_plaintext) != len(new_plaintext):
        raise ValueError("Ciphertext, known plaintext, and new plaintext must be the same length.")
    
    manipulated_ciphertext = bytes([c ^ kp ^ np for c, kp, np in zip(ciphertext, known_plaintext, new_plaintext)])
    return manipulated_ciphertext

if __name__ == '__main__':
    # Example Usage
    key = get_random_bytes(16)  # Generate a random 16-byte key for AES-128
    nonce = get_random_bytes(8)  # Generate an 8-byte nonce for CTR mode (suitable for AES CTR in PyCryptodome)

    original_plaintext = b"Hello, world!!!"
    new_plaintext = b"Goodbye, world!"

    # Encrypt the original plaintext
    ciphertext = encrypt(original_plaintext, key, nonce)
    print("Original Ciphertext:", ciphertext)

    # Decrypt to verify
    decrypted_text = decrypt(ciphertext, key, nonce)
    print("Decrypted Text:", decrypted_text)

    # Manipulate the ciphertext to encrypt the new plaintext
    new_ciphertext = manipulate_ciphertext(ciphertext, original_plaintext, new_plaintext)
    print("New Ciphertext:", new_ciphertext)

    # Decrypt the manipulated ciphertext to verify
    decrypted_new_text = decrypt(new_ciphertext, key, nonce)
    print("Decrypted New Text:", decrypted_new_text)
