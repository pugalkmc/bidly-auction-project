import mongoose from 'mongoose';

const { Schema } = mongoose;

// Connect to MongoDB
mongoose.connect('mongodb+srv://pugalkmc:pugalkmc@cluster0.dzcnjxc.mongodb.net/bidly', { useNewUrlParser: true, useUnifiedTopology: true });

// User Collection Schema
const userSchema = new Schema({
  username: {
    type:String,
    unique:true
},
  password: String,
  email: {
    type:String,
    unique:true
  },
  firstlogin: Boolean,
  isVerified: Boolean,
}, { timestamps: true });

// Auction Collection Schema
const auctionSchema = new Schema({
  title: {
    type:String,
    unique:true,
    required:true
  },
  description: {
    type:String,
    unique:true,
    required:true
  },
  initialBid: {
    type:Number,
    required:true
  },
  auctionBy: {
    type:String,
    required:true
  },
  active: Boolean,
  username:String,
  imageUrl:String,
  endsIn: Date,
}, { timestamps: true });

// Bidding Collection Schema
const biddingSchema = new Schema({
  auctionId: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId,
  bidAmount: Number,
}, { timestamps: true });

// Watchlist Collection Schema
const watchlistSchema = new Schema({
  auctionId: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId,
}, { timestamps: true });

// Email Collection Schema
const emailSchema = new Schema({
  email: {
    unique:true,
    type:String,
    required:true
  },
}, { timestamps: true });

// OTP Collection Schema
const otpSchema = new Schema({
  email: {
    type:String,
    required:true
  },
  otp: String,
}, { timestamps: true });

// Creating models
const User = mongoose.model('User', userSchema);
const Auction = mongoose.model('Auction', auctionSchema);
const Bidding = mongoose.model('Bidding', biddingSchema);
const Watchlist = mongoose.model('Watchlist', watchlistSchema);
const Email = mongoose.model('Email', emailSchema);
const Otp = mongoose.model('Otp', otpSchema);

export {
  User,
  Auction,
  Bidding,
  Watchlist,
  Email,
  Otp
};
