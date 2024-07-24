import {ActionService} from "./action.service";
import {Repository} from "typeorm";
import {ActionsEntity} from "../entity/actions.entity";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";
import {randomUUID} from "node:crypto";
import {isUUID} from "class-validator";

export const mockActionService = {
    find: jest.fn(async () => {
        return Promise.resolve([
            {id: randomUUID(), name: 'create'},
            {id: randomUUID(), name: 'read'},
            {id: randomUUID(), name: 'update'},
            {id: randomUUID(), name: 'delete'}
        ]);
    }),
    findOne: jest.fn(async (x) => {
        if (!isUUID(x.where.id, 4)) {
            return Promise.resolve(undefined);
        }
        return Promise.resolve({id: x, name: 'test'});
    })
}

describe("Actions Service", () => {
    let service: ActionService;
    let repository: Repository<ActionsEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ActionService,
                {
                    provide: getRepositoryToken(ActionsEntity),
                    useValue: mockActionService
                }
            ]
        }).compile();

        service = module.get(ActionService);
        repository = module.get(getRepositoryToken(ActionsEntity));
    });
    it('Should be defined', () => {
        expect(service).toBeDefined();
    });
    it('Should return all values', async () => {
        let result = await service.findAll();
        expect(result).toEqual(expect.arrayContaining([
            expect.objectContaining({name: 'create'}),
            expect.objectContaining({name: 'read'}),
            expect.objectContaining({name: 'update'}),
            expect.objectContaining({name: 'delete'}),
        ]));
    });
    it('Should return undefined if invalid uuid', async () => {
        let result = await service.findOne('test');
        expect(result).toBeUndefined();
    });
    it('Should return one', async () => {
        let result = await service.findOne(randomUUID());
        expect(result).toBeDefined();
        expect(result.name).toEqual('test');
    });
});