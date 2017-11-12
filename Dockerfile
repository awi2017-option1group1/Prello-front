FROM node:8.7.0

# Add ENV to compile the React App
ENV NODE_ENV="production"

# Create app directory
RUN mkdir -p /src/app
WORKDIR /src/app

# Install serve
RUN npm install -g serve

# Install app dependencies
COPY package.json /src/app/
RUN npm install --dev

# Bundle app source
COPY . /src/app

# Build and optimize react app
RUN npm run build
RUN find ./build -name '*.map' -delete

# Set the command to start the node server.
CMD serve -s build
