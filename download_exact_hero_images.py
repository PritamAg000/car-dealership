import urllib.request
import ssl
import os

images = {
    "ford_f150.jpg": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
    "mercedes_s580.jpg": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    "range_rover.jpg": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
}

target_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "frontend/public/images"))
os.makedirs(target_dir, exist_ok=True)

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

for filename, url in images.items():
    dest_path = os.path.join(target_dir, filename)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx) as resp, open(dest_path, "wb") as f:
            f.write(resp.read())
        print(f"Downloaded {filename} successfully.")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")
