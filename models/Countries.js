var CountrySchema = new mongoose.Schema({
  country_code: String,
  name: String,
  rate: Number
});

mongoose.model('Country', CountrySchema);
