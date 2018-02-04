"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const helpers_1 = require("../../../common/helpers");
const types_1 = require("../../../common/types");
let CacheableLocatorService = class CacheableLocatorService {
    constructor(name, serviceContainer) {
        this.serviceContainer = serviceContainer;
        this.cacheKey = `INTERPRETERS_CACHE_${name}`;
    }
    getInterpreters(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.getInterpretersPromise) {
                this.getInterpretersPromise = helpers_1.createDeferred();
                this.getInterpretersImplementation(resource)
                    .then((items) => __awaiter(this, void 0, void 0, function* () {
                    yield this.cacheInterpreters(items);
                    this.getInterpretersPromise.resolve(items);
                }))
                    .catch(ex => this.getInterpretersPromise.reject(ex));
            }
            if (this.getInterpretersPromise.completed) {
                return this.getInterpretersPromise.promise;
            }
            const cachedInterpreters = this.getCachedInterpreters();
            return Array.isArray(cachedInterpreters) ? cachedInterpreters : this.getInterpretersPromise.promise;
        });
    }
    getCachedInterpreters() {
        const persistentFactory = this.serviceContainer.get(types_1.IPersistentStateFactory);
        // tslint:disable-next-line:no-any
        const globalPersistence = persistentFactory.createGlobalPersistentState(this.cacheKey, undefined);
        if (!Array.isArray(globalPersistence.value)) {
            return;
        }
        return globalPersistence.value.map(item => {
            return Object.assign({}, item, { cachedEntry: true });
        });
    }
    cacheInterpreters(interpreters) {
        return __awaiter(this, void 0, void 0, function* () {
            const persistentFactory = this.serviceContainer.get(types_1.IPersistentStateFactory);
            const globalPersistence = persistentFactory.createGlobalPersistentState(this.cacheKey, []);
            yield globalPersistence.updateValue(interpreters);
        });
    }
};
CacheableLocatorService = __decorate([
    inversify_1.injectable()
], CacheableLocatorService);
exports.CacheableLocatorService = CacheableLocatorService;
//# sourceMappingURL=cacheableLocatorService.js.map