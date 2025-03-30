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
# follow onscreen commands
brew doctor
# brew update
# brew upgrade FORMULA

# git
brew install git
brew install gh

# zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
git clone https://github.com/spaceship-prompt/spaceship-prompt.git "$ZSH_CUSTOM/themes/spaceship-prompt" --depth=1
ln -s "$ZSH_CUSTOM/themes/spaceship-prompt/spaceship.zsh-theme" "$ZSH_CUSTOM/themes/spaceship.zsh-theme"
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# check and do update
# softwareupdate --list
# softwareupdate -ia

# make sure the `~/Dropbox/preferences` folder is downloaded before setting up
# the other applications.
brew install --cask dropbox
open ~/Applications/Dropbox.app

brew install --cask iterm2 # link to preferences manually
# brew install --cask dash # link to preferences manually

brew install --cask font-input # iterm > Profiles > Text > Input Mono Narrow | Light | 12
# open figma and set up fonts to sync

brew install vim
git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim
vim +PluginInstall +qall

###############################################################################
# ATMOSPHERE
###############################################################################
git clone https://github.com/evanhammer/atmosphere.git .atmosphere

# symlink configs
# ln -s .atmosphere/.ackrc .ackrc
ln -s .atmosphere/.alias .alias
# ln -s .atmosphere/.ctags .ctags
# ln -s .atmosphere/.eslintrc.json .eslintrc.json
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
# OS X Preferences
###############################################################################
# Apple Music
# Open with Option key -- Choose Library...
# '~/Dropbox/media/music/mac-music/Music Library.musiclibrary'
# Settings > Advanced > Set Media folder location to
# '~/Dropbox/media/music/music-library' (automatic?)

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
brew install --cask zen-browser
# after installing 1password extension, add Zen to browser list in 1password
# app settings
brew install --cask alfred
# brew install --cask macdown # markdown
brew install --cask superhuman # add all accounts

# prefer MAS over Caskroom for auto update
brew install mas
# sign into mac app store manually
mas install 1437226581 # horo (timer) # manual settings
mas install 462058435 # microsoft excel
mas install 462054704 # microsoft word
mas install 803453959 # slack # manual settings copy + login to each workspace
mas install 506189836 # harvest
mas install 1492280469 # preview markdown
mas install 1320450034 # DaftCloud for SoundCloud

# daily
brew install --cask claude
brew install --cask chatgpt
brew install --cask zoom # manual settings
brew install --cask google-drive
brew install --cask airtable
brew install --cask obsidian
brew install --cask vimcal
brew install --cask timeular

# Safari: "Add to dock" for...
# Asana Business
# Asana Personal

# work
brew install --cask logitune
brew install --cask notion
brew install --cask postman # HTTP Requests for API's
brew install --cask skyfonts
brew install --cask linear-linear
brew install --cask loom

# personal
brew install --cask spotify
brew install --cask satellite-eyes # desktop background map
# brew install --cask sonos # requires rosetta 2 for silicon
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

# To Uninstall brew casks: brew uninstall APPLICATION --zap --cask
# To Uninstall non-brew Applications, check these folders in both `/` and `~`:
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

# nvm and node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install --lts --default

# pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -

# openssl
brew install openssl

# wget
brew install wget

# setup cursor
brew install --cask cursor
ln -s ~/Dropbox/preferences/vscode ~/.vscode
ln -s ~/Dropbox/preferences/cursor ~/.cursor
cursor # to create directory with settings.json
rm ~/Library/Application\ Support/Cursor/User/settings.json && rm ~/Library/Application\ Support/Cursor/User/keybindings.json
ln -s ~/.atmosphere/.vscode/settings.json ~/Library/Application\ Support/Cursor/User/settings.json
ln -s ~/.atmosphere/.vscode/keybindings.json ~/Library/Application\ Support/Cursor/User/keybindings.json
# manually update cursor settings
# update cursor rules for each project
ln -s ~/.cursor/rules/main.mdc ./main.mdc

# if getting the SecCodeCheckValidity error with code -67062 (NSSOSStatusErrorDomain)
codesign --force --deep --sign - /Applications/Cursor.app

# cursor key repeat
defaults write com.todesktop.230313mzl4w4u92 ApplePressAndHoldEnabled -bool false

brew install --cask docker
# brew install supabase/tap/supabase

###############################################################################
# SSH
###############################################################################
# update ssh keys: github, heroku, digitalocean


###############################################################################
# REPOS
###############################################################################
# manually download repos from github -- symlink cursor rules and copy .env


###############################################################################
# DEPLOYING
###############################################################################

# heroku (requires xcode command line tools)
brew install heroku/brew/heroku && heroku autocomplete

# digital ocean
# brew install doctl


###############################################################################
# TYPESCRIPT
###############################################################################

pnpm add -g typescript


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
# POSTGRES
###############################################################################

# PostGres
brew install postgresql
initdb /usr/local/var/postgres
brew services start postgresql
# brew services stop postgresql

# OPTIONAL INSTRUMENTATION: psql postgres -c 'create extension "adminpack";'
# ADD HSTORE EXTENSION: psql -d template1 -c 'create extension hstore;'

brew install sqlfluff # sql linter
brew install --cask beekeeper-studio
