#!/bin/bash
cd /home/kavia/workspace/code-generation/fullstack-to-do-tracker-51261-51270/todo_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

