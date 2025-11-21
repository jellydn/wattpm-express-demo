FROM node:22.21.1-alpine as builder

# Set up working directory
RUN mkdir /app
WORKDIR /app

# Upgrade and install git
RUN apk --no-cache add git

# Copy essential files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml watt.json ./
COPY apps apps

# Install dependencies and build
RUN npm install -g pnpm
RUN pnpm install
ENV NODE_ENV=production
RUN pnpm run build

# Set up the production image
FROM node:22.21.1-alpine
WORKDIR /app

# Copy build output from builder
#
COPY --from=builder /app .

# Expose port for health check with fly.io
EXPOSE 3042/tcp

# Set SERVER_HOSTNAME environment variable
ENV PORT=3042

# Start the application
CMD ["npm", "run", "start"]