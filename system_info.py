import platform  # Import platform module

# Function to get system information
def get_system_info():
    info = {
        "System": platform.system(),  # OS name
        "Node Name": platform.node(),  # Hostname
        "Release": platform.release(),  # OS release
        "Version": platform.version(),  # OS version
        "Machine": platform.machine(),  # Machine type
        "Processor": platform.processor(),  # Processor details
    }
    return info

# Usage example
system_info = get_system_info()
for key, value in system_info.items():
    print(f"{key}: {value}")
