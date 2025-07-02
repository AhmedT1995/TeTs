import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://itachi3mk:mypassis1199@cluster0.zzyxjo3.mongodb.net/?retryWrites=true&w=majority';

const WarningSchema = new mongoose.Schema({
  userId: String,
  groupId: String,
  warnings: Array,
});

const WarningModel = mongoose.model('Warning', WarningSchema, 'warnings'); // make sure 'warnings' matches your collection name

async function clearAllWarnings() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    const result = await WarningModel.deleteMany({});
    console.log(`🗑️ Deleted ${result.deletedCount} warning documents.`);

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error clearing warnings:', error);
  }
}

clearAllWarnings();
