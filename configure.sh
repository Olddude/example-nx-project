#!/bin/bash
set -e

echo -n 'admin:admin123' | base64 | npm set //localhost:4873/:_authToken /dev/stdin
