# .bashrc

# Source global definitions
if [ -f /etc/bashrc ]; then
    . /etc/bashrc
fi

# User specific aliases and functions

if [ -f ~/.alias ]; then
    . ~/.alias
fi

# Set git autocompletion
if [ -f ~/.git-completion.sh ]; then
    . ~/.git-completion.sh
fi

export PATH=/usr/local/bin:$PATH
export PATH=/usr/local/share/python:$PATH

# Compile ctags at login (hide stdout * stderr)
jcompile > /dev/null 2>&1

# Start at code
jackalope
