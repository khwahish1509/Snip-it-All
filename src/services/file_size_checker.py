import os  # Import os module for file handling

# Function to format file size
def get_file_size(file_path):
    size = os.path.getsize(file_path)  # Get file size in bytes
    for unit in ["B", "KB", "MB", "GB", "TB"]:  # Units for file size
        if size < 1024:
            return f"{size:.2f} {unit}"  # Format and return size
        size /= 1024

# Usage example
print(get_file_size("example.txt"))  # Replace with your file path
