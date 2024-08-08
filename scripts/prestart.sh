#!/bin/bash

npm run migrate &
wait &
npm run seed