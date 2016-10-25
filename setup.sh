#!/bin/bash

# Setup Evan Hammer's environment. See README.rst.

# Related:
# .ssh

###############################################################################
# DEPENDENCIES (MANUAL)
###############################################################################
# gcc (or xcode) - https://github.com/kennethreitz/osx-gcc-installer#readme
# Xcode / Graphic Tools / Origami

###############################################################################
# BASICS
###############################################################################

# go home
cd ~/

# xcode command line tools
xcode-select --install

# homebrew
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew update
brew doctor
# upgrade a package:
# brew upgrade FORMULA

# caskroom (brew for Applications)
brew install cask

# git
brew install git

# ack
brew install ack

# node & npm
brew install node

# mobile shell / replacement for ssh
# brew install mobile-shell

# openssl
brew install openssl

# wget
brew install wget


###############################################################################
# ATMOSPHERE
###############################################################################
git clone https://github.com/evanhammer/atmosphere.git .atmosphere

# symlink vim
ln -s .atmosphere/.ackrc .ackrc
ln -s .atmosphere/.alias .alias
ln -s .atmosphere/.bash_profile .bash_profile
ln -s .atmosphere/.bashrc .bashrc
ln -s .atmosphere/.ctags .ctags
ln -s .atmosphere/.eslintrc.json .eslintrc.json
ln -s .atmosphere/.git-completion.sh .git-completion.sh
ln -s .atmosphere/.git-flow-completion.sh .git-flow-completion.sh
ln -s .atmosphere/.gitconfig .gitconfig
ln -s .atmosphere/.gitignore .gitignore
ln -s .atmosphere/.projects .projects
ln -s .atmosphere/.psqlrc .psqlrc
ln -s .atmosphere/.vimrc .vimrc
ln -s .atmosphere/.arcrc .arcrc

source .bash_profile

###############################################################################
# HARDWARE
###############################################################################
brew cask install kensington-trackball-works # mouse: kensington orbit trackball
brew cask install karabiner # mouse: scrolling with trackball + command

###############################################################################
# FONTS
###############################################################################
brew tap caskroom/fonts
# brew cask install inputmono


###############################################################################
# APPLICATIONS
###############################################################################

# download and install Mac App Store applications manually
# (prefer MAS over Caskroom for auto update)
# apple: garageband, keynote, numbers, pages,
# mas: twitter, slack
# softwareupdate might require sudo
softwareupdate --list
softwareupdate --install --all

# caskroom everything else
brew cask install the-unarchiver
brew cask install dropbox
brew cask install google-chrome
brew cask install google-drive
brew cask install skype
brew cask install spotify
brew cask install alfred # preferences require powerpack
brew cask install caffeine
brew cask install gitify
brew cask install joinme
brew cask install rescuetime
brew cask install sonos
brew cask install satellite-eyes
brew cask install macdown
brew cask install postman

# make sure the `~/Dropbox/preferences` folder is downloaded before setting up
# the other applications.
open ~/Applications/Dropbox.app

# preferences saved
brew cask install iterm2

# preferences to-do
# adobe, close.io, flux, microsoft office 2011, light table, sketch, sketch
# toolbox, skyfonts, textmate

# To Uninstall Applications, check these folders in both `/` and `~`:
# Applications
# Library
# Library/Application Support
# Library/LaunchAgents
# Library/Preferences
# Library/PreferencePanes
# Library/StartupItems


###############################################################################
# OS X Preferences
###############################################################################
# iTunes
# Move library reference to Dropbox: ???

# Move iphone backup reference to dropbox:
# http://support.digidna.net/hc/en-us/articles/203504123-Storing-your-iPhone-Backups-on-an-Alternate-Location
ln -s ~/Dropbox/media/iphone-backup ~/Library/Application\ Support/MobileSync/Backup

# Show the ~/Library folder
chflags nohidden ~/Library

# Store screenshots in subfolder on desktop
mkdir ~/Downloads/screenshots
defaults write com.apple.screencapture location ~/Downloads/screenshots


###############################################################################
# CODING ENVIRONMENT
###############################################################################

# upgrade vim
brew install vim --override-system-vi
sudo mv /usr/bin/vim /usr/bin/vimBak

# upgrade you complete me plugin
git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim
vim +PluginInstall +qall
cd ~/.vim/bundle/YouCompleteMe && ./install.sh
cd ~/.vim/bundle/tern_for_vim && npm install

# ctags (http://ctags.sourceforge.net)
# CONFIG .ctags
brew install ctags
# On package creation: ctags -f .tags -R .


###############################################################################
# GIT
###############################################################################

# git legit
brew install legit
legit install

# git git-flow
brew install git-flow

# git completion
brew install git bash-completion
# already config'd: .git-flow-completion.sh

###############################################################################
# DEPLOYING
###############################################################################

# heroku
brew install heroku-toolbelt
heroku update

# digital ocean
brew install doctl

###############################################################################
# PYTHON
###############################################################################

# pip
sudo easy_install pip
pip install --upgrade pip

# good python
brew install python --framework --universal

# virtualenv
sudo pip install virtualenv
# virtualenv venv --distribute
# clear all: pip freeze | xargs pip uninstall -y
# pip install -r requirements.txt

# python conventions
sudo pip install flake8
sudo pip install pep8-naming

# docutils
# sudo pip install sphinx

###############################################################################
# JAVASCRIPT
###############################################################################

# javascript conventions
npm install -g eslint
# for standard
npm install -g eslint-config-standard eslint-plugin-standard eslint-plugin-promise
# for react
npm install -g eslint-plugin-react

# node extensions / modules
sudo pip install nodeenv
npm install -g nodemon

# gulp
npm install -g gulp

# browserify
npm install -g browserify

# bower
npm install -g bower

# jsctags
npm install -g git+https://github.com/ramitos/jsctags.git

###############################################################################
# HTML/CSS/LESS
###############################################################################

# less
npm install less -g

###############################################################################
# DATABASES
###############################################################################

# PostGres
brew install postgres
brew pin postgres
brew install pgcli # https://github.com/dbcli/pgcli
initdb /usr/local/var/postgres -E utf8
mkdir -p ~/Library/LaunchAgents
# cp /usr/local/Cellar/postgresql/VERSION_NUMBER/homebrew.mxcl.postgresql.plist ~/Library/LaunchAgents/

# Edit launchctl script (set to not start automatically and keepalive false)
# vi ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist

gem install lunchy
# lunchy start -x postgres
# lunchy stop -x postgres

# OPTIONAL INSTRUMENTATION: psql postgres -c 'create extension "adminpack";'
# ADD HSTORE EXTENSION: psql -d template1 -c 'create extension hstore;'

# client: postico
brew cask install postico

###############################################################################
# BLOG
###############################################################################

# npm install -g hexo
# hexo init
# npm install
# hexo generate
# hexo deploy
