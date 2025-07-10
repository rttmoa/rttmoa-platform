import { ClientSession, MongoClient, ObjectId } from "mongodb";
import { getSteedosConfig } from '@steedos/objectql';
// import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

// ? 路径
// /packages/metadata-api/src/util/dbManager.ts

// ? 版本
// "mongodb": "^3.7.3",
// "@steedos/objectql": "2.4.18-beta.3",
// "typescript": "4.6.3"

// ? 使用
// import DbManager from 'src/util/dbManager' 
// const userSession = req.user;
// const dbManager = new DbManager(userSession)
// await dbManager.connect()
// const objects = await dbManager.find(collection_name, {is_deleted: {$ne: true}}); // is_deleted 不等于 true 的值
// await dbManager.close()


/**
 * mongodb 数据库操作类
 */
export class DbManager {
    static instance: DbManager | null
    public client: MongoClient
    private session: ClientSession;

    connected: boolean = false;

    private url;
    private userSession: { spaceId: any; userId: any; };

    constructor(userSession?: any) {
        this.url = getSteedosConfig().datasources.default.connection.url;
        this.client = new MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true })
        this.setUserSession(userSession);
    }

    setUserSession(userSession: { spaceId: any; userId: any; }) {
        this.userSession = userSession;
    }
    getUserSession() {
        return this.userSession;
    }

    async connect() {
        if (!this.connected) {
            await this.client.connect();
            this.connected = true;
        }
    }

    async close() {
        await this.client.close();
    }

    async insert(collectionName: string, doc: any, autoGenerateId = true) {
        if (autoGenerateId) {

            doc['_id'] = new ObjectId().toHexString();
            doc['space'] = this.userSession.spaceId;

            const now = new Date()
            doc['owner'] = this.userSession.userId
            doc['created'] = now
            doc['created_by'] = this.userSession.userId
            doc['modified'] = now
            doc['modified_by'] = this.userSession.userId
        }
        return await this.client.db().collection(collectionName).insertOne(doc, { session: this.session });
    }

    async insertMany(collectionName: string, docs: any[]) {
        for (var i = 0; i < docs.length; i++) {
            docs[i]['_id'] = new ObjectId().toHexString();
            docs[i]['space'] = this.userSession.spaceId;

            const now = new Date()
            docs[i]['owner'] = this.userSession.userId
            docs[i]['created'] = now
            docs[i]['created_by'] = this.userSession.userId
            docs[i]['modified'] = now
            docs[i]['modified_by'] = this.userSession.userId
        }
        return await this.client.db().collection(collectionName).insertMany(docs, { session: this.session });
    }

    async delete(collectionName: string, filter: any) {
        var space = this.userSession.spaceId;
        filter['space'] = space
        return await this.client.db().collection(collectionName).deleteOne(filter, { session: this.session });
    }

    async deleteMany(collectionName: string, filter: any) {
        var space = this.userSession.spaceId;
        filter['space'] = space
        return await this.client.db().collection(collectionName).deleteMany(filter, { session: this.session });
    }

    async directUpdate(collectionName: string, filter: any, update: any) {
        var space = this.userSession.spaceId;
        filter['space'] = space

        update.$set['modified'] = new Date()
        update.$set['modified_by'] = this.userSession.userId
        return await this.client.db().collection(collectionName).updateOne(filter, update, { session: this.session });
    }

    async update(collectionName: string, filter: any, update: any) {
        var space = this.userSession.spaceId;
        filter['space'] = space

        update['modified'] = new Date()
        update['modified_by'] = this.userSession.userId
        return await this.client.db().collection(collectionName).updateOne(filter, { $set: update }, { session: this.session });
    }

    async unset(collectionName: string, filter: any, update: object) {
        var space = this.userSession.spaceId;
        filter['space'] = space
        return await this.client.db().collection(collectionName).updateOne(filter, { $unset: update }, { session: this.session });
    }

    async find(collectionName: string, filter: any, setSpace = true, limit?: number, options = {}) {
        var space = this.userSession.spaceId;
        if (setSpace) {
            filter['space'] = space
        }
        let newOptions = {
            ...options,
            session: this.session
        }
        if (limit) {
            return await this.client.db().collection(collectionName).find(filter, newOptions).limit(limit).toArray();
        } else {
            return await this.client.db().collection(collectionName).find(filter, newOptions).toArray();
        }
    }

    async findOne(collectionName: string, filter: any, setSpace = true, options = {}) {
        var space = this.userSession.spaceId;
        if (setSpace) {
            filter['space'] = space
        }
        let newOptions = {
            ...options,
            session: this.session
        }
        return await this.client.db().collection(collectionName).findOne(filter, newOptions);
    }

    async findWithProjection(collectionName: string, filter: any, projection?: object, setSpace = true, limit?: number) {
        if (!projection) {
            return await this.find(collectionName, filter, setSpace, limit);
        }
        var space = this.userSession.spaceId;
        if (setSpace) {
            filter['space'] = space
        }
        var setting: any = { session: this.session };
        if (projection) {
            setting['projection'] = projection
        }
        if (limit) {
            return await this.client.db().collection(collectionName).find(filter, setting).limit(limit).toArray();
        } else {
            return await this.client.db().collection(collectionName).find(filter, setting).toArray();
        }
    }

    async findOneWithProjection(collectionName: string, filter: any, projection?: object, setSpace = true) {
        if (!projection) {
            return await this.findOne(collectionName, filter, setSpace);
        }
        var space = this.userSession.spaceId;
        if (setSpace) {
            filter['space'] = space
        }
        var setting: any = { session: this.session };
        if (projection) {
            setting['projection'] = projection
        }
        return await this.client.db().collection(collectionName).findOne(filter, setting);
    }

    async aggregate(collectionName: string, pipeline: object[]) {
        var space = this.userSession.spaceId;

        pipeline.push({
            $match: { space }
        })

        return await this.client.db().collection(collectionName).aggregate(pipeline).toArray();
    }

    async startSession() {
        const session = await this.client.startSession();
        this.session = session;
        return session;
    }
    async endSession() {
        if (this.session) {
            return await this.session.endSession();
        }
    }

}
