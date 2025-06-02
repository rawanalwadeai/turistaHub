import Houses from '../models/Houses.js'


//to add new place
export const addPlace = async (req ,res) => {

    const newPlace = new Houses(req.body)


    try{
const savedPlace = await newPlace.save()

res.status(200).json({
    success: true,
            message: 'Successfuly added',
            data: savedPlace
})

    }catch(err){
        res.status(500).json({success :false , message:'Failled to add, Try again' , error:err.message })

    }
}



// update place
export const updatePlace = async (req ,res) => {

    const id = req.params.id
    
    try{
const updatePlace = await Houses.findByIdAndUpdate(id , {$set : req.body} , {new :true})

res.status(200).json({
    success: true,
            message: 'Successfuly updated',
            data: updatePlace
})

    }catch(err){
        res.status(500).json({success :false , message:'Failled to update, Try again'})

    }
}


// delete place
export const deletePlace = async (req ,res) => {

    const id = req.params.id
    
    try{
await Houses.findByIdAndDelete(id)

res.status(200).json({
    success: true,
            message: 'Successfuly deleted',
})

    }catch(err){
        res.status(500).json({success :false , message:'Failled to delete, Try again'})

    }
}


// get single place
export const getSinglePlace = async (req ,res) => {

    const id = req.params.id
    
    try{
const house = await Houses.findById(id).populate('reviews')

res.status(200).json({
    success: true,
            message: 'Successfuly fetching',
            data: house
})

    }catch(err){
        res.status(500).json({success :false , message:'Not found'})

    }
}



//from here not relized ////////////////////////////////////////////

// get All places
export const getAllPlace = async(req,res) => {


//for pagination trqeem 
const page = parseInt(req.query.page) || 0


// console.log(page);
    try{


        const houses =  await Houses
        .find({})
        .populate('reviews')
        .skip(page * 8 )
        .limit(8)

       
        res.status(200).json({
            success: true,
            count:houses.length,
            message: 'Successfuly fetcheing all',
            data:houses
            
        })
        
    }
    catch (err){
        res.status(500).json({
            success :false ,
             message:'not found' })

    }
}



//     //get place conts
    export const getPlaceCount = async(req,res) =>{
        try{
const placeCount = await Houses.estimatedDocumentCount()


res.status(200).json({
    success: true,
    data:placeCount
    
})

}
catch (err){
res.status(500).json({
    success :false ,
     message:'not found' })

}

}


//get place by search
