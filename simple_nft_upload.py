import requests
import os
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("NFT_STORAGE_API_KEY")

def upload_to_nft_storage(filepath):
    url = "https://api.nft.storage/upload"
    headers = {"Authorization": f"Bearer {API_KEY}"}

    with open(filepath, "rb") as file_data:
        response = requests.post(url, headers=headers, files={"file": file_data})

    if response.status_code == 200 and response.json().get("ok"):
        cid = response.json()["value"]["cid"]
        print(f"✅ Uploaded {filepath} → ipfs://{cid}")
        return cid
    else:
        print(f"❌ Failed to upload {filepath}")
        print(response.text)
        return None

# Change this path to your image file
folder_path = "/Users/nazaninghelichi/Desktop/NutologyNFT"
files = os.listdir(folder_path)

for file in files:
    if file.lower().endswith((".png", ".jpg", ".jpeg", ".webp")):
        full_path = os.path.join(folder_path, file)
        upload_to_nft_storage(full_path)
