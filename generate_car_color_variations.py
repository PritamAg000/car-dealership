import os
from PIL import Image, ImageEnhance, ImageOps

base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "frontend/public/images"))

def process_image(src_name, dst_name, hue_shift=0, sat_factor=1.0, val_factor=1.0, invert=False, grayscale=False):
    src_path = os.path.join(base_dir, src_name)
    dst_path = os.path.join(base_dir, dst_name)

    if not os.path.exists(src_path):
        print(f"Source file {src_name} not found.")
        return

    img = Image.open(src_path).convert("RGB")

    if grayscale:
        img = ImageOps.grayscale(img).convert("RGB")
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.2)
        enhancer = ImageEnhance.Brightness(img)
        img = enhancer.enhance(val_factor)
    else:
        hsv = img.convert("HSV")
        h, s, v = hsv.split()

        if hue_shift != 0:
            h = h.point(lambda p: (p + int(hue_shift * 255 / 360)) % 256)

        if sat_factor != 1.0:
            s = s.point(lambda p: min(255, max(0, int(p * sat_factor))))

        if val_factor != 1.0:
            v = v.point(lambda p: min(255, max(0, int(p * val_factor))))

        hsv = Image.merge("HSV", (h, s, v))
        img = hsv.convert("RGB")

    img.save(dst_path, "JPEG", quality=95)
    print(f"Generated {dst_name} from {src_name}")

# Tesla Model S Variations (Base: tesla.jpg)
process_image("tesla.jpg", "tesla_cyan.jpg", hue_shift=0, sat_factor=1.0, val_factor=1.0)
process_image("tesla.jpg", "tesla_black.jpg", val_factor=0.4, grayscale=True)
process_image("tesla.jpg", "tesla_white.jpg", val_factor=1.5, grayscale=True)
process_image("tesla.jpg", "tesla_red.jpg", hue_shift=140, sat_factor=1.6, val_factor=1.1)

# Porsche 911 GT3 RS Variations (Base: porsche911.jpg)
process_image("porsche911.jpg", "porsche911_gold.jpg", hue_shift=0, sat_factor=1.0, val_factor=1.0)
process_image("porsche911.jpg", "porsche911_red.jpg", hue_shift=185, sat_factor=1.7, val_factor=1.1)
process_image("porsche911.jpg", "porsche911_blue.jpg", hue_shift=240, sat_factor=1.6, val_factor=1.0)
process_image("porsche911.jpg", "porsche911_grey.jpg", val_factor=1.1, grayscale=True)

# BMW M5 Competition Variations (Base: bmwm5.jpg)
process_image("bmwm5.jpg", "bmwm5_blue.jpg", hue_shift=0, sat_factor=1.0, val_factor=1.0)
process_image("bmwm5.jpg", "bmwm5_black.jpg", val_factor=0.35, grayscale=True)
process_image("bmwm5.jpg", "bmwm5_white.jpg", val_factor=1.5, grayscale=True)
process_image("bmwm5.jpg", "bmwm5_green.jpg", hue_shift=240, sat_factor=1.6, val_factor=1.0)

# Porsche Taycan Variations (Base: taycan.jpg)
process_image("taycan.jpg", "taycan_blue.jpg", hue_shift=0, sat_factor=1.0, val_factor=1.0)
process_image("taycan.jpg", "taycan_darkblue.jpg", hue_shift=30, sat_factor=1.4, val_factor=0.8)
process_image("taycan.jpg", "taycan_white.jpg", val_factor=1.45, grayscale=True)
process_image("taycan.jpg", "taycan_black.jpg", val_factor=0.4, grayscale=True)

# Mercedes S-Class Variations (Base: sedan.jpg)
process_image("sedan.jpg", "mercedes_black.jpg", val_factor=0.35, grayscale=True)
process_image("sedan.jpg", "mercedes_white.jpg", val_factor=1.5, grayscale=True)
process_image("sedan.jpg", "mercedes_red.jpg", hue_shift=320, sat_factor=1.8, val_factor=0.9)
process_image("sedan.jpg", "mercedes_blue.jpg", hue_shift=190, sat_factor=1.5, val_factor=1.0)

# Range Rover Variations (Base: suv.jpg)
process_image("suv.jpg", "range_grey.jpg", val_factor=1.0, grayscale=True)
process_image("suv.jpg", "range_black.jpg", val_factor=0.35, grayscale=True)
process_image("suv.jpg", "range_white.jpg", val_factor=1.5, grayscale=True)
process_image("suv.jpg", "range_gold.jpg", hue_shift=-40, sat_factor=1.5, val_factor=1.1)

# Ford F-150 Lightning Variations (Base: truck.jpg)
process_image("truck.jpg", "ford_silver.jpg", val_factor=1.1, grayscale=True)
process_image("truck.jpg", "ford_black.jpg", val_factor=0.4, grayscale=True)
process_image("truck.jpg", "ford_blue.jpg", hue_shift=200, sat_factor=1.7, val_factor=1.0)
process_image("truck.jpg", "ford_red.jpg", hue_shift=130, sat_factor=1.8, val_factor=1.0)

# Rivian R1T Variations (Base: yellow.jpg)
process_image("yellow.jpg", "rivian_yellow.jpg", hue_shift=0, sat_factor=1.0, val_factor=1.0)
process_image("yellow.jpg", "rivian_blue.jpg", hue_shift=160, sat_factor=1.6, val_factor=1.0)
process_image("yellow.jpg", "rivian_white.jpg", val_factor=1.45, grayscale=True)
process_image("yellow.jpg", "rivian_black.jpg", val_factor=0.4, grayscale=True)

# Audi RS Q8 Variations (Base: grey.jpg)
process_image("grey.jpg", "audi_grey.jpg", val_factor=1.0, grayscale=True)
process_image("grey.jpg", "audi_black.jpg", val_factor=0.35, grayscale=True)
process_image("grey.jpg", "audi_red.jpg", hue_shift=330, sat_factor=1.8, val_factor=1.0)
process_image("grey.jpg", "audi_blue.jpg", hue_shift=200, sat_factor=1.6, val_factor=1.0)

print("All color variations generated successfully!")
