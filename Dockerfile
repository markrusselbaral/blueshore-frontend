FROM node:22.14.0-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Expose Vite's default dev server port
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--", "--host"]
