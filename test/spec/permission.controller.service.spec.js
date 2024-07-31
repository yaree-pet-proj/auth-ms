const {
    beforeEach,
    describe,
    expect,
    it
} = require("@jest/globals");
const {createPermissionControllerFixture} = require("../fixture/permission.controller.fixture");
const {isUUID} = require("class-validator");
const {randomUUID} = require("node:crypto");
const {Error} = require("sequelize");
const {BadRequestException} = require("@nestjs/common");

describe("Permission Controller", () => {

    let fixture;

    beforeEach(async () => {
        fixture = await createPermissionControllerFixture();
    })

    it('should be defined', () => {
        expect(fixture.permissionService).toBeDefined();
        expect(fixture.actionService).toBeDefined();
        expect(fixture.resourceService).toBeDefined();
        expect(fixture.permissionController).toBeDefined();
    });
    describe("Actions API", () => {

        describe("/actions endpoint", () => {
            it('should return all records', async () => {
                let actualResult = await fixture.permissionController.findAllActions();
                expect(actualResult.length).toEqual(4);
            });
            it('should return records with populated uuid', async () => {
                let actualResult = await fixture.permissionController.findAllActions();
                actualResult.forEach(action => {
                    expect(isUUID(action.id)).toBeTruthy();
                });
            });
            it('should return mocked data', async () => {
                let actualResult = await fixture.permissionController.findAllActions();
                expect(actualResult).toEqual(expect.arrayContaining([
                    expect.objectContaining({name: 'create'}),
                    expect.objectContaining({name: 'read'}),
                    expect.objectContaining({name: 'update'}),
                    expect.objectContaining({name: 'delete'}),
                ]));
            });
        });

        describe("/actions/:id endpoint", () => {
            it('should throw error for invalid uuid', async () => {
                fixture.permissionController.findOneAction('qwe').then(() => {
                    throw Error("expected to fail but passed");
                }).catch(error => {
                    expect(error).toBeInstanceOf(BadRequestException);
                    expect(error.status).toEqual(400);
                    expect(error.response.message).toEqual('record doesn\'t exist');
                });
            });
            it('should throw error if record doesnt exist', async () => {
                fixture.permissionController.findOneAction(randomUUID()).then(() => {
                    throw Error("expected to fail but passed");
                }).catch(error => {
                    expect(error).toBeInstanceOf(BadRequestException);
                    expect(error.status).toEqual(400);
                    expect(error.response.message).toEqual('record doesn\'t exist');
                });
            });
            it('should return one', async () => {
                let repo = await fixture.actionService.findAll();
                let actualResult = await fixture.permissionController.findOneAction(repo[0].id);
                expect(actualResult).toEqual(repo[0]);
            });
        });

        describe("/resources endpoint", () => {

            describe("get", () => {
                it('should return all records', async () => {
                    let actualResult = await fixture.permissionController.findAllResources();
                    expect(actualResult.length).toEqual(4);
                });
                it('should return records with populated uuid', async () => {
                    let actualResult = await fixture.permissionController.findAllResources();
                    actualResult.forEach(action => {
                        expect(isUUID(action.id)).toBeTruthy();
                    });
                });
                it('should return mocked data', async () => {
                    let actualResult = await fixture.permissionController.findAllResources();
                    expect(actualResult).toEqual(expect.arrayContaining([
                        expect.objectContaining({name: 'admin'}),
                        expect.objectContaining({name: 'user'}),
                        expect.objectContaining({name: 'delete'}),
                    ]));
                });
            });

            describe("create", () => {
                it('should create permission mapping', async () => {
                    const resource = await fixture.permissionController.createOneResource({name: "test2"});
                    expect(resource.permissions).toEqual(expect.arrayContaining([
                        expect.objectContaining({name: 'create'}),
                        expect.objectContaining({name: 'read'}),
                        expect.objectContaining({name: 'update'}),
                        expect.objectContaining({name: 'delete'}),
                    ]));
                    expect(resource.permissions.length).toEqual(4);
                    const permissions = await fixture.permissionService.findAll(resource.id);
                    const actions = await fixture.actionService.findAll();
                    resource.permissions.forEach(resourcePermission => {
                        expect(resourcePermission).toEqual({
                            id: permissions.find(p => p.id === resourcePermission.id).id,
                            name: actions.find(a => a.name === resourcePermission.name).name
                        });
                    });
                });
                it('should not create duplicate', () => {
                    fixture.permissionController.createOneResource({name: "user"}).then(() => {
                        throw Error("Should fail, but test passed");
                    }).catch(error => {
                        expect(error).toBeInstanceOf(BadRequestException);
                        expect(error.status).toEqual(400);
                        expect(error.response.message).toEqual('Resource already exist');
                    });
                });
                it('should create record', async () => {
                    const beforeCreate = await fixture.permissionController.findAllResources();
                    const actualResult = await fixture.permissionController.createOneResource({name: 'test1'});
                    const afterCreate = await fixture.permissionController.findAllResources();
                    expect(beforeCreate.length).toBeLessThan(afterCreate.length);
                    expect(afterCreate).toEqual(expect.arrayContaining([
                        expect.objectContaining(actualResult)
                    ]));
                });
            });

        });

        describe("resources/:id endpoint", () => {

            describe("get", () => {
                it('should return one', async () => {
                    let repo = await fixture.resourceService.findAll();
                    let actualResult = await fixture.resourceService.findOne(repo[0].id);
                    expect(actualResult).toEqual(repo[0]);
                });
            });

            describe("delete", () => {
                it('should delete one', async () => {
                    const repo = await fixture.permissionController.findAllResources();
                    await fixture.permissionController.deleteOneResource(repo[0].id);
                    let response = await fixture.permissionController.findAllResources();
                    expect(response).not.toEqual(expect.arrayContaining([
                        expect.objectContaining(repo[0])
                    ]));
                });
            });

            describe("update", () => {
                it('should update record', async () => {
                    const beforeUpdate = await fixture.permissionController.findAllResources();
                    const updatedResponse = await fixture.permissionController
                        .updateOneResource(beforeUpdate[0].id, {name: 'updated value'});
                    const afterUpdate = await fixture.permissionController.findAllResources();
                    expect(afterUpdate).toEqual(expect.arrayContaining([
                        expect.objectContaining(updatedResponse[0])
                    ]));
                });
                it('should return updated record in response', async () => {
                    const repo = await fixture.permissionController.findAllResources();
                    const result = await fixture.permissionController
                        .updateOneResource(repo[0].id, {name: 'updated value2'});
                    expect(result.length).toEqual(1);
                    expect(result[0]).toEqual({id: repo[0].id, name: 'updated value2'});
                });
            });

        });
    });
});