FROM node:24.0.2-alpine3.20

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE ${NEXT_PUBLIC_FRONTEND_PORT:-4000}

# Start the application
CMD ["npm", "run", "dev"]
