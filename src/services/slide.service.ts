export interface SlideService {
    list: (slide: string) => Promise<any>;
    create: (resource: any) => Promise<any>;
    putById: (id: string, resource: any) => Promise<string>;
    readById: (id: string) => Promise<any>;
    patchById: (id: string, resource: any) => Promise<string>;
    deleteById:(id: string)=> Promise<void>;

}