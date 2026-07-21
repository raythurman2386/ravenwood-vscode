# Makefile sample — comprehensive feature coverage.
# Highlights: targets (orange), variables (yellow), prerequisites (green).

CC = gcc
CFLAGS = -Wall -O2 -g
TARGET = ravenwood
SRC = main.c user.c repo.c
OBJ = $(SRC:.c=.o)

$(TARGET): $(OBJ)
	$(CC) $(CFLAGS) -o $@ $^

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(OBJ) $(TARGET)

test: $(TARGET)
	./$(TARGET) --test

.PHONY: clean test