# ships with npm 11
FROM node:22-slim

WORKDIR /app

# Keep the container open so npm commands can be run inside it.
CMD ["sleep", "infinity"]
