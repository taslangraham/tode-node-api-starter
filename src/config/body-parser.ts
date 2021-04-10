import express, { Application } from "express";

/**
 * Configure body parse for Application.
 * You can make changes as necessary
 * @param app - Express Applocation instamce
 */
export const loadBodyParser = (app: Application) => {
    // Used to parse JSON bodies
    app.use(express.urlencoded({ extended: true }));
    // Parse URL-encoded bodies
    app.use(express.json());
};
