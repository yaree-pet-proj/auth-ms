const {
    describe,
    beforeEach,
    it,
    expect
} = require('@jest/globals');
const {createResourceServiceFixture} = require("../fixture/resource.service.fixture");
const {isUUID} = require("class-validator");
const {randomUUID} = require("node:crypto");

describe("ResourceService", () => {

    let fixture;

    beforeEach(async () => {
        fixture = await createResourceServiceFixture();
    });

    it('should be defined', () => {
        expect(fixture.resourceService).toBeDefined();
    });

    describe('findAll', () => {
        it('should return all records', async () => {
            let actualResult = await fixture.resourceService.findAll();
            expect(actualResult.length).toEqual(4);
        });
        it('should return records with populated uuid', async () => {
            let actualResult = await fixture.resourceService.findAll();
            actualResult.forEach(action => {
                expect(isUUID(action.id)).toBeTruthy();
            });
        });
        it('should return mocked data', async () => {
            let actualResult = await fixture.resourceService.findAll();
            expect(actualResult).toEqual(expect.arrayContaining([
                expect.objectContaining({name: 'admin'}),
                expect.objectContaining({name: 'user'}),
                expect.objectContaining({name: 'delete'}),
            ]));
        });
    });

    describe('findOne', () => {
        it('should return undefined for invalid uuid', async () => {
            let actualResult = await fixture.resourceService.findOne('qwe');
            expect(actualResult).toBeUndefined();
        });
        it('should return undefined if record doesnt exist', async () => {
            let actualResult = await fixture.resourceService.findOne(randomUUID());
            expect(actualResult).toBeUndefined();
        });
        it('should return one', async () => {
            let repo = await fixture.resourceService.findAll();
            let actualResult = await fixture.resourceService.findOne(repo[0].id);
            expect(actualResult).toEqual(repo[0]);
        });
    });

    describe('createOne', () => {
        it('should return created record', async () => {
            const response = await fixture.resourceService.createOne('test');
            expect(isUUID(response.id)).toBeTruthy();
            expect(response.name).toEqual('test');
        });
        it('should create one', async () => {
            let beforeCreate = await fixture.resourceService.findAll();
            let created = await fixture.resourceService.createOne('test');
            let afterCreate = await fixture.resourceService.findAll();
            expect(beforeCreate.length).toBeLessThan(afterCreate.length);
            expect(afterCreate).toEqual(expect.arrayContaining([
                expect.objectContaining(created)
            ]));
        });
    });

    describe('destroyOne', () => {
        it('should delete one', async () => {
            let repo = await fixture.resourceService.findAll();
            let response = await fixture.resourceService.deleteOne(repo[0].id);
            expect(response).toEqual(1);
        });
        it("should not delete one", async () => {
            let response = await fixture.resourceService.deleteOne('invalid');
            expect(response).toEqual(0);
        });
        it('should remove record from repo', async () => {
            const repo = await fixture.resourceService.findAll();
            await fixture.resourceService.deleteOne(repo[0].id);
            let response = await fixture.resourceService.findAll();
            expect(response).not.toEqual(expect.arrayContaining([
                expect.objectContaining(repo[0])
            ]));
        });
    });

    describe('updateOne', () => {
        it('should update record', async () => {
            const beforeUpdate = await fixture.resourceService.findAll();
            const updatedResponse = await fixture.resourceService.updateOne(beforeUpdate[0].id, 'updated value');
            const updatedValue = updatedResponse[1][0];
            const afterUpdate = await fixture.resourceService.findAll();
            expect(afterUpdate).toEqual(expect.arrayContaining([
                expect.objectContaining(updatedValue)
            ]));
        });
        it('should return updated record in response', async () => {
            const repo = await fixture.resourceService.findAll();
            const result = await fixture.resourceService.updateOne(repo[0].id, 'updated value');
            expect(result[0]).toEqual(1);
            expect(result[1].length).toEqual(1);
            expect(result[1][0]).toEqual({id: repo[0].id, name: 'updated value'});
        });
    });

});
