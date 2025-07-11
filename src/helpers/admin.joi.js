import Joi from "joi";

export const Register = Joi.object({
  name: Joi.string().required().trim().min(3).max(55),
  phone: Joi.string().required().min(10).max(10),
  password: Joi.string().required().min(6).max(55),
});

export const Verify = Joi.object({
  phone: Joi.string().required().min(10).max(10),
  otp: Joi.string().required().min(6).max(6),
});

export const Login = Joi.object({
  username: Joi.string().required().min(10).max(13),
  password: Joi.string().required().min(6).max(55),
});

export const AddService = Joi.object({
  name: Joi.string().required().min(3).max(20).trim(),
  // description: Joi.string().required().min(6).max(60).trim(),
  description: Joi.string().allow('').trim(),
  prefix: Joi.string().trim().required().max(1),
  service_time: Joi.number().required(),
  business_id: Joi.any(),
});

export const AddStaffs = Joi.object({
  name: Joi.string().required().min(3).max(55).trim(),
  phone: Joi.string().required().min(10).max(10).trim(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(100)
    .allow("")
    .trim(),
  username: Joi.string().required().min(10).max(13),
  password: Joi.string().min(6).max(15),
  role: Joi.any(),
});

export const AddBStaffs = Joi.object({
  name: Joi.string().required().min(3).max(55).trim(),
  phone: Joi.string().required().min(10).max(13).trim(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(100)
    .allow("")
    .trim(),
  username: Joi.string().required().min(10).max(13),
  password: Joi.string().min(6).max(15),
  services: Joi.any(),
  break_time: Joi.any(),
  business_id: Joi.any(),
  role: Joi.any(),
});

export const profile = Joi.object({
  name: Joi.string().allow("").max(55).trim().optional(),
  email: Joi.string()
    .allow("")
    .email({ tlds: { allow: false } })
    .max(100)
    .trim(),
  password: Joi.string().min(6).max(15).allow(""),
  newPassword: Joi.string().min(6).max(15).allow(""),
  repeatPassword: Joi.string()
    .min(6)
    .max(15)
    .valid(Joi.ref("newPassword"))
    .allow(""),
  image: Joi.any(),
  id: Joi.any(),
});

export const AddBusiness = Joi.object({
  name: Joi.string().required().min(3).max(55).trim().replace(/ /g, ""),
  phone: Joi.string().required().min(10).max(13).trim().replace(/ /g, ""),
  bname: Joi.string().required().min(3).max(100).trim().label("Business Name"),
  telephone: Joi.string()
    .required()
    .min(8)
    .max(15)
    .trim()
    .label("Business Phone Number"),
  website: Joi.string().max(100).trim().allow(""),
  info: Joi.string().max(250).trim().allow(""),
  photo: Joi.any(),
  ad1: Joi.any(),
  ad2: Joi.any(),
  address1: Joi.string()
    .required()
    .min(3)
    .max(150)
    .trim()
    .label("Business Address1"),
  address2: Joi.string().allow("").max(150).trim().label("Business Address2"),
  street: Joi.string().allow("").max(150).trim(),
  city: Joi.string().required().max(50).trim(),
  state: Joi.string().required().max(50).trim(),
  postalcode: Joi.string().required().max(10).trim(),
  lat: Joi.string()
    .required()
    .max(10)
    .trim()
    .allow("")
    .label("Business Address Latitude"),
  lng: Joi.string()
    .required()
    .max(10)
    .trim()
    .allow("")
    .label("Business Address Longitude"),
  category: Joi.string().required().trim(),
  subcategories: Joi.any(),
  open_all_time: Joi.any(),
  monday: Joi.any(),
  tuesday: Joi.any(),
  wednesday: Joi.any(),
  thursday: Joi.any(),
  friday: Joi.any(),
  saturday: Joi.any(),
  sunday: Joi.any(),
  holidays: Joi.any(),
  holidays_working: Joi.any(),
});
