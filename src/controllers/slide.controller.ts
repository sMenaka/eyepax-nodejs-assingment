import express from 'express';
import debug from 'debug';
import slideServiceImpl from '../services/impl/slide.service.impl';
const log: debug.IDebugger = debug('app:Slides-controller');

class SlideController {

    async listSlides(req: express.Request, res: express.Response) {
        let noOfSlides = req.query.slides;
        const slides = await slideServiceImpl.list(Number(noOfSlides));
        res.status(200).send(slides);
    }

    async getSlideById(req: express.Request, res: express.Response) {
        const slides = await slideServiceImpl.readById(req.params.slideId);
        res.status(200).send(slides);
    }

    async createSlide(req: express.Request, res: express.Response) {
        const slideId = await slideServiceImpl.create(req.body);
        res.status(201).send({ id: slideId });
    }

    async patch(req: express.Request, res: express.Response) {
        await slideServiceImpl.patchById(req.params.slideId, req.body)
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        await slideServiceImpl.putById(req.params.slideId, req.body)
        res.status(204).send();
    }



}

export default new SlideController();