#!/bin/bash
# Shell sample — comprehensive feature coverage.
# Highlights: if-block/group (white), builtins/functions (yellow),
# strings/heredoc (green), heredoc tokens/variables (purple).

MAX_RETRIES=3
CACHE_DIR="${HOME}/.cache/ravenwood"

if [[ ! -d "$CACHE_DIR" ]]; then
    mkdir -p "$CACHE_DIR"
fi

function save_user() {
    local id="$1"
    local name="$2"
    local file="${CACHE_DIR}/user_${id}"
    echo "${name}" > "$file"
    echo "Saved user ${id}"
}

function find_user() {
    local id="$1"
    local file="${CACHE_DIR}/user_${id}"
    if [[ -f "$file" ]]; then
        cat "$file"
    else
        echo "none"
    fi
}

save_user 1 "Alice"
echo "Found: $(find_user 1)"

cat <<EOF
Configuration: retries=${MAX_RETRIES}, cache=${CACHE_DIR}
EOF