import mongoose, { ConnectOptions } from 'mongoose'

async function connect(){
    try {
        await mongoose.connect(String(process.env.DURI),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
        console.log("connect successfully!!!");
    } catch (error) {
        console.log(error);
    }
}

export default connect;