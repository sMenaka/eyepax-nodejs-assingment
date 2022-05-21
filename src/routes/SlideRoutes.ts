import { CommonRoutes } from "./CommonRoutes";
import express from "express";
import slideController from "../controllers/slide.controller";
import slideValidator from "../middleware/slide.validator";



export class slideRoutes extends CommonRoutes {

    constructor(app: express.Application) {
        super(app, "slideRoutes")
    }

    configureRoutes() {
        this.app.route(`/api/`)
            .get(slideValidator.slideQueryParamValidator,
                slideController.listSlides
            )
        this.app.route(`/slide/`).post(
            slideController.createSlide);

        this.app.route(`/slide/:slideId`)
            .get(slideController.getSlideById);

        this.app.put(`/slide/:slideId`, [
            slideController.put,
        ]);

        this.app.patch(`/slide/:slideId`, [
            slideController.patch,
        ]);

        this.app.get('/file/:fileName',
            (req: express.Request, res: express.Response) => {
                res.sendFile("images/" + req.params.fileName, { root: "." })
            })

        return this.app;
    }
}