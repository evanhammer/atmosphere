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
sudo easy_install pip
pip install --upgrade pip

# homebrew
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

# ack
brew install ack

# node & npm
brew install node

# mobile shell / replacement for ssh
brew install mobile-shell

###############################################################################
# CODING ENVIRONMENT
###############################################################################

# upgrade vim
brew install vim --override-system-vi
sudo mv /usr/bin/vim /usr/bin/vim72

# upgrade you complete me plugin
git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim
vim +PluginInstall +qall
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
sudo pip install virtualenv
# virtualenv venv --distribute
# pip install -r requirements.txt

# process management
# sudo pip install honcho
# any other plugin dependencies?
# git hooks for checking in with python?

# flake8
sudo pip install flake8

# docutils
# sudo pip install sphinx

###############################################################################
# JAVASCRIPT
###############################################################################

# bower
npm install -g bower

# jshint
# CONFIG .jshintrc
npm install jshint -g

# node extensions / modules
sudo pip install nodeenv
npm install nodemon -g

# grunt-init: http://gruntjs.com/project-scaffolding
npm install grunt-cli -g
npm install grunt-init -g
# To create new rendr projects: grunt-init rendr
# https://github.com/andrewrjones/grunt-init-rendr

# for automagically generating a requirejs config file from bower
# npm install -g --save bower-requirejs
# bower-requirejs -c path/to/config.js

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
 lunchy start postgres
# lunchy stop postgres
# OPTIONAL INSTRUMENTATION: psql postgres -c 'create extension "adminpack";'
# ADD HSTORE EXTENSION: psql -d template1 -c 'create extension hstore;'
