# CMake sample — comprehensive feature coverage.
# Highlights: strings (yellow), functions (green), keywords (red),
# operators (orange), variables (blue/aqua), constants (purple),
# delimiters (grey).

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

# Additional coverage: elseif, foreach, while, function, macro, options
option(BUILD_TESTS "Build test suite" OFF)

if(BUILD_TESTS)
    enable_testing()
    add_subdirectory(tests)
elseif(CMAKE_BUILD_TYPE STREQUAL "Release")
    set(CMAKE_CXX_FLAGS_RELEASE "-O3 -DNDEBUG")
endif()

foreach(LANG IN ITEMS C CXX)
    message(STATUS "Enabling language: ${LANG}")
endforeach()

function(ravenwood_setup TARGET)
    target_include_directories(${TARGET} PUBLIC include)
    target_compile_options(${TARGET} PRIVATE -Wall -Wextra)
endfunction()

ravenwood_setup(ravenwood)

macro(ravenwood_guard VAR)
    if(NOT ${VAR})
        message(FATAL_ERROR "Missing required variable: ${VAR}")
    endif()
endmacro()
