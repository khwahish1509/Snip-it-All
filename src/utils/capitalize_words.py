# Function to capitalize words

def capitalize_words(sentence):
    return " ".join(word.capitalize() for word in sentence.split())  # Capitalize each word

print(capitalize_words("hello world!"))  # Output: "Hello World!"
