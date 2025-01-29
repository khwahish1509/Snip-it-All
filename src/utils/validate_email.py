import re  # Import regex module

# Function to validate email
def is_valid_email(email):
    pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"  # Define email pattern
    return re.match(pattern, email) is not None  # Check if email matches

print(is_valid_email("test@example.com"))  # True for valid email
print(is_valid_email("not-an-email"))      # False for invalid email
