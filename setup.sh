#!/bin/bash

# Setup Evan Hammer's environment. See README.rst.

# Related:
# http://github.com/evanhammer/vimrc
# .ssh

# Dependencies:
# gcc (or xcode) - https://github.com/kennethreitz/osx-gcc-installer#readme
# CLT - command line tools
# Heroku, Git, Foreman - https://toolbelt.herokuapp.com/


# go home
cd ~/

# symlink vim
ln -s .vim/.vimrc .vimrc

# pip
easy_install pip
pip install --upgrade pip

# homebrew
ruby <(curl -fsSkL raw.github.com/mxcl/homebrew/go)

# node & npm
brew install node

# git git-flow
brew install git-flow

# git completion
brew install git bash-completion
# install .git-flow-completion.sh

# good python
brew install python --framework

# virtualenv
pip install virtualenv
# virtualenv venv --distribute
# pip install -r requirements.txt

# ack
brew install ack

# flake8
pip install flake8

# jshint
# CONFIG .jshintrc
sudo npm install jshint -g

# ctags
# http://ctags.sourceforge.net
# CONFIG .ctags
brew install ctags
# New Project: ctags -R .

# less
sudo npm install less -g

# docutils 
pip install sphinx

# process management
pip install honcho
# any other plugin dependencies?
# git hooks for checking in with python? 

# databases
brew install postgresql
initdb /usr/local/var/postgres -E utf8
gem install lunchy
# mkdir -p ~/Library/LaunchAgents
# cp /usr/local/Cellar/postgresql/VERSION_NUMBER/homebrew.mxcl.postgresql.plist ~/Library/LaunchAgents/
# lunchy start postgres
# lunchy stop postgres
# OPTIONAL INSTRUMENTATION: psql postgres -c 'create extension "adminpack";'
# ADD HSTORE EXTENSION: psql -d template1 -c 'create extension hstore;'

# node extensions / modules
pip install nodeenv
sudo npm install nodemon -g
