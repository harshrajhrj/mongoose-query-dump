const mongoose = require("mongoose");

const opponentSchema = new mongoose.Schema({
    week: String,
    group: String,
    warId: String,
    opponentAbb: {
        type: String,
        upperCase: true,
        maxLenght: 4
    },
    dateTimeOfWar: {
        type: Date,
        default: null
    },
    starsFor: {
        type: Number,
        default: null
    },
    starsAgainst: {
        type: Number,
        default: null
    },
    destructionFor: {
        type: Number,
        default: null
    },
    destructionAgainst: {
        type: Number,
        default: null
    },
    result: {
        type: String,
        enum: ["W", "L", "T", null],
        default: null
    },
    status: {
        type: String,
        enum: ["ACTIVE", "COMPLETED", "NOT_COMPLETED"],
        default: "NOT_COMPLETED"
    }
});

const scheduleSchema = new mongoose.Schema({
    abb: {
        type: String,
        upperCase: true,
        maxLenght: 4
    },
    division: String,
    opponents: [opponentSchema]
});

const scheduleDetailModel = mongoose.model("schedule_details", scheduleSchema);
// module.exports.scheduleSchema = scheduleSchema;
// module.exports.opponentSchema = opponentSchema;

async function findAndRemove() {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        await mongoose.connect('mongodb+srv://wcl_warriors:Wclchampion321@cluster0.lskrq.mongodb.net/TECHNICAL?retryWrites=true&w=majority', connectionParams)
            .then(() => console.log('connected to db!'));

        const abbs = ['FC', 'USA2', 'DK', 'BOW', 'SSE', 'BOT', 'BM', 'XPL', 'VYJ', 'EMG', 'RG', 'BOD', 'VH', 'CN', 'MGE', 'IBB', 'NVL', 'GLDX', 'SARM', 'PEAK', 'LOS', 'KT3', 'TRP', 'B505', 'KTX', 'SWAT', 'WSA', 'OMNI', 'NUPI', 'AODN', 'NGTL', 'ARM', 'OES', 'VOLT', 'RPG', 'AOG', 'SPES', 'ZD', 'TRC', 'WILD', 'ARMS', 'AOV', 'SUAF', 'HES', 'AOE', 'TKG', 'JIM', 'MAD', 'FGS', 'WBB', 'FLEX', 'ATT', 'QB', 'PSE', 'PXS', 'HSG', 'SG', 'BOE', 'NOV', 'PTB', 'DCO', 'KC', 'TCC', 'BOPW', 'INP', 'NG', 'AUTO', 'LS', 'BLMG', 'CXA', 'SGE', 'OFT', 'BG', 'V77', 'VINC', 'P51', 'INV', 'HRS', 'TWI', 'BXH', 'RECS', 'RLA', 'NPR', 'GNA', 'BETA', 'GLAD', 'SPE', 'NW', 'EXE', 'LTS', 'ACES', 'LOVE', '2L4S', 'RNC', 'SKW', 'SZS', 'CHK', 'BOI', 'TPME', 'MGBR', 'LGL', 'LGD', 'NSE', 'KAEE', 'PM', 'ROMS', 'DC5', 'LOSB', 'INQ', 'WIS', 'UDOX', 'LME', 'ECE', 'TTP', 'ITT', 'ARMX', 'NLT', 'LIM', 'JUBA', 'AD', 'QOF', 'WM', 'OMS', 'KAES', 'WSAB', 'CLSE']

        for (const abb of abbs) {
            await scheduleDetailModel.findOneAndUpdate(
                {
                    abb: abb
                },
                {
                    $pull: {
                        opponents: {
                            week: 'Week-2'
                        }
                    }
                }
            )
        }
        console.log('Finished')

    } catch (err) {
        console.log(err.message);
    }
}

// {"_id":{"$oid":"64d2211d3ed9603cc8acf7b9"},"abb":"VOLT","division":"eSports","opponents":[{"week":"Week-1","group":"Group-1","warId":"OESvVOLT","opponentAbb":"OES","dateTimeOfWar":{"$date":{"$numberLong":"1693076400000"}},"starsFor":{"$numberInt":"12"},"starsAgainst":{"$numberInt":"13"},"destructionFor":{"$numberDouble":"94.2"},"destructionAgainst":{"$numberDouble":"93.4"},"result":"L","status":"COMPLETED","_id":{"$oid":"64e50bc21a8b0550dcf150f9"}},{"week":"Week-2","group":"Group-1","warId":"OESvVOLT","opponentAbb":"OES","dateTimeOfWar":null,"starsFor":null,"starsAgainst":null,"destructionFor":null,"destructionAgainst":null,"result":null,"status":"NOT_COMPLETED","_id":{"$oid":"64ee381580b445875ebff637"}}],"__v":{"$numberInt":"2"}}

findAndRemove();