# Elixir sample — comprehensive feature coverage.
# Highlights: module variables (aqua), constants (blue), module keyword (purple).

defmodule Ravenwood do
  @max_retries 3

  defmodule User do
    defstruct [:id, :name, roles: []]
  end

  defmodule UserRepo do
    use Agent

    def start_link(_opts), do: Agent.start_link(fn -> %{} end, name: __MODULE__)

    def find(id), do: Agent.get(__MODULE__, &Map.get(&1, id))

    def save(%User{id: id} = user),
      do: Agent.update(__MODULE__, &Map.put(&1, id, user))
  end

  def run do
    {:ok, _pid} = UserRepo.start_link([])
    UserRepo.save(%User{id: 1, name: "Alice"})
    case UserRepo.find(1) do
      %User{name: name} -> IO.puts("Found: #{name}")
      nil               -> IO.puts("none")
    end
  end
end