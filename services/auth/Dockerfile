FROM node:latest

# Set working directory
WORKDIR /account/app

# Add `account/src/node_modules/.bin` to $PATH
ENV PATH /usr/src/node_modules/.bin:$PATH
ENV dbService mongodb
ENV dbAddress mongo
# Install and cache app dependencies
ADD package.json /account/app/package.json

RUN npm install

COPY . .
EXPOSE 3030

# Start app
CMD ["npm", "start"]
