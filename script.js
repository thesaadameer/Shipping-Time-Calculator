let button = document.getElementById('btn');
let shippingTime = 0;

button.addEventListener('click', () => {
    let quantity = parseInt(document.getElementById('number').value);
    let output = document.getElementById('output');
    let dateStr = document.getElementById('date').value;
    let initial = document.getElementById('initial');
    let fabric = (document.getElementById('fabric').value); 
    const actualDate = new Date(dateStr);

    if(isNaN(quantity)){
        alert("Enter a valid Quantity");
        return;
    }
    else if(dateStr == ""){
        alert("Enter a valid Date");
        return;
    }
    else if(fabric.length === 0){
        alert("Enter a valid Fabric");
        return;
    }  


    if(fabric == "Cotton" && quantity < 50){
        shippingTime = 2;
    }
    else if(fabric == "Cotton" && quantity >= 50){
        shippingTime = 3;
    }
    else if(fabric == "Linen" && quantity < 50){
        shippingTime = 4;
    }
    else if(fabric == "Linen" && quantity >= 50){
        shippingTime = 5;
    }

    //alert(typeof(actualDate));
    
    let day = actualDate.getDay();
    let date = actualDate.getDate();
    let month = actualDate.getMonth();
    let year = actualDate.getFullYear();
    let newDate = date;
    let newMonth = month;
    let newDay = day;
    let newYear = year;
    let i = 0;

    // if order is made on weekend
    if(day == 5){
        shippingTime += 2;
    }
    else if(day == 6){
        shippingTime++;
    }

    for(i = 0; i < shippingTime; i++){
        newDay++;
        if(newDay > 6){
            newDay -= 7;
        }
        newDate++;
        if(newDate == 4 && newMonth == 6 && newDay != 5  && newDay != 6){
            newDate++;
            newDay++;
        }
        if(newDate == 25 && newMonth == 11 && newDay != 5 && newDay != 6){
            newDate++;
            newDay++;
        }
        if(newDay == 5){
            newDay -= 5;
            newDate += 2;
        }
    }  


    switch(month){
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
            if(newDate > 31){
                newDate -= 31;
                newMonth++;
            }   
            break;
        case 11:
            if(newDate > 31){
                newDate -= 31;
                newMonth = 0;
                newYear++;
            }   
        case 1:
            if(newDate > 28){
                newDate -= 28;
                newMonth++;
            }  
            break;
        
        default:
            if(newDate > 30){
                newDate -= 30;
                newMonth++;
            }  
            break;
            
    }
    
    const arrival = new Date();
    arrival.setFullYear(newYear, newMonth, newDate);
    
    const nameOfMonth = arrival.toLocaleString('default', {
        month: 'long',
      });

    initial.innerHTML = `You estimated shipping time is `;
    output.innerHTML = `${newDate} ${nameOfMonth} ${newYear}`;

});

