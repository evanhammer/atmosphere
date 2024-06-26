#!/bin/bash

# Setup Evan Hammer's environment. See README.rst.

# Related:
# .ssh

###############################################################################
# BASICS
###############################################################################

# go home
cd ~/

# xcode command line tools
xcode-select --install

# homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew doctor
# brew update
# brew upgrade FORMULA

# git
brew install git
brew install gh

# ack
brew install ack

# nvm, node, & yarn
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install --lts --default # nvm install --lts (for latest)

# openssl
brew install openssl

# wget
brew install wget

# check and do update
# softwareupdate --list
# softwareupdate -ia


###############################################################################
# ATMOSPHERE
###############################################################################
git clone https://github.com/evanhammer/atmosphere.git .atmosphere

# symlink configs
ln -s .atmosphere/.ackrc .ackrc
ln -s .atmosphere/.alias .alias
ln -s .atmosphere/.ctags .ctags
ln -s .atmosphere/.eslintrc.json .eslintrc.json
ln -s .atmosphere/.gitconfig .gitconfig
ln -s .atmosphere/.gitignore .gitignore
ln -s .atmosphere/.projects .projects
ln -s .atmosphere/.psqlrc .psqlrc
ln -s .atmosphere/.vimrc .vimrc
ln -s .atmosphere/.zshrc .zshrc

###############################################################################
# HARDWARE
###############################################################################
brew install --cask karabiner-elements # ms keyboard
# open karabiner elements
ln -s ~/.atmosphere/karabiner.json ~/.config/karabiner/karabiner.json
brew install --cask bettertouchtool # license in email, preferences in Dropbox

###############################################################################
# FONTS
###############################################################################
brew tap homebrew/cask-fonts
brew install --cask font-input
# open figma and set up fonts to sync


###############################################################################
# APPLICATIONS
###############################################################################

# prefer MAS over Caskroom for auto update
brew install mas
# sign into mac app store manually
mas install 937984704 # aphemtamine (pause sleeping)
mas install 1437226581 # horo (timer)
mas install 462058435 # microsoft excel
mas install 462054704 # microsoft word
mas install 803453959 # slack
mas install 506189836 # harvest
mas install 1492280469 # preview markdown
mas install 1320450034 # DaftCloud for SoundCloud
# mas install 409203825 # numbers
# mas install 409183694 # keynote
# mas install 682658836 # garageband

# basic
brew install --cask 1password # not mas because qr scanner doesnt work
brew install --cask dropbox
brew install --cask google-chrome
brew install --cask alfred
brew install --cask textmate
brew install --cask macdown # markdown

# daily
brew install --cask superhuman
brew install --cask asana
brew install --cask zoomus
brew install --cask google-drive
brew install --cask airtable
brew install --cask obsidian
brew install --cask vimcal

# work
brew install --cask logitune
brew install --cask postman # HTTP Requests for API's
brew install --cask skyfonts

# personal
brew install --cask spotify
brew install --cask satellite-eyes # desktop background map
brew tap homebrew/cask-drivers && brew install sonos
brew install --cask daisydisk

# autoraise
# brew tap dimentium/autoraise
# brew install autoraise
# ln -s ~/.atmosphere/autoraise.config ~/.config/AutoRaise/config
# brew services start autoraise

# unsure
# brew install --cask twist
# brew install --cask rescuetime

# make sure the `~/Dropbox/preferences` folder is downloaded before setting up
# the other applications.
open ~/Applications/Dropbox.app

# preferences saved
brew install --cask iterm2
# link to preferences manually
# brew install --cask dash # text expander

# EBOOKS
brew install --cask calibre
brew install --cask adobe-digital-editions
rm -rf ~/Library/Preferences/calibre
ln -s ~/Dropbox/preferences/calibre ~/Library/Preferences/calibre
# point calibre's library to ~/Dropbox/books

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
# Apple Music
# Open with Opetions -- Choose Library... ~/Dropbox/media/iTunes
# Advanced > Set Media folder location to
# '~/Dropbox/media/music/music-library'

# Move iphone backup reference to dropbox:
# https://www.imore.com/how-move-your-iphone-or-ipad-backups-external-hard-drive
ln -s ~/Dropbox/media/iphone-backup ~/Library/Application\ Support/MobileSync/Backup

# Show the ~/Library folder
chflags nohidden ~/Library

# Store screenshots in subfolder on desktop
mkdir ~/Downloads/screenshots
defaults write com.apple.screencapture location ~/Downloads/screenshots

# turn off chime when plugging in laptop (while lid is open)
killall PowerChime
defaults write com.apple.PowerChime ChimeOnAllHardware -bool false
defaults write com.apple.PowerChime ChimeOnNoHardware -bool true
open -g -a PowerChime

###############################################################################
# CODING ENVIRONMENT
###############################################################################

# oh-my-zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# setup vscode
brew cask install visual-studio-code
ln -s ~/Dropbox/preferences/vscode ~/.vscode
code # to create directory with settings.json
rm ~/Library/Application\ Support/Code/User/settings.json
ln -s ~/.atmosphere/.vscode/settings.json ~/Library/Application\ Support/Code/User/settings.json
ln -s ~/.atmosphere/.vscode/keybindings.json ~/Library/Application\ Support/Code/User/keybindings.json
# key repeat
defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false

# upgrade vim
brew install vim
# run Cmd+R at Boot; Terminal; csrutil disable
# sudo mv /usr/bin/vim /usr/bin/vimBak

# upgrade you complete me plugin
# git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim
# vim +PluginInstall +qall
# cd ~/.vim/bundle/YouCompleteMe && ./install.sh
# cd ~/.vim/bundle/tern_for_vim && npm install

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
# ssh
###############################################################################
# update ssh keys: github, heroku, digitalocean


###############################################################################
# DEPLOYING
###############################################################################

# heroku
brew tap heroku/brew && brew install heroku
# requires xcode command line tools

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
