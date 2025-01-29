import string  # Import string module for character sets
import random  # Import random module for randomness

# Function to generate a random password
def generate_password(length=12):
    characters = string.ascii_letters + string.digits + string.punctuation  # Allowed characters
    return ''.join(random.choice(characters) for _ in range(length))  # Create password

# Usage example
password = generate_password(16)  # Generate a 16-character password
print(f"Generated Password: {password}")
