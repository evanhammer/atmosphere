"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Maintainer: Evan Hammer - evan@evanhammer.com
"
" Version: 0.5 - 2014.05.17
"
" TUTORIAL:
" http://rawpackets.com/2011/10/16/configuring-vim-as-a-python-ide/
"
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set nocompatible              " be iMproved
filetype off                  " required!

" Vundle: One ring to rule them all.
" required!
set rtp+=~/.vim/bundle/vundle
call vundle#begin()
Plugin 'gmarik/vundle'

" Syntax and language improvements
Plugin 'elzr/vim-json'
Plugin 'groenewege/vim-less'
Plugin 'hail2u/vim-css3-syntax.git'
Plugin 'lepture/vim-jinja.git'
Plugin 'jelera/vim-javascript-syntax'
Plugin 'pangloss/vim-javascript'
Plugin 'marijnh/tern_for_vim'
Plugin 'hdima/python-syntax'
Plugin 'mustache/vim-mustache-handlebars'
Plugin 'cakebaker/scss-syntax.vim'
"Plugin 'vim-scripts/python.vim--Vasiliev'
" Plugin 'vim-scripts/JavaScript-Indent' " broke html

" General
Plugin 'vim-scripts/closetag.vim'
Plugin 'mattn/emmet-vim'
Plugin 'bling/vim-airline'
Plugin 'ciaranm/detectindent'
" Plugin 'Valloric/YouCompleteMe'
"Plugin 'klen/python-mode'
Plugin 'majutsushi/tagbar'
Plugin 'mileszs/ack.vim.git'
Plugin 'scrooloose/syntastic'
Plugin 'tpope/vim-fugitive'
Plugin 'vim-scripts/AutoTag.git'
Plugin 'vim-scripts/Colour-Sampler-Pack'
Plugin 'vim-scripts/DeleteTrailingWhitespace.git'
Plugin 'vim-scripts/ScrollColors'

call vundle#end()

" Enable some syntax settings that had to be disabled for Vundle.
filetype plugin indent on
syntax on
" set background=dark " needs to be before colorscheme


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" PLUGINS:
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

" DETECT INDENT:
" autocmd BufReadPost * :DetectIndent
let g:detectindent_preferred_expandtab = 1
let g:detectindent_preferred_indent = 4


" ACK:
noremap :a :Ack<space>


" python mode
" Disable pylint checking every save
" let g:pymode_lint_write = 0


" SYNTASTIC:
let g:syntastic_check_on_open=1 " check syntax on open
let g:syntastic_auto_loc_list=0 " note erros with a separate buffer
" let g:syntastic_enable_highlighting=0
let g:syntastic_html_tidy_ignore_errors=[" proprietary attribute \"ng-"] " for angular

" TAGBAR:
noremap <silent> T :TagbarToggle<CR>
let g:tagbar_left=1
let g:tagbar_autoclose=1

" Add any active projects by running: 'ctags -R .' in the src directory
set tags=./tags,tags;


" DELETE TRAILING WHITESPACES:
" Remove trailing whitespace on write
autocmd BufWritePre * DeleteTrailingWhitespace


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" LANGUAGES:
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""


" JAVASCRIPT:
" http://oli.me.uk/2014/11/21/essential-vim-bundles-for-javascript-and-clojure/

" au FileType javascript setlocal cindent smartindent
au FileType javascript setlocal shiftwidth=2 softtabstop=2
let g:syntastic_javascript_checkers = ['standard']
let g:syntastic_javascript_checkers = ['jshint']
let g:syntastic_javascript_jshint_args = '--config ~/.jshintrc'


" PYTHON:

let python_highlight_all=1     " for full syntax highlighting
let g:syntastic_python_checker_args='--max-complexity 10'
au FileType python setlocal tabstop=8 expandtab shiftwidth=4 softtabstop=4

" omnicomplete
au FileType python set ofu=pythoncomplete#Complete

" code folding
au FileType python set foldmethod=indent " code folding based on indentation
au FileType python set foldlevel=10
au FileType python set foldnestmax=2

" improve autoindent on {} and cinwords (doesn't seem necessary for python)
"autocmd BufRead *.py set smartindent cinwords=if,elif,else,for,while,with,try,except,finally,def,class

" use unix-style \n line endings only for new files when coding (???)
"autocmd BufNewFile *.py set fileformat=unix


" LESS:


" HANDLEBARS:

let g:mustache_abbreviations = 1
au BufRead,BufNewFile *.hbs set ft=mustache

" JINJA2:

au BufRead,BufNewFile *.jinja setl sw=2 et softtabstop=2

" Figure out which type of hilighting to use for html.
"fun! s:SelectHTML()
"let n = 1
"while n < 50 && n < line("$")
"  " check for jinja
"  if getline(n) =~ '{%\s*\(extends\|block\|macro\|set\|if\|for\|include\|trans\)\>'
"    set ft=jinja
"    return
"  endif
"    let n = n + 1
"  endwhile
"endfun
"autocmd BufNewFile,BufRead *.jinja2,*.jinja,*.html,*.htm  call s:SelectHTML()


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" GENERAL OPTIONS:
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" from: http://phuzz.org/vimrc.html
" from: https://bitbucket.org/whiteinge/dotfiles/src/14246aa6719d/.vimrc
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

" code folding
nnoremap <space> za

" indentation
set autoindent         	        " keep indent level from previous line
set tabstop=4          	        " # of spaces that a tab counts for
set softtabstop=4               " # of spaces that a tab counts for (insert mode)
set expandtab                   " uses spaces instead of tab characters
set smarttab                    " helps with backspacing because of expandtab
set shiftwidth=4                " number of spaces to use for autoindent
set shiftround                  " rounds indent to a multiple of shiftwidth

" visual
set cursorline                  " highlight current line
"set cursorcolumn                " highlight current column
" highlight Normal ctermbg=black
" highlight bad whitespace, maybe only in .py files?
highlight BadWhitespace ctermbg=red guibg=red
colorscheme molokai

" misc
set synmaxcol=256               " stop syntax highlighting long lines
set textwidth=79 		        " wrap text starting in col 80
set encoding=utf-8              " set default file encoding to utf8
set scrolloff=5                 " keep 5 lines when scrolling
set incsearch                   " highlight search while typing
set hlsearch                    " highlight searches
set ruler                       " show the cursor position all the time
set number                      " show line numbers
set numberwidth=4               " We are good up to 9999 lines
set ignorecase                  " ignore case when searching
set title                       " show title in console title bar
set ttyfast                     " smoother changes
set virtualedit=block           " let cursor move past line end in <C-v> mode
set nostartofline               " don't jump cursor to first char when paging
set autowrite                   " auto save changes on quit and switch buffers
set sm                          " show matching braces
set smartcase                   " if there are caps, go case-sensitive
"set completeopt=                " don't use a pop up menu for completions
set backspace=indent,eol,start  " backspace over listed character types
set noswapfile                  " dont save swp files
set nobackup                    " dont save backup files
set autochdir                   " set the current directory
set scrolloff=999               " keeps current line centered

" splits
set splitbelow
set splitright

" Restore cursor position
"autocmd BufReadPost * if line("'\"") > 0|if line("'\"") <= line("$")|exe("norm '\"")|else|exe "norm $"|endif|endif

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" STATUS LINE:
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set laststatus=2                " always show the status line
"set statusline=%F%m%r%h%w[%L][%{&ff}]%y[%p%%][%04l,%04v]
"              | | | | |  |   |      |  |     |    |
"              | | | | |  |   |      |  |     |    + current
"              | | | | |  |   |      |  |     |       column
"              | | | | |  |   |      |  |     +-- current line
"              | | | | |  |   |      |  +-- current % into file
"              | | | | |  |   |      +-- current syntax in
"              | | | | |  |   |          square brackets
"              | | | | |  |   +-- current fileformat
"              | | | | |  +-- number of lines
"              | | | | +-- preview flag in square brackets
"              | | | +-- help flag in square brackets
"              | | +-- readonly flag in square brackets
"              | +-- rodified flag in square brackets
"              +-- full path to file in the buffer

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" AUTO WIDTH:
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set winwidth=84
autocmd WinEnter * wincmd =
autocmd VimResized * wincmd =


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" KEY REMAPPINGS: NAVIGATE SPLIT SCREEN
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
map <C-J> <C-W>j
map <C-K> <C-W>k
map <C-L> <C-W>l
map <C-H> <C-W>h
nmap <Tab> <c-w>w
nmap <S-Tab> <c-w>W


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" KEY REMAPPINGS: SCROLLBIND AND CURSORBIND IN ONE
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
noremap :ss :windo<space>set<space>scrollbind<cr>:windo<space>set<space>cursorbind<cr>

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" KEY REMAPPINGS: USE ARROW KEYS FOR TEXT SHIFTING
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" See: http://jeetworks.org/node/89
" `Up` or `Down` moves the current line up or down
" `Ctrl-Up` or `Ctrl-Down` moves the text below the current line up or down
" Left` de-dents the current line, while `Right` indents it.
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
inoremap  <up> <nop>
inoremap  <down> <nop>
inoremap  <left> <nop>
inoremap  <right> <nop>
noremap   <up> <nop>
noremap   <down> <nop>
noremap   <left> <nop>
noremap   <right> <nop>

" remap the "control up/down from terminal to vim
" map this in Terminal Keyboard as well. e.g. \033[5A
map <esc>[5A <c-up>
map <esc>[5B <c-down>

function! DelEmptyLineAbove()
    if line(".") == 1
        return
    endif
    let l:line = getline(line(".") - 1)
    if l:line =~ '^\s*$'
        let l:colsave = col(".")
        .-1d
        silent normal! <c-y>
        call cursor(line("."), l:colsave)
    endif
endfunction

function! AddEmptyLineAbove()
    let l:scrolloffsave = &scrolloff
    " Avoid jerky scrolling with ^E at top of window
    set scrolloff=0
    call append(line(".") - 1, "")
    if winline() != winheight(0)
        silent normal! <c-e>
    endif
    let &scrolloff = l:scrolloffsave
endfunction

function! DelEmptyLineBelow()
    if line(".") == line("$")
        return
    endif
    let l:line = getline(line(".") + 1)
    if l:line =~ '^\s*$'
        let l:colsave = col(".")
        .+1d
        ''
        call cursor(line("."), l:colsave)
    endif
endfunction

function! AddEmptyLineBelow()
    call append(line("."), "")
endfunction

" Arrow key remapping: Up/Dn = move line up/dn; Left/Right = indent/unindent
function! SetArrowKeysAsTextShifters()
    " normal mode
    nmap <silent> <left> i<c-d><esc>
    nmap <silent> <right> i<c-t><esc>
    nnoremap <silent> <up> <esc>:call DelEmptyLineAbove()<cr>
    nnoremap <silent> <down> <esc>:call AddEmptyLineAbove()<cr>
    nnoremap <silent> <c-up> <esc>:call DelEmptyLineBelow()<cr>
    nnoremap <silent> <c-down> <esc>:call AddEmptyLineBelow()<cr>

    " visual mode
    vmap <silent> <left> <gv
    vmap <silent> <right> >gv
    vnoremap <silent> <up> <esc>:call DelEmptyLineAbove()<cr>gv
    vnoremap <silent> <down> <esc>:call AddEmptyLineAbove()<cr>gv
    vnoremap <silent> <c-up> <esc>:call DelEmptyLineBelow()<cr>gv
    vnoremap <silent> <c-down> <esc>:call AddEmptyLineBelow()<cr>gv

    " insert mode
    imap <silent> <left> <c-d>
    imap <silent> <right> <c-t>
    inoremap <silent> <up> <esc>:call DelEmptyLineAbove()<cr>a
    inoremap <silent> <down> <esc>:call AddEmptyLineAbove()<cr>a
    inoremap <silent> <c-up> <esc>:call DelEmptyLineBelow()<cr>a
    inoremap <silent> <c-down> <esc>:call AddEmptyLineBelow()<cr>a
endfunction

call SetArrowKeysAsTextShifters()


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" VICTORIA SECRET:
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
au BufRead,BufNewFile */victoriassecret/* setl sw=2 et softtabstop=2

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" WRITABILITY:
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
au BufRead,BufNewFile ~/dev/writability/* let g:syntastic_python_checker_args='--max-complexity 10'
