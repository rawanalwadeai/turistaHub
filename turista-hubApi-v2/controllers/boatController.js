import Boat from '../models/Boat.js'

// Add new boat
export const addBoat = async (req, res) => {
  const newBoat = new Boat(req.body)

  try {
    const savedBoat = await newBoat.save()
    res.status(200).json({
      success: true,
      message: 'Successfully added',
      data: savedBoat,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to add, try again',
      error:err.message
    })
  }
}

// Update boat
export const updateBoat = async (req, res) => {
  const id = req.params.id

  try {
    const updatedBoat = await Boat.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    res.status(200).json({
      success: true,
      message: 'Successfully updated',
      data: updatedBoat,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to update, try again',
    })
  }
}

// Delete boat
export const deleteBoat = async (req, res) => {
  const id = req.params.id

  try {
    await Boat.findByIdAndDelete(id)
    res.status(200).json({
      success: true,
      message: 'Successfully deleted',
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete, try again',
    })
  }
}

// Get single boat
export const getSingleBoat = async (req, res) => {
  const id = req.params.id

  try {
    const boat = await Boat.findById(id).populate('reviews')
    res.status(200).json({
      success: true,
      message: 'Successfully fetched',
      data: boat,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Not found 1',
      error:err.message
    })
  }
}

// Get all boats with pagination
export const getAllBoats = async (req, res) => {
  const page = parseInt(req.query.page) || 0

  try {
    const boats = await Boat.find({})
      .populate('reviews')
      .skip(page * 8)
      .limit(8)

    res.status(200).json({
      success: true,
      count: boats.length,
      message: 'Successfully fetched all boats',
      data: boats,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Not found 2',
    })
  }
}

// Get boat count
export const getBoatCount = async (req, res) => {
  try {
    const boatCount = await Boat.estimatedDocumentCount()
    res.status(200).json({
      success: true,
      data: boatCount,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Not found 3',
    })
  }
}



// Get featured boats - based on rating >= 4.8
export const getFeaturedBoats = async (req, res) => {
    // try {
    //   const boats = await Boat.find({ rating: { $gte: 2 } })
    //     .populate('reviews')
    //     .limit(8) // حطي العدد اللي يناسبك
  
    //   res.status(200).json({
    //     success: true,
    //     message: 'Successfully fetched featured boats',
    //     data: boats,
    //   })
    // } catch (err) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Failed to fetch featured boats',
    //     error:err.message
    //   })
    // }


    
            try{
        
        
                const boats =  await Boat
                .find({featured:true}).populate('reviews')
                .limit(8)
        
               
                res.status(200).json({
                    success: true,
                    message: 'Successfuly fetcheing all',
                    data:boats
                    
                })
                
            }
            catch (err){
                res.status(500).json({
                    success :false ,
                     message:'not found' })
        
            }
  }

  
  // Search boats by name or location
export const searchBoats = async (req, res) => {
    const name = req.query.name
    const location = req.query.location
  
    try {
      const query = {}
  
      if (name) {
        query.boat_name = { $regex: name, $options: 'i' }
      }
  
      if (location) {
        query.location = { $regex: location, $options: 'i' }
      }
  
      const boats = await Boat.find(query).populate('reviews')
  
      res.status(200).json({
        success: true,
        message: 'Successfully fetched search results',
        data: boats,
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Search failed, try again',
      })
    }
  }
  