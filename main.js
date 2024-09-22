let title =document.getElementById("title")
let price =document.getElementById("price")
let tax= document.getElementById("taxes")
let ads =document.getElementById("ads")
let discount =document.getElementById("discount")
let total=document.getElementById("total")
let count=document.getElementById("count")
let category=document.getElementById("category")
let submit= document.getElementById("submit")
let mode="create"
let tmp;
//total
function getTotal(){
 if(price.value !=""){
    let result =( +price.value + +tax.value+ +ads.value) - +discount.value
    total.innerHTML=result
    total.style.background="#040"
 }
 else{
    total.innerHTML=" "
     total.style.background="#00d02"

 }
}
let dataProducts;
if(localStorage.product !=null){
    dataProducts= JSON.parse(localStorage.product)

}
else{
    dataProducts=[]
}
//create 

submit.onclick=function(){
    let newproduct={
        title:title.value,
        price:price.value,
         tax:tax.value,
         ads:ads.value,
         discount:discount.value,
         total:total.innerHTML,
         count:count.value,
         category:category.value
    }
    if(mode=== "create"){
        if(newproduct.count > 1){
            for(let i=0; i<newproduct.count; i++ ){
                dataProducts.push(newproduct)
            }
        }
        else if(mode==="create"){
            alert("Please Enter Data")
        }
        else{
            dataProducts.push(newproduct)
        }
    }
   
    else{
        dataProducts[tmp]=newproduct
        mode="create"
        submit.innerHTML="create"
        count.style.display="block"
    }
 

    //local storage
    localStorage.setItem('product' ,JSON.stringify(dataProducts))

    clearData()
    showData()
   
}

function clearData(){
    title.value=" "
    price.value =" "
    tax.value=" "
    ads.value=" "
   discount.value=" "
    total.innerHTML =" "
    count.value =" "
   category.value=" "

}
//show
function showData(){
    getTotal()
    let table=""
    for(let i =0;i<dataProducts.length; i++){

        table +=`     <tr>
                        <td> ${i}</td>
                        <td> ${dataProducts[i].title}</td>
                        <td> ${dataProducts[i].price}</td>
                        <td>${dataProducts[i].tax} </td>
                        <td>${dataProducts[i].ads}</td>
                        <td>${dataProducts[i].discount}</td>
                        <td>${dataProducts[i].total}</td>
                        <td>${dataProducts[i].category}</td>
                        <td> <button id="update" onclick="updateData(${i})" >Update</button></td>
                        <td> <button id="delete" onclick="deleteData(${i})">Delete</button></td>
                    </tr>
        
        
        
        `
    }
    document.getElementById('tbody').innerHTML=table
    let deletebtn= document.getElementById("deleteall")
    if(dataProducts.length>0){
        deletebtn.innerHTML=`
             <button onclick=deleteAll()> DeleteAll (${dataProducts.length}) </button>
        

        `

    }
    else{
        deletebtn.innerHTML=""
    }
}

showData()
//delete item

 function deleteData(i){
    dataProducts.splice(i,1)
    localStorage.product=JSON.stringify(dataProducts)
    showData()
 }
 //deleteall
 function deleteAll(){
    localStorage.clear()
    dataProducts.splice(0)
    showData()
 }
//update
function updateData(i){
    title.value=dataProducts[i].title
    price.value=dataProducts[i].price
    tax.value=dataProducts[i].tax
    ads.value=dataProducts[i].ads
   discount.value=dataProducts[i].discount
   category.value=dataProducts[i].category
   count.style.display="none"
   submit.innerHTML="Update"
   getTotal()
   mode="update"
   tmp=i;
   scroll({
    top:500,
    behavior:"smooth"
   })



}



