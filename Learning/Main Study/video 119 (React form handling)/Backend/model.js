import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://abdullah:112233332211@cluster0.3t0tv38.mongodb.net/Users?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

  const userSchema = new mongoose.Schema({
    username: String,
    password: String,
  });
  
export  const User = mongoose.model("User", userSchema);