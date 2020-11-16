#!/bin/bash

# configure application prior to build
if test -f ".env"; then
  export $(cat .env | xargs)
fi

# test availability of environment variables
#if [ -z "$OML_APIKEY" ]; then echo "Environment variable OML_APIKEY is unset or empty." && exit 1; fi
#if [ -z "$TWINE_PASSWORD" ]; then echo "Environment variable TWINE_PASSWORD is unset or empty." && exit 1; fi

if test -d "dist"; then
	rm dist/* -r
fi

echo "build starting..."
