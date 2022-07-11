const MobilePhone = function(brand, model){
    this.brand = brand;
    this.model = model;
    
    let telOn = false;
    let telCharge = 0; // уровень заряда АКБ
    let deblock = false; // телефон разблокирован
    let cash = 0;

    let tellCall = false;

    let startTimeCall= 0;
    let endTimeCall =0;
    let timeCall = 0;

    let usePhoneTime =0;
    let noUsePhoneTime =0;
    let useTime =0;

    let tarif = 1.5;
    let answer = false;



    this.charge = function(value){
        if(value > 100) value = 100;
        if(value > 0) {
            telCharge = value;
        } 
    };

    this.on= function () {
        if(telCharge >0){
            telOn = true;
            telCharge -=0.005;
        } else{
            console.log("Зарядите телефон!");
        }
        
    };

    this.balance = function(cashValue = 0){
        cash = cashValue;
    };

    this.usePhone = function(){
        usePhoneTime = Date.now();
        deblock = true;
    };

    this.noUsePhone = function(){
        noUsePhoneTime = Date.now();
        useTime = (noUsePhoneTime- usePhoneTime) / 1000;
        telCharge-= useTime* 0.5;
        console.log(useTime);
        deblock= false;
        if(telCharge == 0){
            console.log("Телефон разрядился")
            this.off();
        }
    }

    this.call = function(){
        if(telOn && cash > 0 && telCharge > 0 && (deblock) && !answer ){
            startTimeCall = Date.now(); 
            tellCall = true;
        } else if(!telOn){
            console.log("Телефон не включен");
        } else if(!deblock){
            console.log("Разблокируйте телефон");
        } else if(cash<= 0){
            console.log("Пополните баланс");
        }
    };

    this.callOff= function(){
        endTimeCall = Date.now();
        timeCall = Math.ceil( (endTimeCall- startTimeCall)/60000); // время последнего разговора
        tellCall= false;
        cash= cash - (tarif * timeCall);
    };
    this.answerCall= function(){
        if(!telCharge || !telOn || tellCall == false){
            answer= true;
        };
    };

    this.answerCallOff= function(){
        if(answer == true){
            answer= false;
            if(telCharge =0){
                console.log("Телефон разрядился")
                this.off()
            }
        }else{
            console.log("Вы не разговариваете");
        }
            
    };

    this.off= function(){
        telOn = false;
        telCharge = telCharge;
        deblock = false;
        tellCall = false;
        answer = false;
    }

    

    this.show= function(){

        console.log(`${this.brand.toUpperCase()}  ${this.model}
        Teлефон включен: ${telOn}
        Уровень заряда АКБ: ${Math.trunc(telCharge)}
        Телефон разблокирован: ${deblock}
        Баланс: ${cash}
        Исходящий вызов: ${tellCall}
        Входящий вызов: ${answer}
        `)

    }

}
let myPhone = new MobilePhone("Samsung", "S21");
myPhone.show();
// myPhone.charge(80);
// myPhone.on();
// myPhone.usePhone();
// myPhone.balance(2);
// myPhone.off()
// myPhone.show();
