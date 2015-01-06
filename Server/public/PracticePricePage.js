//This is the test program for the price. 

var price = 10; 
console.log(price);
document.getElementById("lblPrice").innerHTML = price.toString();

document.getElementById("raisePrice").addEventListener("click", raiseThePrice);
document.getElementById("lowerPrice").addEventListener("click", lowerThePrice);
document.getElementById("submit").addEventListener("click", sendToSever);
function sendToSever(){
price = savePrice.Price();

console.log("sent");
}
function raiseThePrice()
{
	price = price + 10; 
	console.log(price);
	document.getElementById("lblPrice").innerHTML = price.toString();
}

function lowerThePrice()
{
	price = price - 10; 
	console.log(price);

	if (price < 0)
	{
		price = 0; 
		console.log(price);
		document.getElementById("lblPrice").innerHTML = price.toString();
	}
	else
	{
		document.getElementById("lblPrice").innerHTML = price.toString();
	}
}