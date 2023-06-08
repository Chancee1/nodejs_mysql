import swaggerJSDoc from "swagger-jsdoc";
const options = {
    openapi: "3.0.0",
    definition: {
      components: {},
      info: {
        title: "Project",
        description:
          "An application (Backend) built using NodeJS and MongoDB",
        version: "1.0.0",
      },
      consumes: ["application/x-www-form-urlencoded", "application/json", "multipart/form-data"],
      produces: ["application/json"],
      schemes: [process.env.NODE_ENV == "production" ? "https" : "http"],
      basePath: "/",
    },
    apis: ["./routes/*.js"],
  };

export const swaggerJsDoc = swaggerJSDoc(options)