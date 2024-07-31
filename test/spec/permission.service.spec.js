const {
    describe,
    beforeEach,
    it,
    expect
} = require('@jest/globals');
const {randomUUID} = require("node:crypto");
const {isUUID} = require("class-validator");
const {createPermissionServiceFixture} = require("../fixture/permission.service.fixture");

describe('PermissionService', () => {

    let fixture;

    beforeEach(async () => {
        fixture = await createPermissionServiceFixture();
    });

    it("Should be defined", () => {
        expect(fixture.permissionService).toBeDefined();
    });

    describe('findAll', () => {
        it('should return records', async () => {
            let actualResult = await fixture.permissionService.findAll('test');
            expect(actualResult.length).toEqual(2);
        });
        it('should return mocked data', async () => {
            let actualResult = await fixture.permissionService.findAll('test');
            actualResult.forEach(permission => {
                expect(isUUID(permission.id)).toBeTruthy();
                expect(isUUID(permission.action_id)).toBeTruthy();
                expect(permission.resource_id).toEqual('test');
            });
        });
    });

    describe('createOne', () => {
        it('should return created record', async () => {
            const resourceId = randomUUID();
            const response = await fixture.permissionService.createOne({
                resource_id: resourceId
            });
            expect(isUUID(response.id)).toBeTruthy();
            expect(isUUID(response.action_id)).toBeTruthy();
            expect(response.resource_id).toEqual(resourceId);
        });
        it('should create one', async () => {
            const resourceId = randomUUID();
            await fixture.permissionService.createOne({
                resource_id: resourceId
            });
            let response = await fixture.permissionService.findAll(resourceId);
            expect(response.length).toEqual(1);
            expect(response.every(item => item.resource_id === resourceId)).toEqual(true);
        });
    });

    describe('deleteOne', () => {
        it('should delete one', async () => {
            let repo = await fixture.permissionService.findAll('delete');
            let response = await fixture.permissionService.deleteOne(repo[0].id);
            expect(response).toEqual(1);
        });
        it("should not delete one", async () => {
            let response = await fixture.permissionService.deleteOne('invalid');
            expect(response).toEqual(0);
        });
        it('should remove record from repo', async () => {
            const repo = await fixture.permissionService.findAll('test');
            await fixture.permissionService.deleteOne(repo[0].id);
            let response = await fixture.permissionService.findAll('test');
            expect(response.length).toEqual(1);
        });
    });

});
