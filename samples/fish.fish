# Fish sample — comprehensive feature coverage.
# Highlights: builtins (red), unix functions (orange), variables (blue),
# strings (green), escapes (purple).

set MAX_RETRIES 3
set CACHE_DIR "$HOME/.cache/ravenwood"

if not test -d "$CACHE_DIR"
    mkdir -p "$CACHE_DIR"
end

function save_user
    set id $argv[1]
    set name $argv[2]
    echo "$name" > "$CACHE_DIR/user_$id"
    echo "Saved user $id"
end

function find_user
    set id $argv[1]
    if test -f "$CACHE_DIR/user_$id"
        cat "$CACHE_DIR/user_$id"
    else
        echo "none"
    end
end

save_user 1 "Alice"
echo "Found: "(find_user 1)