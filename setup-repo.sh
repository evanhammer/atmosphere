#!/bin/zsh

# Exit if the current directory does not have a .git folder
if [ ! -d ".git" ]; then
  echo "Error: No .git directory found in current location"
  exit 1
fi

# Exit if the current directory does not have a .cursor/rules directory
if [ ! -d ".cursor/rules" ]; then
  echo "Error: No .cursor/rules directory found in current location"
  exit 1
fi

# Find all mdc files in ~/.cursor/rules and symlink them to ./.cursor/rules
echo "Symlinking mdc files from ~/.cursor/rules to ./.cursor/rules..."
find ~/.cursor/rules -name "*.mdc" | while read -r file; do
  filename=$(basename "$file")
  ln -sf "$file" "./.cursor/rules/$filename"
  echo "Linked: $filename"
done

# Run pnpm install
echo "Running pnpm install..."
pnpm install

echo "Done!"
