#!/bin/bash

# Variables
REPO_URL="https://github.com/Solarin-Johnson/react-vite-structure-template.git"

# Function to display usage
usage() {
  echo "Usage: $0 <repository-path>"
  exit 1
}

# Check if repository path is provided
if [ -z "$1" ]; then
  usage
fi

REPO_PATH=$1

# Clone the template repository
echo "Cloning the template repository..."
git clone "$REPO_URL" "$REPO_PATH"

cd "$REPO_PATH" || exit

# Install dependencies
echo "Installing dependencies..."
npm install

# Inform the user
echo "Setup complete. You can now navigate to $REPO_PATH and start working on your project."

# Optionally: Open the project in VSCode or other editor
# code .
