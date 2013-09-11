# .bash_profile

# Get the aliases and functions
if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi

# User specific environment and startup programs

PATH=$PATH:$HOME/bin

export PATH

# Change my shell prompt
parse_git_branch() {
    git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\ →\ \1/'
}

export PS1='\u\[\e[1;37m\]:\[\e[1;31m\]\W\[\e[1;33m\]$(parse_git_branch)\[\e[0;39m\]$ '

# Setting PATH for Python 2.7
# The orginal version is saved in .bash_profile.pysave
#PATH="/Library/Frameworks/Python.framework/Versions/2.7/bin:${PATH}"
#export PATH

##
# Your previous /Users/evanhammer/.bash_profile file was backed up as /Users/evanhammer/.bash_profile.macports-saved_2012-07-19_at_21:28:07
##

# MacPorts Installer addition on 2012-07-19_at_21:28:07: adding an appropriate PATH variable for use with MacPorts.
export PATH=/opt/local/bin:/opt/local/sbin:$PATH
# Finished adapting your PATH environment variable for use with MacPorts.

PYTHONPATH=~/dev/jackalope/jackalope/
export PYTHONPATH

# Added for Urban Compass
export GITROOT=/Users/evanhammer/dev
export PATH=/usr/local/share/npm/bin:$PATH
export CREDENTIALS_FILE=~/.credentials
