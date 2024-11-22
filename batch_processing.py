# Function to process data in batches

def process_in_batches(data, batch_size):
    for i in range(0, len(data), batch_size):  # Slice data into batches
        yield data[i:i + batch_size]  # Yield one batch at a time

data = list(range(100))  # Example dataset
for batch in process_in_batches(data, 10):  # Process in batches of 10
    print(batch)  # Print each batch
