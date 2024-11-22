import bcrypt  # Import bcrypt for secure hashing

# Hash password
password = "mypassword"  # Example password
hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())  # Generate hash
print(hashed)  # Print hashed password

# Verify password
is_valid = bcrypt.checkpw(password.encode(), hashed)  # Check password against hash
print(is_valid)  # True if password matches
