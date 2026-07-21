# PowerShell sample — comprehensive feature coverage.
# Highlights: variable punctuation (grey), functions/attributes (yellow),
# strings/heredoc (green), members (aqua).

[CmdletBinding()]
param()

$MaxRetries = 3
$CacheDir = "$HOME/.cache/ravenwood"

if (-not (Test-Path $CacheDir)) {
    New-Item -ItemType Directory -Path $CacheDir | Out-Null
}

class User {
    [int]$Id
    [string]$Name
    [string[]]$Roles

    User([int]$id, [string]$name) {
        $this.Id = $id
        $this.Name = $name
        $this.Roles = @()
    }
}

class UserRepo {
    hidden [hashtable]$Cache = @{}

    [User] Find([int]$id) {
        return $this.Cache[$id]
    }

    [void] Save([User]$user) {
        $this.Cache[$user.Id] = $user
    }
}

$repo = [UserRepo]::new()
$repo.Save([User]::new(1, "Alice"))
$user = $repo.Find(1)
Write-Host "Found: $(if ($user) { $user.Name } else { 'none' })"

@"
Configuration: retries=$MaxRetries, cache=$CacheDir
"@ | Write-Host