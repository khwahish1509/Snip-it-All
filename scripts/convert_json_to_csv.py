import csv
import json

# Function to convert JSON to CSV
def json_to_csv(json_file, csv_file):
    with open(json_file, "r") as jf, open(csv_file, "w", newline="") as cf:
        data = json.load(jf)  # Load JSON data
        writer = csv.DictWriter(cf, fieldnames=data[0].keys())  # CSV writer
        writer.writeheader()  # Write CSV header
        writer.writerows(data)  # Write rows from JSON

# Usage example
json_to_csv("data.json", "data.csv")
print("JSON converted to CSV.")
