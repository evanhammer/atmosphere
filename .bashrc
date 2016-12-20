# .bashrc

ulimit -n 10000

# Source global definitions
if [ -f /etc/bashrc ]; then
    . /etc/bashrc
fi

# User specific aliases and functions
if [ -f ~/.alias ]; then
    . ~/.alias
fi

# Project shortcuts
if [ -f ~/.projects ]; then
    . ~/.projects
fi

# Set git completion
if [ -f ~/.git-completion.sh ]; then
    . ~/.git-completion.sh
fi

# Set git flow completion
source ~/.git-flow-completion.sh

# Compile ctags at login (hide stdout * stderr)
#jcompile > /dev/null 2>&1

# User specific environment and startup programs
export PATH=/usr/local/bin:$PATH
export PATH=$PATH:$HOME/bin
# export PATH=~/.gem/bin:$PATH

# Change my shell prompt
parse_git_branch() {
    git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\ →\ \1/'
}

export PS1='\u\[\e[1;37m\]:\[\e[1;31m\]\W\[\e[1;33m\]$(parse_git_branch)\[\e[0;39m\]$ '

# Function: Make python directory
mkpyd() {
    mkdir $1
    cd $1
    touch __init__.py
    cd ..
}

# set ls -G color for directories to yellow
export LSCOLORS=dxfxcxdxbxegedabagacad # sets color

# Setting PYTHONPATH for Python 2.7
#PYTHONPATH=~/dev/jackalope/jackalope/
#export PYTHONPATH

# Ruby settings
# export GEM_HOME=~/.gem
# export GEM_PATH=~/.gem
# eval "$(rbenv init -)"

# Go settings
# export GOPATH=$HOME/go
# export PATH=$PATH:$GOPATH/bin
# export PATH=$PATH:/usr/local/opt/go/libexec/bin

# GOPATH
export GOPATH=$HOME/go
export GOROOT=/usr/local/opt/go/libexec
export PATH=$PATH:$GOPATH/bin
export PATH=$PATH:$GOROOT/bin
