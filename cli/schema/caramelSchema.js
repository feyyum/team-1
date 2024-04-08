const { timeStamp } = require("console");

const caramelCode = {
    name: {
        type: string,
        required: true,
        trim: true
    },
    hash: {//private key ??
    },
    status: {
        enum: ["not started", "compiled", "converted", "deployed"],
        default: "not started",
        trim: true
    },
    timeStamp: true

}