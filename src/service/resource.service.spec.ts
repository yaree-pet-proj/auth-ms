import {randomUUID} from "node:crypto";
import {isUUID} from "class-validator";
import {ResourceService} from "./resource.service";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";
import {ResourceEntity} from "../entity/resource.entity";

const mockResourceService = {
    find: jest.fn(async () => {
        return Promise.resolve([
            {id: randomUUID(), name: 'user'},
            {id: randomUUID(), name: 'admin'},
            {id: randomUUID(), name: 'test'},
        ]);
    }),
    findOne: jest.fn(async (x) => {
        if (!isUUID(x.where.id, 4)) {
            return Promise.resolve(undefined);
        }
        return Promise.resolve({id: x, name: 'test'});
    })
}

describe("Resource Service", () => {
    let service: ResourceService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ResourceService,
                {
                    provide: getRepositoryToken(ResourceEntity),
                    useValue: mockResourceService
                }
            ]
        }).compile();

        service = module.get(ResourceService);
    });
    it('Should be defined', () => {
        expect(service).toBeDefined();
    });
    it('Should return all values', async () => {
        const result = await service.findAll();
        expect(result).toEqual(expect.arrayContaining([
            expect.objectContaining({name: 'user'}),
            expect.objectContaining({name: 'admin'}),
            expect.objectContaining({name: 'test'}),
        ]));
    });
    it('Should return undefined if invalid uuid', async () => {
        const result = await service.findOne('test-id');
        expect(result).toBeUndefined();
    });
    it('Should return one', async () => {
        const result = await service.findOne(randomUUID());
        expect(result).toBeDefined();
        expect(result.name).toEqual('test');
    });
});