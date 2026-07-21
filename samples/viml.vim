" VimL sample — comprehensive feature coverage.
" Highlights: map punctuation (grey), map storage (orange),
" map constants/keys (green), special map constants (blue).

let g:ravenwood_max_retries = 3
let s:cache = {}

function! ravenwood#save_user(id, name) abort
  let s:cache[a:id] = a:name
  echo "Saved user " . a:id
endfunction

function! ravenwood#find_user(id) abort
  return get(s:cache, a:id, 'none')
endfunction

nnoremap <leader>u :call ravenwood#save_user(1, 'Alice')<CR>
vnoremap <leader>f :call ravenwood#find_user(1)<CR>

augroup ravenwood
  autocmd!
  autocmd BufWritePost *.ts :echo "saved"
augroup END