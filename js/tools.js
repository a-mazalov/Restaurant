function validate(obj){
    let input = obj,
        flag = false,
        Verror = [],
        VRegExp = " ";
    
    for (var key in input) {

        switch(key){
            case         "name":    VRegExp = /([А-я]{3,16}$)|(^[A-z]{3,16}$)/;            break;         
            case     "lastName":    VRegExp = /([А-я]{3,22}$)|(^[A-z]{3,22}$)/;            break;        
            case    "telephone":    VRegExp = /(^[+]{1}[0-9]{12}$)|(^[0-9]{12}$)|(^[0-9]{9}$)|(^[0-9]{7}$)/;break;        
            case     "password":    VRegExp = /^[0-9А-яA-z-!@#$%^&*]{6,16}$/; break;        
            case         "date":    VRegExp = /(20)([1-9])\d-((0[1-9]|1[012])-(0[1-9]|[12]\d)|(0[13-9]|1[012])-30|(0[13578]|1[02])-31)/; break;        
            case         "time":    VRegExp = /(2[0-3]|[0-1]\d):[0-5]\d/; break;        
            case     "numguest":    VRegExp = /[1-8]/; break;        
            case     "useBonus":    VRegExp = /0|1|true|false/; break;        
            case        "bonus":    VRegExp = /^[0-9]{1,2}([,0-9]{0,3})?([0-9]{0,2})?$/; break;        
            case        "notes":    VRegExp = /^(?!.*#\^&.*\(\)\{\}\\\/.*$)([A-zА-я0-9!@.,\s]{0,60})$/; break;        
            case   "Title_dish":    VRegExp = /([А-я]{3,16}$)|(^[A-z]{3,16}$)/;         break;         
            case "Caption_dish":    VRegExp = /([А-я]{3,16}$)|(^[A-z]{3,16}$)/;         break;         
            case   "Price_dish":    VRegExp = /(^[0-9]*[.]?)([0-9]{1,2})+$/;            break;         
            case        "inpQR":    VRegExp = /^[^<>,.;:/]{4,10}$/;                     break;      
            case      "bonusQR":    VRegExp = /(^[0-9]{0,1})([.]?[0-9]){1,3}$/;            break;         
//            case      "bonusQR":    VRegExp = /(^[0-9]*[.]?)([0-9]{1,2})+$/;            break;         
            case     "amountQR":    VRegExp = /^[1-9]\d{0,2}$/;                         break;         
                default:            VRegExp = / /;                                      break;
        }

        console.log(key);
        console.log(VRegExp.test(input[key]));
        
        
        let valid = VRegExp.test(input[key]);
        
        if(!valid){
            Verror.push(outMsg(key));
            
        }
    }
    if(Verror && Verror.length == 0){
        Verror["Valid"] = true;
    }else{
        Verror["Valid"] = false;
    }
        
        
//            case      "name":  VRegExp = /(^[А-Я]{1}[а-я]{3,14}$)|(^[A-Z]{1}[a-z]{3,14}$)/;            break;        
//            case  "lastName":  VRegExp = /(^[А-Я]{1}[а-я]{3,20}$)|(^[A-Z]{1}[a-z]{3,20}$)/;            break;       
    
    return Verror;
}


function outMsg(key){
    switch(key){
        case      "name":  return "Имени";       break;         
        case  "lastName":  return "Фамилии";     break;
        case "telephone":  return "Телефона";    break;
        case  "password":  return "Пароля";      break;
        case      "date":  return "Даты";        break;
        case      "time":  return "Времени";     break;
        case  "numguest":  return "Количества гостей"; break;
        case  "useBonus":  return "Бонуса";      break;
        case     "bonus":  return "Бонуса";      break;
        case     "notes":  return "Заметки";     break;
        case     "inpQR":  return "Код (не допустимые символы)";     break;
        case   "bonusQR":  return "Размер бонуса";     break;
        case  "amountQR":  return "Количество кодов";     break;
        
    }
}

function str_rand() {
    var result = '';
    var words = '0123456789QWERTYUIOPASDFGHJKLZXCVBNM';
    var max_position = words.length - 1;
    for (i = 0; i < 6; ++i) {
        position = Math.floor(Math.random() * max_position);
        result = result + words.substring(position, position + 1);
    }
    return result;
}


function TestF(){
    alert('Test function');
    console.log('Test function');
}