import os
import requests
from dotenv import load_dotenv

load_dotenv()  # Load .env variables

API_KEY = os.getenv("NFT_STORAGE_API_KEY")
print("DEBUG – Loaded API Key:", API_KEY) 
UPLOAD_URL = "https://api.nft.storage/upload"
HEADERS = {"Authorization": f"Bearer {API_KEY}"}


def upload_file(file_path):
    with open(file_path, "rb") as file:
        response = requests.post(UPLOAD_URL, headers=HEADERS, files={"file": file})
        data = response.json()
        if data["ok"]:
            cid = data["value"]["cid"]
            print(f"✅ {file_path}: ipfs://{cid}")
            return cid
        else:
            print(f"❌ Failed for {file_path}: {data}")
            return None

def upload_folder(folder_path):
    uploaded = {}
    for filename in os.listdir(folder_path):
        if filename.lower().endswith((".png", ".jpg", ".jpeg", ".webp")):
            full_path = os.path.join(folder_path, filename)
            cid = upload_file(full_path)
            if cid:
                uploaded[filename] = cid
    return uploaded

if __name__ == "__main__":
    folder = input("Enter your image folder path: ").strip()
    uploaded = upload_folder(folder)
    print("\n🎉 Uploaded Nuts:")
    for name, cid in uploaded.items():
        print(f"{name} → ipfs://{cid}")
