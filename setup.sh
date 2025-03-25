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

# oh-my-zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# check and do update
# softwareupdate --list
# softwareupdate -ia

# make sure the `~/Dropbox/preferences` folder is downloaded before setting up
# the other applications.
brew install --cask dropbox
open ~/Applications/Dropbox.app

brew install --cask iterm2 # link to preferences manually
# brew install --cask dash # link to preferences manually


###############################################################################
# ATMOSPHERE
###############################################################################
git clone https://github.com/evanhammer/atmosphere.git .atmosphere

# symlink configs
ln -s .atmosphere/.ackrc .ackrc
ln -s .atmosphere/.alias .alias
# ln -s .atmosphere/.ctags .ctags
ln -s .atmosphere/.eslintrc.json .eslintrc.json
ln -s .atmosphere/.gitconfig .gitconfig
ln -s .atmosphere/.gitignore .gitignore
# ln -s .atmosphere/.projects .projects
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
# APPLICATIONS
###############################################################################

# basic
brew install --cask 1password # not mas because qr scanner doesnt work
brew install --cask google-chrome
brew install --cask alfred
brew install --cask macdown # markdown

# prefer MAS over Caskroom for auto update
brew install mas
# sign into mac app store manually
mas install 1437226581 # horo (timer)
mas install 462058435 # microsoft excel
mas install 462054704 # microsoft word
mas install 803453959 # slack
mas install 506189836 # harvest
mas install 1492280469 # preview markdown
mas install 1320450034 # DaftCloud for SoundCloud

# daily
brew install --cask claude
brew install --cask superhuman
brew install --cask zoomus
brew install --cask google-drive
brew install --cask airtable
brew install --cask obsidian
brew install --cask vimcal
brew install --cask timeular

# Chrome: "Install page as app" for...
# Asana Business
# Asana Personal
# ChatGPT

# work
brew install --cask logitune
brew install --cask notion
brew install --cask postman # HTTP Requests for API's
brew install --cask skyfonts
brew install --cask linear-linear
brew install --cask tandem

# personal
brew install --cask spotify
brew install --cask satellite-eyes # desktop background map
brew tap homebrew/cask-drivers && brew install sonos
brew install --cask daisydisk
brew install --cask discord

# autoraise
# brew tap dimentium/autoraise
# brew install autoraise
# ln -s ~/.atmosphere/autoraise.config ~/.config/AutoRaise/config
# brew services start autoraise

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
# CODING ENVIRONMENT
###############################################################################

# nvm, node, & yarn
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install --lts --default # nvm install --lts (for latest)

# pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -

# openssl
brew install openssl

# wget
brew install wget

# setup cursor
brew cask install cursor
ln -s ~/Dropbox/preferences/vscode ~/.vscode
ln -s ~/Dropbox/preferences/cursor ~/.cursor
cursor # to create directory with settings.json
rm ~/Library/Application\ Support/Cursor/User/settings.json
ln -s ~/.atmosphere/.vscode/settings.json ~/Library/Application\ Support/Cursor/User/settings.json
ln -s ~/.atmosphere/.vscode/keybindings.json ~/Library/Application\ Support/Cursor/User/keybindings.json

# if getting the SecCodeCheckValidity error with code -67062 (NSSOSStatusErrorDomain)
codesign --force --deep --sign - /Applications/Cursor.app

# cursor key repeat
defaults write com.todesktop.230313mzl4w4u92 ApplePressAndHoldEnabled -bool false

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

brew install --cask docker
brew install supabase/tap/supabase


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
# brew tap heroku/brew && brew install heroku
# requires xcode command line tools

# digital ocean
# brew install doctl


###############################################################################
# PYTHON
###############################################################################

# python
brew install python
brew install ruff # linter

# virtual environments
brew install pipenv
brew install direnv # automatic sourcing .env on cd
# pipenv install | pipenv --rm


###############################################################################
# RUBY
###############################################################################
gem install rubocop


###############################################################################
# JAVASCRIPT
###############################################################################

# javascript conventions
npm install -g eslint

# serve static files
npm install -g serve

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
brew install postgresql
initdb /usr/local/var/postgres
brew services start postgresql
# brew services stop postgresql

# OPTIONAL INSTRUMENTATION: psql postgres -c 'create extension "adminpack";'
# ADD HSTORE EXTENSION: psql -d template1 -c 'create extension hstore;'

# client: beekeeper studio
brew install --cask beekeeper-studio
