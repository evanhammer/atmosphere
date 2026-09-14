
eval "$(/opt/homebrew/bin/brew shellenv)"

# >>> Codex installer >>>
export PATH="/Users/evanhammer/.local/bin:$PATH"
# <<< Codex installer <<<

if [[ ! -o interactive && -s "${NVM_DIR:-$HOME/.nvm}/nvm.sh" ]]; then
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  source "$NVM_DIR/nvm.sh"
  if [[ -n "$(nvm_find_nvmrc)" ]]; then
    nvm use --silent
  fi
fi
