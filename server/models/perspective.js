import mongoose from 'mongoose';

const perspectiveSchema = new mongoose.Schema({
    author: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        firstName: String,
        lastName: String
    },
    content: String,
    topicId: String,
    questions: String,
    createdAt: String
});

export default mongoose.model("Perspective", perspectiveSchema);
