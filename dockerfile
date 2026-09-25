# ships with npm 11
FROM node:22-slim
WORKDIR /app

# Make sure the container is kept open (does not exit right away)
CMD ["tail", "-f", "/dev/null"]
