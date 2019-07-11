#!/bin/bash
docker pull raulsms/test-queue-message-array
docker run -p 3000:3000 -d raulsms/test-queue-message-array