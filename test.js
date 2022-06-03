//  FOT the PUT
const headerValue = [];

//on onadding the value

// shireen has to push in to the headerValue 

headerValue.push({
    subHeader: "value",
    subDescrition: "",
    userId: "user id", // for the susshil refercence to  fetch the user detausl
    createdDate: new Date().toDateString(),
})

// as many as the headr value ob clicking the add  value
//  that many time shireen has to push


// while sending the to api 

const patchData = { headerValue: JSON.stringify(headerValue) };