FROM node:18-alpine

# Create working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy project files
COPY . .

# Expose API port
EXPOSE 4000
    
# Start server
CMD ["node", "server.js"]