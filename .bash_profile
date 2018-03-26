# .bash_profile

# PUT EVERYTHING IN BASHRC

# Get the aliases and functions
if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi

if [ -f ~/.secrets ]; then
    . ~/.secrets
fi

# Load rbenv automatically by appending
# the following to ~/.bashrc:
eval "$(rbenv init -)"

# Load rbenv automatically by appending
# the following to ~/.bashrc:
eval "$(rbenv init -)"

export NVM_DIR="$HOME/.nvm"
. "$(brew --prefix nvm)/nvm.sh"

export PATH=$PATH:$GOPATH/bin
export PATH=$PATH:$GOROOT/bin
