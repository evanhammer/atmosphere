# .bash_profile

ulimit -n 10000

# Get the aliases and functions
if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi

# User specific environment and startup programs
export PATH=/usr/local/bin:$PATH
export PATH=$PATH:$HOME/bin
export PATH=~/.gem/bin:$PATH

# Change my shell prompt
parse_git_branch() {
    git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\ →\ \1/'
}

export PS1='\u\[\e[1;37m\]:\[\e[1;31m\]\W\[\e[1;33m\]$(parse_git_branch)\[\e[0;39m\]$ '

# set ls -G color for directories to yellow
export LSCOLORS=dxfxcxdxbxegedabagacad # sets color

# Setting PYTHONPATH for Python 2.7
#PYTHONPATH=~/dev/jackalope/jackalope/
#export PYTHONPATH

# Ruby settings
export GEM_HOME=~/.gem
export GEM_PATH=~/.gem

# Go settings
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin
export PATH=$PATH:/usr/local/opt/go/libexec/bin

# Spring settings
source ~/.secret
export OPSWORKS_NAME="evan"
export GOPATH=$GOPATH:$HOME/dev/spring/go:"/usr/local/opt/go/libexec"
export PATH=$PATH:/bin:/Users/evanhammer/.gem/bin:/usr/local/bin:/Users/evanhammer/.gem/bin:/usr/local/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/evanhammer/bin:/Users/evanhammer/bin
export RBENV_ROOT=~/.rbenv
export PATH=$PATH:$RBENV_ROOT/bin
eval "$(rbenv init -)"
export GOPATH=$GOPATH:$HOME/dev/spring/branded/go
export PATH=$PATH:$HOME/dev/spring/branded/go/bin
export PATH=$PATH:$HOME/dev/spring/arcanist/bin
export NVM_DIR=/Users/evanhammer/.nvm
source /usr/local/opt/nvm/nvm.sh
