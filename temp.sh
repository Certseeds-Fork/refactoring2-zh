for i in {1..31}; do
  src="./docs/ch1-src/$i/docs"
  if [ -d "$src" ]; then
    rmdir "$src"
  fi
done