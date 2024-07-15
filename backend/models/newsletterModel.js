const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    subject: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    sentAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const campaignSendSchema = new mongoose.Schema({
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "newsletter",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});


const NewsletterModel = mongoose.model("newsletter", campaignSchema);

const CampaignSendModel = mongoose.model("campaignsend", campaignSendSchema);

module.exports = {NewsletterModel, CampaignSendModel};
