#!/bin/bash
# Auto backup script

SOURCE_DIR="/path/to/source"  # Replace with your source directory
DEST_DIR="/path/to/backup"   # Replace with your destination directory
DATE=$(date +"%Y-%m-%d_%H-%M-%S")  # Generate timestamp
BACKUP_NAME="backup_$DATE.tar.gz"  # Create backup name

# Create backup
tar -czvf "$DEST_DIR/$BACKUP_NAME" "$SOURCE_DIR"
echo "Backup created: $BACKUP_NAME"
