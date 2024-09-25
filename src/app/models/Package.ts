import mongoose from 'mongoose';


const DaySchema = new mongoose.Schema({
    day: { type: Number, required: true },
    place: { type: String, required: true },
    mealPlan: {
      breakfast: { type: Boolean, default: false },
      lunch: { type: Boolean, default: false },
      dinner: { type: Boolean, default: false }
    },
    description: { type: String, required: true }
  });

const PackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  numberOfNights : {type: String},
  numberOfDays: {type:String},
  duration: { type: Number },
  itinerary: [DaySchema],
  inclusions: [{ type: String }], 
  exclusions: [{ type: String }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  images: [{ type: String }],
  offer: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

PackageSchema.pre('save',function(next){
    if(this.itinerary.length !== this.duration){
        next(new Error('The number of itinerary days must match the package duration'))
    }else{
        next()
    }
})

export default mongoose.models.Package || mongoose.model('Package', PackageSchema);