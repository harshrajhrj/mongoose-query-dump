const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    tag: String,
    name: String,
    townhallLevel: Number,
    addedByRep: String
});

const playerRecordSchema = new mongoose.Schema({
    tag: String,
    name: String,
    townhallLevel: Number,
    byRep: String,
    timeStamp: String
});

const rosterSchema = new mongoose.Schema({
    abb: {
        type: String,
        upperCase: true,
        maxLenght: 4
    },
    division: String,
    rosterSize: Number,
    additionSpot: {
        type: Boolean,
        default: true
    },
    additionStatusLimit: Number,
    players: [playerSchema],
    additionRecord: [playerRecordSchema],
    removalRecord: [playerRecordSchema]
});

const rosterDetailModel = mongoose.model("roster_details", rosterSchema);

async function findAndUpdate() {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        await mongoose.connect('mongodb+srv://wcl_warriors:Wclchampion321@cluster0.lskrq.mongodb.net/TECHNICAL?retryWrites=true&w=majority', connectionParams)
            .then(() => console.log('connected to db!'));

        const abbs = ['dark', 'boom', 'tes', 'bg', 'exg', 'roms', 'boi', 'b505', 'twe', 'pe', 'gge', 'hsg', 'engg', 'vinc', 'bdle', 'cva', 'tw', 'love', 'ng', 'zd', 'qnh', 'trp', 'bxh', 'mini', 'skw', 'kre', 'ece', 'bees', 'sisp', 'omni', 'dtg', 'hrs', 'chae', 'dp', 'sge', 'et', 'bkf', 'npr', 'wbb', '1lg', 'wm', 'etx', '2l4s', 'wu2', 'p51', 'mrcs', 'cn', 'kc', 'armx', 'lts', 'xte', 'aom', 'exe', 'ph', 'swat', 'iyd', 'am', 'czc', 'flex', 'qb', 'lgnd', 'swag', 'oge', 'bm'];
        for (const abb of abbs) {
            await rosterDetailModel.findOneAndUpdate(
                {
                    abb: abb.toUpperCase()
                },
                {
                    $inc: {
                        additionStatusLimit: 2
                    }
                }
            )
        }
        console.log('Finished')

    } catch (err) {
        console.log(err.message);
    }
}

findAndUpdate();