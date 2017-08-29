const mongoose = require('mongoose');

const MarketingServiceTypeSchema = mongoose.Schema({

  MarketingServiceType_Name:{
    type: String,
    required: true
  },
  MarketingServiceType_Description:{
    type: String,
  }
});

const Marketingservicetype = module.exports = mongoose.model('MarketingServiceType', MarketingServiceTypeSchema);
