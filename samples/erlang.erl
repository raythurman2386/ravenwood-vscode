%% Erlang sample — comprehensive feature coverage.
%% Highlights: module-function separator/directive begin (grey), directives/define (red),
%% module class (yellow), strings (green), export/module/import/behaviour (purple).

-module(ravenwood).
-behaviour(application).
-export([start/2, find_user/2, save_user/2]).

-define(MAX_RETRIES, 3).
-type role() :: admin | user.
-record(user, {id :: integer(), name :: string(), roles = [] :: [role()]}).

start(_Type, _Args) ->
    {ok, #{}}.

-spec save_user(pid(), #user{}) -> ok.
save_user(Pid, User) ->
    Pid ! {save, User},
    ok.

-spec find_user(pid(), integer()) -> {ok, #user{}} | {error, not_found}.
find_user(Pid, Id) ->
    Pid ! {find, Id, self()},
    receive
        {ok, User} -> {ok, User};
        not_found  -> {error, not_found}
    after 1000 -> {error, timeout}
    end.

main() ->
    Repo = spawn(fun() -> loop(#{}) end),
    save_user(Repo, #user{id = 1, name = "Alice"}),
    case find_user(Repo, 1) of
        {ok, U} -> io:format("Found: ~s~n", [U#user.name]);
        _       -> io:format("none~n")
    end.

loop(Cache) ->
    receive
        {save, U} -> loop(maps:put(U#user.id, U, Cache));
        {find, Id, From} ->
            case maps:find(Id, Cache) of
                {ok, U} -> From ! {ok, U};
                error   -> From ! not_found
            end,
            loop(Cache)
    end.