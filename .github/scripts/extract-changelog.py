#!/usr/bin/env python3
"""Extract the changelog section for a given version tag."""
import sys

tag = sys.argv[1] if len(sys.argv) > 1 else ""
# Tags are v0.3.3 but changelog uses [0.3.3] (no v prefix)
version = tag.lstrip("v")

with open("CHANGELOG.md") as f:
    content = f.read()

marker = f"## [{version}]"
start = content.find(marker)
if start < 0:
    print("See CHANGELOG.md for details")
    sys.exit(0)

rest = content[start + len(marker) :]
# Strip the leading " - YYYY-MM-DD" from the header line
if rest.startswith(" - "):
    rest = rest[rest.index("\n") + 1 :]
end = rest.find("## [")
if end >= 0:
    print(rest[:end].strip())
else:
    print(rest.strip())
