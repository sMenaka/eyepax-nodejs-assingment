import { CreateSlideDto } from "../../dto/create.slide.dto";
import { PatchSlideDto } from "../../dto/patch.slide.dto";
import { PutSlideDto } from "../../dto/put.slide.dto";
import slideModel from "../../models/slide.slide";


class SlideService implements SlideService {

   

    async create(resource: CreateSlideDto) {
        return slideModel.addSlide(resource)
    }

    async list(slides: number) {
        return slideModel.getSlides(slides);
    }

    async patchById(id: string, resource: PatchSlideDto) {
        return await slideModel.updateSlideById(id, resource);
    }

    async readById(id: string) {
        return await slideModel.getSlideById(id);
    }

    async putById(id: string, resource: PutSlideDto) {
        return await slideModel.updateSlideById(id, resource);
    }

    async initSlides(){
        await slideModel.initSlide();
    }
    

}

export default new SlideService();