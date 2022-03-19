#!/usr/bin/env bash
cd backend
npm install
cd ../frontend
npm install
cd ..
npm --prefix backend start & npm --prefix frontend start