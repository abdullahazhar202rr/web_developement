use("Learning")
db.createCollection("Dummy_Data")
// db.Dummy_Data.insertMany([
//     {
//         name:"Abdullah Azhar1",
//         age:20,
//         Degree:"BSAI"
//     },
//     {
//         name:"Abdullah Azhar2",
//         age:21,
//         Degree:"BSAI"
//     }
// ])

// let a=db.Dummy_Data.find({age:21})
// console.log(a.count())

db.Dummy_Data.updateOne({age:20},{$set:{age:19}})
db.Dummy_Data.updateMany({age:20},{$set:{age:19}})

db.Dummy_Data.deleteOne({age:19})
db.Dummy_Data.deleteMany({age:19})
db.Dummy_Data.deleteOne({age:{$eq:19}})