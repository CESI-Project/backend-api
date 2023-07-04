const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

class LocalDB {
  constructor(onReady) {
    MongoMemoryServer.create().then((mongo) => {
      this.mongo = mongo;
      this.uri = mongo.getUri();
      console.log(`LocalDB started with URI ${this.uri}`);
      if (onReady) onReady();
    });
  }

  async connect() {
    await mongoose.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  flush() {
    // DANGER, uncomment this only if you are sure you are connected to the in-memory DB
    if (this.mongo) {
    //   const collections = await mongoose.connection.db.collections();
    //   asyncForEach(collections, async (collection) => collection.deleteMany({}));
    }
  }

  async drop() {
    // DANGER, uncomment this only if you are sure you are connected to the in-memory DB
    if (this.mongo) {
      await mongoose.connection.close();
      await this.mongo.stop();
    }
  }
}

module.exports = LocalDB;
