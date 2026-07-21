#!/usr/bin/perl
# Perl sample — comprehensive feature coverage.
# Highlights: sub/declare (red).

use strict;
use warnings;

use constant MAX_RETRIES => 3;

package Ravenwood::User {
    sub new {
        my ($class, %args) = @_;
        return bless { id => $args{id}, name => $args{name}, roles => [] }, $class;
    }
    sub add_role {
        my ($self, $role) = @_;
        push @{$self->{roles}}, $role;
    }
}

package Ravenwood::UserRepo {
    sub new {
        my ($class) = @_;
        return bless { cache => {} }, $class;
    }
    sub find {
        my ($self, $id) = @_;
        return $self->{cache}{$id};
    }
    sub save {
        my ($self, $user) = @_;
        $self->{cache}{$user->{id}} = $user;
    }
}

my $repo = Ravenwood::UserRepo->new();
$repo->save(Ravenwood::User->new(id => 1, name => "Alice"));
my $user = $repo->find(1);
print "Found: ", (defined $user ? $user->{name} : "none"), "\n";