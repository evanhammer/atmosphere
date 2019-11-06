#!/bin/bash

# Setup Evan Hammer's environment. See README.rst.

# Related:
# .ssh

###############################################################################
# DEPENDENCIES (MANUAL)
###############################################################################
# gcc (or xcode CLI, below) - https://github.com/kennethreitz/osx-gcc-installer#readme
# Xcode / Graphic Tools / Origami

###############################################################################
# BASICS
###############################################################################

# go home
cd ~/

# xcode command line tools
xcode-select --install
# see softare available to update
softwareupdate --list
# update software
sudo softwareupdate -iva

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
brew install hub

# ack
brew install ack

# nvm, node, & yarn
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
nvm install 8 # nvm install node (for latest)
nvm alias default 8
brew install yarn --without-node # without-node for nvm

# openssl
brew install openssl

# wget
brew install wget


###############################################################################
# ATMOSPHERE
###############################################################################
git clone https://github.com/evanhammer/atmosphere.git .atmosphere

# symlink configs
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
brew cask install karabiner-elements # ms keyboard
ln -s ~/.atmosphere/karabiner.json ~/.config/karabiner/karabiner.json

###############################################################################
# FONTS
###############################################################################
brew tap homebrew/cask-fonts
brew cask install font-input


###############################################################################
# APPLICATIONS
###############################################################################

# prefer MAS over Caskroom for auto update
brew install mas
# sign into mac app store manually
mas install 937984704 # aphemtamine (pause sleeping)
mas install 1437226581 # horo (timer)
mas install 1225570693 # ulyssesmac
mas install 803453959 # slack
mas install 409203825 # numbers
mas install 409183694 # keynote
mas install 682658836 # garageband
mas install 409789998 # twitter
# mas install 973134470 # be focused
# mas install 425424353 # the unarchiver

# caskroom everything else
brew cask install 1password
brew cask install alfred
brew cask install textmate
brew cask install dropbox
brew cask install google-chrome
brew cask install superhuman
brew cask install cloudapp
brew cask install macdown
brew cask install postman # HTTP Requests for API's
brew cask install dash # text expander
brew cask install sketch
brew cask install craftmanager # syncing sketch and invision
#extras
brew cask install spotify
brew cask install satellite-eyes # desktop background map
brew cask install google-drive-file-stream
brew tap caskroom/drivers && brew cask install sonos
# brew cask install twist
# brew cask install fluid # wrap websites into applications
# brew cask install rescuetime

npm install -g nativefier
nativefier --name Asana --full-screen https://app.asana.com/0/222821559379755/list /Applications
nativefier --name "Google Calendar" --full-screen https://calendar.google.com/calendar/r /Applications
# move apps out of subdirectories and delete installation directory

# make sure the `~/Dropbox/preferences` folder is downloaded before setting up
# the other applications.
open ~/Applications/Dropbox.app

# preferences saved
brew cask install iterm2

# preferences to-do
# adobe, flux, microsoft office 2011, light table, sketch
# skyfonts, textmate

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
# Choose Library... ~/Dropbox/media/iTunes
# Advanced > Set iTunes Media folder location to
# '~/Dropbox/media/music/music-library'

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
brew install vim --with-override-system-vi
# run Cmd+R at Boot; Terminal; csrutil disable
sudo mv /usr/bin/vim /usr/bin/vimBak

# upgrade you complete me plugin
git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim
vim +PluginInstall +qall
# cd ~/.vim/bundle/YouCompleteMe && ./install.sh
cd ~/.vim/bundle/tern_for_vim && npm install

# ctags (http://ctags.sourceforge.net)
# CONFIG .ctags
brew install ctags
# On package creation: ctags -f .tags -R .

# setup vscode
brew cask install visual-studio-code
ln -s ~/Dropbox/preferences/vscode ~/.vscode
code # to create directory with settings.json
rm ~/Library/Application\ Support/Code/User/settings.json
ln -s ~/.atmosphere/.vscode/settings.json ~/Library/Application\ Support/Code/User/settings.json
ln -s ~/.atmosphere/.vscode/keybindings.json ~/Library/Application\ Support/Code/User/keybindings.json
# key repeat
defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false

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
# RUBY
###############################################################################
gem install rubocop

###############################################################################
# JAVASCRIPT
###############################################################################

# javascript conventions
npm install -g eslint
# for react
npm install -g eslint-plugin-react
# for standard
# npm install -g eslint-config-standard eslint-plugin-standard eslint-plugin-promise

# node extensions / modules
# sudo pip install nodeenv
# npm install -g nodemon

# jsctags
# npm install -g git+https://github.com/ramitos/jsctags.git

###############################################################################
# HTML/CSS/LESS
###############################################################################

# less
# npm install less -g

###############################################################################
# Docker
###############################################################################
# Install Docker for Mac manually

###############################################################################
# FIREBASE
###############################################################################
npm install -g firebase-tools

###############################################################################
# POSTGRES
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
