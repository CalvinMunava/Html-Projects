
//------------------------- Store -----------------------------\\
var Home = document.getElementById("home");
var Cart = document.getElementById("cart");
var StoreItems = document.getElementById("StoreItems");
var TotalInCart = document.getElementById("totalIncart");
var MainTitle = document.getElementById("title");
var Title = document.getElementById("showTitle");
var Creator = document.getElementById("showCreator");
var RealeaseYear = document.getElementById("showYear");
var Price = document.getElementById("showPrice");
var TableBody = document.getElementById("tbody");  


let Items = [  
                {
                    id: 0,
                    title: "12GB Nvidia 3090 ti Graphics Card",
                    realease_year: 2020,
                    description: "The GeForce RTX™ 3090 Ti and 3090 are big ferocious GPUs (BFGPUs) with TITAN class performance. Powered by Ampere—NVIDIA’s 2nd gen RTX architecture—they double down on ray tracing and AI performance with enhanced Ray Tracing Cores, Tensor Cores, and new streaming multiprocessors. Plus, they feature a staggering 24 GB of G6X memory, all to deliver the ultimate experience for gamers and creators.",
                    image_url: "./../assets/images/obj1.png",
                    price: 22483.35,
                    total_sold:0,
                    creator: "Nvidia",
                    number_in_Cart:0
                },
                {
                    id: 1,
                    title: "VENGEANCE® RGB PRO 32GB (2 x 16GB) DDR4 DRAM 3200MHz C16 Memory Kit — Black",
                    realease_year: 2018,
                    description: "CORSAIR VENGEANCE RGB PRO Series DDR4 overclocked memory lights up your PC with mesmerizing dynamic multi-zone RGB lighting, while delivering the best in DDR4 performance",
                    image_url: "./../assets/images/obj2.png",
                    price: 3405.15,
                    total_sold:0,
                    creator: "Corsair",
                    number_in_Cart:0
                },
                {
                    id: 2,
                    title: "AMD Ryzen™ 9 5900X ",
                    realease_year: 2020,
                    description: "A fast and easy way to expand and accelerate the storage in a desktop PC with an AMD Ryzen™ processor.",
                    image_url: "./../assets/images/obj3.png",
                    price: 10799.00,
                    total_sold:0,
                    creator: "AMD",
                    number_in_Car:0
                },
                {
                    id: 3,
                    title: "MasterWatt Lite 230V 700W",
                    realease_year: 2017,
                    description: "80 Plus EU (230V) certified 85% efficiency APFC + PWM combined with dual forward topology to increase stability and performance Green power design to meet ErP 2013 Lot6 & new CE energy saving regulation Silent 120mm HDB fan with intelligent fan-speed control, to enhance longevity and help reduce noise in power unit. Fully protection (OCP/OVP/SCP/OPP) with build-in Over Temperature Protection (OTP)",
                    image_url: "./../assets/images/obj4.png",
                    price: 1199.00,
                    total_sold:0,
                    creator: "Cooler Master",
                    number_in_Cart:0
                }
           ];

function openStore()
{
    Home.hidden = false;
    Cart.hidden = true;
}

function clearDetails()
{
   Title.innerText = '';
   Creator.innerText = '';
   RealeaseYear.innerText = '';
   Price.innerText = '';
}

function ShowDetails(id)
{
    clearDetails();

    var Item = Items[id];
    MainTitle.innerHTML = Item.title;
    Title.innerText =  Item.title;
    Creator.innerText = Item.creator;
    RealeaseYear.innerText = Item.realease_year;
    Price.innerText = Item.price;
}

function ReserveItem(id)
{

    //Read The local Storage CART
    var ItemsInCart = JSON.parse(localStorage.getItem('ItemsInCart'));

    //Check if Cart Exists
    if(ItemsInCart == null)
    {   
        //Setting Items Array to be equal to Current Array 
        ItemsInCart = [];
    }

    //Locate Item In Store
    var  Item = Items[id];
    Item.number_in_Cart = 1;

    if(ItemsInCart.length > 0)
    {
        var InCart = false;
        for(var i = 0; i < ItemsInCart.length; i++ )
        {
            //check if Item Im trying to book or reserve is already in cart
            if(Item.id == ItemsInCart[i].id)
            {
                //If yes update the Items Number in cart
                InCart = true
            }
        }
        if(InCart == false)
        {
            //Add Item to Array
            ItemsInCart.push(Item); 
        }
        else
        {
            alert("Items Already In Cart")
        }
    }
    else
    {
        //Add Item to Array
        ItemsInCart.push(Item); 
    }

    //Update The Car Items Top right
    TotalInCart.innerHTML = JSON.stringify(ItemsInCart.length)


    //Update The Local Storage
    localStorage.setItem('ItemsInCart',JSON.stringify(ItemsInCart))




    // localStorage.setItem('ItemsInCart',5);
    // localStorage.setItem('totalCost',3);
    // localStorage.setItem('numberIncart',2);

}

function openCart()
{
    Home.hidden = true;
    Cart.hidden = false;
    LoadCart();
}

function LoadStore() {
    Cart.hidden = true;
    let div ='<div class="row">';
    for(var i = 0; i < Items.length; i++ )
    {
        div +=  "<div class='col-lg-3'>"+ 
                   "<div class='card'>"+
                       "<div class='imageDiv'><img class='card-img-top' src='"+ Items[i].image_url  +"'/></div>"+
                        "<div class='card-body'>"+
                            "<h4 class='card-title'>"+Items[i].title +"</h4>"+
                            "<p class='card-text'>"+Items[i].description +"</p>"+
                        "</div>"+
                        "<p><h5><b class='price'>R "+ Items[i].price  +"</b></h5></p>"+
                        "<div class='card-footer'>"+
                            "<div class='btn-group'>"+
                                "<button  class='btn btn-primary' onclick='ShowDetails("+Items[i].id +")' data-toggle='modal' data-target='#exampleModal'>Show Details</button>"+
                                "<button  class='btn btn-success' onclick='ReserveItem("+Items[i].id +")' >Reserve Item</button>"+
                            "</div>"+
                        "</div>" +
                    "</div>"+
                  "</div>"
    }
    div +=  "</div>";
    StoreItems.innerHTML = div;
}


function LoadCart() 
{
    let tbody = ''; 
    if(localStorage.length > 0 )
    {
        //Read The local Storage CART
        var ItemsInCart = JSON.parse(localStorage.getItem('ItemsInCart'));

        //empty body
        TableBody.innerHTML = '';

        for(var i = 0; i < ItemsInCart.length; i++ )
        {
          
          var trow ='<tr>'+
                    '<td><button class="btn btn-danger" onclick="RemoveItem('+ ItemsInCart[i].id +')" ><i class="fa fa-times"></i></button> '+ ItemsInCart[i].title +'</td>'+ 
                    '<td>'+ ItemsInCart[i].price +'</td>'+
                    '<td><button class="btn btn-primary" onclick="decrease('+ ItemsInCart[i].id +')" ><i class="fa fa-arrow-left"></i></button>'
                             +  ItemsInCart[i].number_in_Cart +
                         '<button class="btn btn-primary" onclick="Increase('+ ItemsInCart[i].id +')" ><i class="fa fa-arrow-right"></i></button>'+
                    '</td>'+
                    '<td>R'+ parseFloat(ItemsInCart[i].number_in_Cart * ItemsInCart[i].price).toFixed(2) +'</td>'+
                    '</tr>';
          var html = TableBody.innerHTML + trow;
          TableBody.innerHTML = html;
          
        }

        var Total = getTotal();

        var trow =  '<tr class="totalLine"><td></td><td><b>Total:<b></td><td class="text-danger">R'+ Total +'</td></tr>';

        var html = TableBody.innerHTML + trow;
        TableBody.innerHTML = html;
    }
    else
    {
        tbody +=  '<tr><td>No Accessories in Your Cart</td></tr>';
        TableBody.innerHTML = tbody;
    }

}

function getTotal()
{
    //Read The local Storage CART
    var ItemsInCart = JSON.parse(localStorage.getItem('ItemsInCart'));
    
    var Total = 0;

    for(var i = 0; i < ItemsInCart.length; i++ )
    {
        var lineTotal = ItemsInCart[i].number_in_Cart * ItemsInCart[i].price;
        Total += lineTotal;

    }

    return parseFloat(Total).toFixed(2);
}

function Increase(id)
{
    //Increase by first finding in local storage 
    var ItemsInCart = JSON.parse(localStorage.getItem('ItemsInCart'));

    //update 
    ItemsInCart.find(item => item.id == id).number_in_Cart + 1; 

    //Update The Local Storage
    localStorage.setItem('ItemsInCart',JSON.stringify(ItemsInCart))


    //call loadcart 
    LoadCart(); 

}

function decrease(id)
{

   //decrease by first finding in local storage 
    

    //update 


    //call loadcart 
    
}


function RemoveItem(id)
{
    //remove from local storage and call  LoadCart()
}






