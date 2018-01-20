import sys

if __name__ == "__main__":
	print("Hello, World!", file=sys.stdout)
	sys.stdout.flush()
	print("FATAL ERROR", file=sys.stderr)
	sys.stderr.flush()
	sys.exit(1)
