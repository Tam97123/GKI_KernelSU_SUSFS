#!/bin/bash
# Deploy script for GitHub Pages
# This script copies the necessary data files and builds the frontend

set -e

echo "🔨 Building frontend..."
npm run build

echo "📦 Copying data files..."
mkdir -p dist/data
cp -r ../data/* dist/data/

echo "✅ Build complete! Output in dist/"
echo "📊 Build statistics:"
du -sh dist/
echo ""
echo "Files:"
ls -lh dist/ | tail -n +2
