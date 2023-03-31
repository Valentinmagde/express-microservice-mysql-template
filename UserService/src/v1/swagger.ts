// In src/v1/swagger.js
import { Application } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from 'express';
import dotenv from "dotenv";

dotenv.config();

class SwaggerDocs {
    public app: Application;
    private port: Number;
    private options: any;
    private swaggerSpec: any;

    constructor(app: Application, port: Number) {
        this.app = app;
        this.port = port;
        // Basic Meta Informations about our API
        this.options = {
            definition: {
                openapi: "3.0.0",
                info: { title: "Crossfit WOD API", version: "1.0.0" },
            },
            apis: ["./src/v1/routes/workoutRoutes.js", "./src/database/Workout.js"],
        };
        // Docs in JSON format
        this.swaggerSpec = swaggerJSDoc(this.options);

        console.log(
            `Version 1 Docs are available on http://localhost:${this.port}/api/v1/users/docs`
        );
    }
    
    public swaggerUiServe() {
        return swaggerUi.serve; 
    };

    // Function to setup our docs
    public swaggerUiSetup() {
        const options = {
            definition: {
                openapi: "3.0.0",
                info: { title: "Crossfit WOD API", version: "1.0.0" },
            },
            apis: ["./src/v1/routes/workoutRoutes.js", "./src/database/Workout.js"],
        };
        // Docs in JSON format
        const swaggerSpec = swaggerJSDoc(options);
        swaggerUi.serve; 
        swaggerUi.setup(swaggerSpec);
        const app = express();
        // Make our docs in JSON format available
        app.get("/api/v1/users/docs.json", (req, res) => {
            res.setHeader("Content-Type", "application/json");
            res.send(swaggerSpec);
        });
    };

    // Function to setup our docs
    public swaggerDocs () {
        // Route-Handler to visit our docs
        this.app.use("/api/v1/users/docs", swaggerUi.serve, swaggerUi.setup(this.swaggerSpec));
        // Make our docs in JSON format available
        this.app.get("/api/v1/users/docs", (req, res) => {
            res.setHeader("Content-Type", "application/json");
            res.send(this.swaggerSpec);
        });
        console.log(
        `Version 1 Docs are available on http://localhost:${this.port}/api/v1/docs`
        );
    };
  
}

// const swaggerDocs = new SwaggerDocs();
export default SwaggerDocs;