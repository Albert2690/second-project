import Service from "../models/serviceModel.js";

const addService = async (req, res) => {
  try {
    console.log("hellooooooooo");
    const { service, description } = req.body.data;
    console.log(service);
    console.log(description);
    const existingService = await Service.findOne({ name: service });
    if (existingService) {
      return res
        .status(409)
        .json({ message: "Service Already Existing with same name" });
    } else {
      const newservice = await Service.create({
        name: service,
        description: description,
      });

      if (newservice) {
        res
          .status(201)
          .json({ message: " New service added succesfully", success: true });
      } else {
        res
          .status(500)
          .json({ message: "Internal Server Error.. couldn't add service" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const listservice = async (req, res) => {
  try {
    const { id } = req.body;
    const existingService = await Service.findOne({ _id: id });
    if (existingService) {
      existingService.is_listed = !existingService.is_listed;
      await existingService.save();
      console.log("donee");
      res.status(204).json({ message: "Updated Successfully", succes: true });
    } else {
      res.status(404).json({ message: "Services not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const getServices = async (req, res) => {
  try {
    console.log("helllo");
    const services = await Service.find({});
    console.log(services);
    res.status(200).json({ services: services });
  } catch (error) {
    res.status(500).json({ message: "Interal Server Error" });
  }
};
const  editService = async(req,res)=>{
    try{
        const {_id, service, description } = req.body.data;
        const serviceData = await service.findOneAndUpdate({_id:_id},{$set:{service:service,description:description}})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export { addService, listservice, getServices,editService };
