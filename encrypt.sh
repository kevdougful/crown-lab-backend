#!/bin/bash

if [ -z "$GITHUB_TOKEN" ]; then
  echo "GitHub Personal Access Token:"
  read token
  export GITHUB_TOKEN=$token
fi

token=$(heroku auth:token)
if [ $? -eq 0 ]; then
  echo "Heroku Access Token:"
  read token
  export HEROKU_TOKEN=$token
fi

if [ -z "$MONGODB_URI" ]; then
  export MONGODB_URI="mongodb://localhost:27017"
fi
