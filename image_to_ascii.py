from PIL import Image

# Function to convert image to ASCII
def image_to_ascii(image_path, output_width=100):
    chars = " .:-=+*%@#"  # ASCII character set
    img = Image.open(image_path)  # Open image
    img = img.resize((output_width, int(output_width * img.height / img.width)))  # Resize image
    img = img.convert("L")  # Convert to grayscale
    ascii_art = "\n".join(
        "".join(chars[pixel // 25] for pixel in img.getdata()[i : i + img.width])
        for i in range(0, len(img.getdata()), img.width)
    )
    print(ascii_art)

# Usage example
image_to_ascii("example.jpg")  # Replace with your image path
