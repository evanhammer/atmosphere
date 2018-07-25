# .bash_profile

# PUT EVERYTHING IN BASHRC

# Get the aliases and functions
if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi

if [ -f ~/.secrets ]; then
    . ~/.secrets
fi

# export PATH=$PATH:$GOPATH/bin
# export PATH=$PATH:$GOROOT/bin
