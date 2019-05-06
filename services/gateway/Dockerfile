FROM node:latest

# Set working directory
WORKDIR /gateway/app

# Add `gateway/src/node_modules/.bin` to $PATH
ENV PATH /usr/src/node_modules/.bin:$PATH

# Install and cache app dependencies
ADD package.json /gateway/app/package.json
RUN npm install

COPY . .
EXPOSE 3010

# Start app
CMD ["npm", "start"]
