#!/bin/bash

# Setup Evan Hammer's environment. See README.rst.

# Related:
# .ssh

# Dependencies:
# gcc (or xcode) - https://github.com/kennethreitz/osx-gcc-installer#readme
# Xcode / Graphic Tools / Origami
# CLT - command line tools - https://developer.apple.com/downloads/index.action#
# Heroku, Git, Foreman - https://toolbelt.herokuapp.com/


# go home
cd ~/

# symlink vim
ln -s .atmosphere/.vimrc .vimrc

# pip
easy_install pip
pip install --upgrade pip

# homebrew
ruby <(curl -fsSkL raw.github.com/mxcl/homebrew/go)

# ack
brew install ack

# node & npm
brew install node

###############################################################################
# CODING ENVIRONMENT
###############################################################################

# upgrade vim
brew install vim --override-system-vi

# upgrade you complete me plugin
vim +BundleInstall +qall
cd ~/.vim/bundle/YouCompleteMe && ./install.sh
cd ~/.vim/bundle/tern_for_vim && npm install

# ctags (http://ctags.sourceforge.net)
# CONFIG .ctags
brew install ctags
# On package creation: ctags -R .

###############################################################################
# GIT
###############################################################################

# git git-flow
brew install git-flow

# git completion
brew install git bash-completion
# install .git-flow-completion.sh

###############################################################################
# PYTHON
###############################################################################

# good python
brew install python --framework --universal

# virtualenv
pip install virtualenv
# virtualenv venv --distribute
# pip install -r requirements.txt

# process management
pip install honcho
# any other plugin dependencies?
# git hooks for checking in with python?

# flake8
pip install flake8

# docutils
pip install sphinx

###############################################################################
# JAVASCRIPT
###############################################################################

# bower
npm install -g bower

# jshint
# CONFIG .jshintrc
npm install jshint -g

# node extensions / modules
pip install nodeenv
npm install nodemon -g

# grunt-init: http://gruntjs.com/project-scaffolding
npm install grunt-cli -g
npm install grunt-init -g
# To create new rendr projects: grunt-init rendr
# https://github.com/andrewrjones/grunt-init-rendr

###############################################################################
# HTML/CSS/LESS
###############################################################################

# less
npm install less -g

###############################################################################
# DATABASES
###############################################################################

# PostGres
brew install postgresql
initdb /usr/local/var/postgres -E utf8
gem install lunchy
# mkdir -p ~/Library/LaunchAgents
# cp /usr/local/Cellar/postgresql/VERSION_NUMBER/homebrew.mxcl.postgresql.plist ~/Library/LaunchAgents/
# lunchy start postgres
# lunchy stop postgres
# OPTIONAL INSTRUMENTATION: psql postgres -c 'create extension "adminpack";'
# ADD HSTORE EXTENSION: psql -d template1 -c 'create extension hstore;'
