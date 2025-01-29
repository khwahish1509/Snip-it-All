from PIL import Image

# Function to resize an image
def resize_image(input_path, output_path, size):
    with Image.open(input_path) as img:
        img = img.resize(size)  # Resize the image
        img.save(output_path)  # Save resized image

# Usage example
resize_image("input.jpg", "output.jpg", (200, 200))  # Resize to 200x200
print("Image resized and saved.")
