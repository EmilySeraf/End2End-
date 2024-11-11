require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/connector");
const cookieParser = require("cookie-parser");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./docs/auth.yaml'); // O caminho para o seu arquivo YAML

const app = express();
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    // Aguarda a conexão com o banco de dados
    await connectDB(); 
    console.log("MongoDB Connected");

    // Configuração de rotas e middlewares
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use(
      cors({
        origin: [process.env.client_url, process.env.prod_url],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      })
    );
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Definição de rotas
    const landingpageRoute = require("./routers/landing_page");
    const projectsRoute = require("./routers/projects");
    const tasksRoute = require("./routers/tasks");
    const usersRoute = require("./routers/user");
    const authRoute = require("./routers/auth");
    const commentsRoute = require("./routers/comments");

    app.use("/", landingpageRoute);
    app.use("/projects", projectsRoute);
    app.use("/tasks", tasksRoute);
    app.use("/users", usersRoute);
    app.use("/auth", authRoute);
    app.use("/comments", commentsRoute);

    app.use((err, req, res, next) => {
      const statusCode = err.statusCode || 500;
      const message = err.message || "Internal Server Error ";
      res.status(statusCode).json({ success: false, statusCode, message });
    });

    // Inicia o servidor apenas após a conexão com o banco de dados
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Sai do processo se a conexão falhar
  }
};

startServer();
