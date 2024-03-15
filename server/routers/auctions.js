import express from 'express';
import { Auction, Bidding, User, Watchlist } from '../db/dbConnect.js';
import mongoose, { mongo } from 'mongoose';

const auctionRouter = express.Router();

auctionRouter.get('/', async (req, res) => {
    try {
        const getAuctions = await Auction.find({ active: true });
        return res.status(200).json({ message: 'success', data: getAuctions });
    } catch (error) {
        console.error("Error fetching auctions:", error);
        return res.status(500).json({ message: 'error', error: error.message });
    }
});


auctionRouter.get('/my-auctions', async (req, res) => {
    try {
        const getAuction = await Auction.find({auctionBy:req.user.userId});
        if (!getAuction) {
            return res.status(404).json({ message: 'No data found' });
        }
        return res.status(200).json({ message: "success", data: getAuction });
    } catch (error) {
        console.error("Error fetching auction:", error);
        return res.status(400).json({ message: 'Error fetching auction', error: error.message });
    }
});

//get auction each auction
auctionRouter.get('/:id', async (req, res) => {
    try {
        const getAuction = await Auction.findById(req.params.id);
        return res.status(200).json({ message: 'success', data: getAuction });
    } catch (error) {
        console.error("Error fetching auctions:", error);
        return res.status(500).json({ message: 'error', error: error.message });
    }
});

auctionRouter.get('/bidding/:id', async (req, res) => {
    try {
        const pipeline = [
            { $match: { auctionId: new mongoose.Types.ObjectId(req.params.id) } },
            { $sort: { bidAmount: -1 } },
            { $limit: 1 }
        ];
        const getHighestBid = await Bidding.aggregate(pipeline);
        // console.log(getHighestBid[0])
        return res.status(200).json({ message: 'success', data: getHighestBid[0] });
    } catch (error) {
        console.error("Error getting the bids:", error);
        return res.status(200).json({ message: 'Error while getting the bids', error: error.message });
    }
});

auctionRouter.post('/bidding/:id', async (req, res) => {
    try {
        const newBid = new Bidding({auctionId:req.params.id, userId:req.user.userId, bidAmount:parseInt(req.body.bidAmount, 10)});
        await newBid.save();
        return res.status(200).json({ message: 'success' });
    } catch (error) {
        console.error("Error posting bid:", error);
        return res.status(400).json({ message: 'failed', error: error.message });
    }
});

auctionRouter.post('/', async (req, res) => {
    try {
        const newAuction = new Auction({...req.body, auctionBy:req.user.userId});
        await newAuction.save();
        return res.status(200).json({ message: 'success' });
    } catch (error) {
        console.error("Error creating auction:", error);
        return res.status(400).json({ message: 'failed', error: error.message });
    }
});


auctionRouter.put('/', async (req, res) => {
    try {
        const updatedAuction = await Auction.findByIdAndUpdate(req.user.userId, {...req.body, userId:req.user.userId}, { new: true });
        if (!updatedAuction) {
            return res.status(404).json({ message: 'No data found' });
        }
        return res.status(200).json({ message: "success", data: updatedAuction });
    } catch (error) {
        console.error("Error updating auction:", error);
        return res.status(400).json({ message: 'Error updating auction', error: error.message });
    }
});

auctionRouter.get('/watchlist/all', async (req, res) => {
    try {
        const watchlist = await Watchlist.find({userId: req.user.userId});
        return res.status(200).json({ message: 'success', data: watchlist });
    } catch (error) {
        console.error("Error fetching watchlist:", error);
        return res.status(400).json({ message: 'Error fetching watchlist', error: error.message });
    }
});

auctionRouter.get('/watchlist/:id', async (req, res) => {
    try {
        const watchlist = await Watchlist.findOne({auctionId:req.params.id, userId: req.user.userId});
        return res.status(200).json({ message: 'success', data: watchlist });
    } catch (error) {
        console.error("Error fetching watchlist:", error);
        return res.status(400).json({ message: 'Error fetching watchlist', error: error.message });
    }
});

auctionRouter.post('/watchlist/:id', async (req, res) => {
    try {
        const { id:auctionId } = req.params;
        const existingWatchlistItem = await Watchlist.findOne({ userId:req.user.userId, auctionId:auctionId});
        if (existingWatchlistItem) {
            await Watchlist.findByIdAndDelete(existingWatchlistItem._id);
            return res.status(200).json({ message: 'success', data: false });
        } else {
            const newWatchlistItem = new Watchlist({ auctionId: auctionId,userId: req.user.userId });
            await newWatchlistItem.save();
            return res.status(200).json({ message: 'success', data: true });
        }
    } catch (error) {
        console.error("Error managing watchlist:", error);
        return res.status(400).json({ message: 'Error managing watchlist', error: error.message });
    }
});

export default auctionRouter;
