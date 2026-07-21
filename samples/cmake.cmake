# CMake sample — comprehensive feature coverage.
# Highlights: strings (green), entities (aqua), storage (purple).

cmake_minimum_required(VERSION 3.20)
project(Ravenwood VERSION 0.3.0 LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(SOURCES main.cpp user.cpp repo.cpp)

find_package(Threads REQUIRED)

add_executable(ravenwood ${SOURCES})
target_link_libraries(ravenwood PRIVATE Threads::Threads)

if(CMAKE_BUILD_TYPE STREQUAL "Debug")
    target_compile_definitions(ravenwood PRIVATE DEBUG=1)
endif()

install(TARGETS ravenwood DESTINATION bin)