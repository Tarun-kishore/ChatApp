let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Documents/Coding/webDev/Rob\ Percival\ node\ js\ course/chat-app
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +36 src/public/chat.html
badd +69 src/public/js/chat.js
badd +65 src/index.js
badd +3 src/db/connection.js
badd +47 src/utils/errorPage.js
badd +17 src/utils/users.js
badd +1407 term://~/Documents/Coding/webDev/Rob\ Percival\ node\ js\ course/chat-app//19780:C:/windows/system32/cmd.exe
badd +1 src/utils/user.js
badd +1 src/js/chat.js
argglobal
%argdel
edit src/index.js
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
2wincmd h
wincmd w
wincmd w
wincmd _ | wincmd |
split
wincmd _ | wincmd |
split
2wincmd k
wincmd w
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 31 + 87) / 174)
exe 'vert 2resize ' . ((&columns * 66 + 87) / 174)
exe '3resize ' . ((&lines * 14 + 23) / 47)
exe 'vert 3resize ' . ((&columns * 75 + 87) / 174)
exe '4resize ' . ((&lines * 14 + 23) / 47)
exe 'vert 4resize ' . ((&columns * 57 + 87) / 174)
exe '5resize ' . ((&lines * 14 + 23) / 47)
exe 'vert 5resize ' . ((&columns * 17 + 87) / 174)
exe '6resize ' . ((&lines * 13 + 23) / 47)
exe 'vert 6resize ' . ((&columns * 75 + 87) / 174)
argglobal
enew
file NERD_tree_1
balt term://~/Documents/Coding/webDev/Rob\ Percival\ node\ js\ course/chat-app//19780:C:/windows/system32/cmd.exe
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal nofen
wincmd w
argglobal
balt src/utils/users.js
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 66 - ((26 * winheight(0) + 21) / 43)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 66
normal! 07|
wincmd w
argglobal
if bufexists("term://~/Documents/Coding/webDev/Rob\ Percival\ node\ js\ course/chat-app//19780:C:/windows/system32/cmd.exe") | buffer term://~/Documents/Coding/webDev/Rob\ Percival\ node\ js\ course/chat-app//19780:C:/windows/system32/cmd.exe | else | edit term://~/Documents/Coding/webDev/Rob\ Percival\ node\ js\ course/chat-app//19780:C:/windows/system32/cmd.exe | endif
if &buftype ==# 'terminal'
  silent file term://~/Documents/Coding/webDev/Rob\ Percival\ node\ js\ course/chat-app//19780:C:/windows/system32/cmd.exe
endif
balt src/index.js
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 1493 - ((13 * winheight(0) + 7) / 14)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 1493
normal! 07|
wincmd w
argglobal
if bufexists("src/public/js/chat.js") | buffer src/public/js/chat.js | else | edit src/public/js/chat.js | endif
if &buftype ==# 'terminal'
  silent file src/public/js/chat.js
endif
balt src/js/chat.js
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 69 - ((7 * winheight(0) + 7) / 14)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 69
normal! 021|
wincmd w
argglobal
if bufexists("src/public/chat.html") | buffer src/public/chat.html | else | edit src/public/chat.html | endif
if &buftype ==# 'terminal'
  silent file src/public/chat.html
endif
balt src/public/js/chat.js
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 88 - ((5 * winheight(0) + 7) / 14)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 88
normal! 031|
wincmd w
argglobal
if bufexists("src/utils/users.js") | buffer src/utils/users.js | else | edit src/utils/users.js | endif
if &buftype ==# 'terminal'
  silent file src/utils/users.js
endif
balt src/utils/user.js
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 8 - ((0 * winheight(0) + 6) / 13)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 8
normal! 015|
wincmd w
3wincmd w
exe 'vert 1resize ' . ((&columns * 31 + 87) / 174)
exe 'vert 2resize ' . ((&columns * 66 + 87) / 174)
exe '3resize ' . ((&lines * 14 + 23) / 47)
exe 'vert 3resize ' . ((&columns * 75 + 87) / 174)
exe '4resize ' . ((&lines * 14 + 23) / 47)
exe 'vert 4resize ' . ((&columns * 57 + 87) / 174)
exe '5resize ' . ((&lines * 14 + 23) / 47)
exe 'vert 5resize ' . ((&columns * 17 + 87) / 174)
exe '6resize ' . ((&lines * 13 + 23) / 47)
exe 'vert 6resize ' . ((&columns * 75 + 87) / 174)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0&& getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToOFc
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
