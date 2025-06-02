import Cars from '../models/Cars.js'


//to add new car
export const addCar = async (req ,res) => {

    const newCar = new Cars(req.body)


    try{
const savedCar = await newCar.save()

res.status(200).json({
    success: true,
            message: 'Successfuly added',
            data: savedCar
})

    }catch(err){
        res.status(500).json({success :false , message:'Failled to add, Try again ' , error:err.message})

    }
}



// update Car
export const updateCar = async (req ,res) => {

    const id = req.params.id
    
    try{
const updateCar = await Cars.findByIdAndUpdate(id , {$set : req.body} , {new :true})

res.status(200).json({
    success: true,
            message: 'Successfuly updated',
            data: updateCar
})

    }catch(err){
        res.status(500).json({success :false , message:'Failled to update, Try again'})

    }
}


// delete Car
export const deleteCar = async (req ,res) => {

    const id = req.params.id
    
    try{
await Cars.findByIdAndDelete(id)

res.status(200).json({
    success: true,
            message: 'Successfuly deleted',
})

    }catch(err){
        res.status(500).json({success :false , message:'Failled to delete, Try again'})

    }
}


// get single Car
export const getSingleCar = async (req ,res) => {

    const id = req.params.id
    
    try{
const car = await Cars.findById(id).populate('reviews')

res.status(200).json({
    success: true,
            message: 'Successfuly fetching',
            data: car
})

    }catch(err){
        res.status(500).json({success :false , message:'Not found'})

    }
}



//from here not relized ////////////////////////////////////////////

// get All Cars
export const getAllCar = async(req,res) => {


//for pagination trqeem 
const page = parseInt(req.query.page)


// console.log(page);
    try{


        const allCars =  await Cars
        .find({})
        .populate('reviews')
        .skip(page * 8 )
        .limit(8)

       
        res.status(200).json({
            success: true,
            count:allCars.length,
            message: 'Successfuly fetcheing all',
            data:allCars
            
        })
        
    }
    catch (err){
        res.status(500).json({
            success :false ,
             message:'not found' })

    }
}



//     //get Car conts
    export const getCarCount = async(req,res) =>{
        try{
const CarCount = await Cars.estimatedDocumentCount()


res.status(200).json({
    success: true,
    data:CarCount
    
})

}
catch (err){
res.status(500).json({
    success :false ,
     message:'not found' })

}

}


//get Car by search
