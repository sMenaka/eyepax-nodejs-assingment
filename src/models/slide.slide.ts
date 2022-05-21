import { CreateSlideDto } from "../dto/create.slide.dto";
import { PutSlideDto } from "../dto/put.slide.dto";
import { PatchSlideDto } from "../dto/patch.slide.dto";
import debug from 'debug';
import MongoService from "../utils/MongoService";
import shortid from "shortid";
const log: debug.IDebugger = debug('app:in-memory-dao');
const { randomUUID } = require('crypto');

class Slide {
    Schema = MongoService.getMongoose().Schema;

    constructor() {
        log('Created new instance of Slide');
    }

    slideSchema = new this.Schema({
        _id: { type: String},
        image: { type: String, select: true },
        title: { type: String, select: true },
        subTitle: String,
        isDelete: Boolean
    }, { id: false });

    slide = MongoService.getMongoose().model('slide', this.slideSchema);


    async addSlide(slideFields: CreateSlideDto) {
        const slide = new this.slide({
            _id:shortid.generate(),
            ...slideFields,
        });
        await slide.save();
        return slide.id;
    }


    async getSlideById(slideId: string) {
        return this.slide.findOne({ _id: slideId }).exec();
    }

    async getSlides(slide: number) {
        return this.slide.find()
            .limit(slide)
            .exec();
    }

    async updateSlideById(
        slideId: string,
        slideFields: PatchSlideDto | PutSlideDto
    ) {
        
         await this.slide.findOneAndUpdate(
            { _id: slideId },
            { $set: slideFields },
            { new: true }
        ).exec();
        return "SuccessFully Updated";
    }

    async initSlide(){
        for (let i = 1; i < 11; i++) {
            await new this.slide({
                _id:shortid.generate(),
                image: "localhost:3600/file/test_"+i+".jpg",
                title:"Strong mask"+i,
                subTitle:"Secondary text"+i
            }).save()
          }
    }

}

export default new Slide();