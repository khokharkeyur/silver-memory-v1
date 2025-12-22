import express from "express";
import userRouter from "./user.js";
import taskRouter from "./tesk.js";

export const setupRoutes = (app) => {
  app.use("/user", userRouter);
  app.use("/task", taskRouter);
};
