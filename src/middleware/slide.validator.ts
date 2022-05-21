import express from 'express';
import slideServiceImpl from '../services/impl/slide.service.impl';
import debug from 'debug';

const log: debug.IDebugger = debug('app:slide-controller');

class slideValidation {

    async slideQueryParamValidator(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        try{
            Number(req.query.slides)
        }catch(err){
            res.status(400).send({
                error: `slides should be number.`,
            });
        }
     
        if (req.query.slides &&  Number(req.query.slides)<=10 && Number(req.query.slides)>0 ) {

            next();
        } else {
            res.status(400).send({
                error: `Query slides must have between 1-10 `,
            });
        }
    }



}

export default new slideValidation();