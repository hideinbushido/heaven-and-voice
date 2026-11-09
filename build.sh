#!/bin/sh
cd /home/claude/choeur/hv-app && VITE_SHOW_REFS=1 npx vite build 2>&1 | grep -E "error|Error|built" ; cp -r public/m dist/
