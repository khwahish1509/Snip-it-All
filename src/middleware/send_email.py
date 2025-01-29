import smtplib
from email.mime.text import MIMEText

# Function to send an email
def send_email(subject, body, to_email, from_email, smtp_server, smtp_port, login, password):
    msg = MIMEText(body)  # Create email body
    msg["Subject"] = subject  # Add subject
    msg["From"] = from_email  # Sender
    msg["To"] = to_email  # Recipient

    with smtplib.SMTP(smtp_server, smtp_port) as server:  # Connect to SMTP server
        server.starttls()  # Secure the connection
        server.login(login, password)  # Login to the server
        server.send_message(msg)  # Send email

# Example usage
send_email(
    subject="Test Email",
    body="Hello! This is a test email.",
    to_email="recipient@example.com",
    from_email="your_email@example.com",
    smtp_server="smtp.gmail.com",
    smtp_port=587,
    login="your_email@example.com",
    password="your_password"
)
