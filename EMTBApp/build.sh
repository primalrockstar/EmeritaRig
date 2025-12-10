#!/bin/bash
set -e
cd ProMedixEMS-main
npm ci --legacy-peer-deps
npm run build