import { Collection, Db, ObjectId } from "mongodb";
import { User } from "src/models/user";
import { logger } from "../app/logging";

export class UserService {
        constructor(private repository: Collection<User>) {}

        public async findOneByField(field: keyof User, value: any) {
                if (field === "_id") {
                        if (!ObjectId.isValid(value)) return null;
                        if (ObjectId) return this.repository.findOne({ _id: new ObjectId(value) });
                }

                return this.repository.findOne({ [`${field}`]: value });
        }

        public async addUser(user: User) {
                const newUser = await this.repository.insertOne(user);
                logger.info(`new User with ID ${newUser.insertedId} is added`);
                return newUser;
        }
}
