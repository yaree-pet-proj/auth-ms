const {
    describe,
    beforeEach,
    it,
    expect
} = require('@jest/globals');
const {randomUUID} = require("node:crypto");
const {createActionServiceFixture} = require("../fixture/action.service.fixture");
const {isUUID} = require("class-validator");

describe("ActionService", () => {

    let fixture;

    beforeEach(async () => {
        fixture = await createActionServiceFixture();
    });

    it('should be defined', () => {
        expect(fixture.actionService).toBeDefined();
    });

    describe("findAll", () => {
        it('should return all records', async () => {
            let actualResult = await fixture.actionService.findAll();
            expect(actualResult.length).toEqual(4);
        });
        it('should return records with populated uuid', async () => {
            let actualResult = await fixture.actionService.findAll();
            actualResult.forEach(action => {
                expect(isUUID(action.id)).toBeTruthy();
            });
        });
        it('should return mocked data', async () => {
            let actualResult = await fixture.actionService.findAll();
            expect(actualResult).toEqual(expect.arrayContaining([
                expect.objectContaining({name: 'create'}),
                expect.objectContaining({name: 'read'}),
                expect.objectContaining({name: 'update'}),
                expect.objectContaining({name: 'delete'}),
            ]));
        });
    });

    describe("findOne", () => {
        it('should return undefined for invalid uuid', async () => {
            let actualResult = await fixture.actionService.findOne('qwe');
            expect(actualResult).toBeUndefined();
        });
        it('should return undefined if record doesnt exist', async () => {
            let actualResult = await fixture.actionService.findOne(randomUUID());
            expect(actualResult).toBeUndefined();
        });
        it('should return one', async () => {
            let repo = await fixture.actionService.findAll();
            let actualResult = await fixture.actionService.findOne(repo[0].id);
            expect(actualResult).toEqual(repo[0]);
        });
    });

});
