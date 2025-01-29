import qrcode  # Import QR code library

# Function to generate QR code
def create_qr_code(data, file_name):
    qr = qrcode.make(data)  # Create QR code from data
    qr.save(file_name)  # Save QR code to file

# Usage example
create_qr_code("https://example.com", "qrcode.png")  # Replace with your data
print("QR code saved as qrcode.png")
