# API gateway for the application
This Project is a basic demo of an API Gateway implemented in Nodejs.

## Installation 
1. `Run install`
2. `node server.js`

## JWT authorization
### Two types supported
1. Symetric
    a. Shered secret
2. Asymetric
    a. Private key to sign the JWT
    b. Public key to verify the JWT
### In this project we use the Asymetric Algorithm

### Because we are going to use JSON Web Tokens to exchange data about authorized users between services, we need a pair of private and public keys. To generate them with OpenSSL, we execute the following commands in the project root directory.

### Note to Windows users: If we have installed Git, we can find the openssl.exe executable in the C:\Program Files\Git\usr\bin directory. Note that this directory may not be included in our path, so we'll need to add it to the command-line instruction.

### openssl genrsa -out ./auth/private.key 2048
### openssl rsa -pubout -in ./auth/private.key -out ./public.key