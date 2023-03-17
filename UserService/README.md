# User Service Testing Git Merge
As the title suggests, This service will demonstrate the user related APIs.

## Install Redis on Windows
1. Install WSL command by runing `wsl --install`
2. Restart your computer to set up your Linux user info `usename` and `password`
3. Install Redis by following these steps:
    a. `curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg`

    b. `echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list`

    c. `sudo apt-get update`
    d. `sudo apt-get install redis`

## Installation 
1. `Run install`
2. `node server.js`
