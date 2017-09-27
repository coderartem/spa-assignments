let i, j, count, interval;
let autoClickers = [];

//Multi-session
let usersArray=[];
let userId=-1;

$(document).ready(()=>{
    i=checkCookie(i,"i");
    j=checkCookie(j,"j",1);
    count=checkCookie(count,"count");
    
  /*  //For muli-users
    userId = getCookie('userId');
    usersArray = getCookie('usersArray');
    if(userId!=-1){
        login(userId);
        return;
    }*/

    if(i===0 && j===1 && count===0){
        $('#reset').attr('disabled',true);
    }
    iCheck();
    $('#total').text('Total: '+i.toFixed(2));
    $('#btnCntr').text('+'+j.toFixed(2));
    $('#counter').html('&nbspAuto Clicks: '+count+'&nbsp');
    for(let x=0; x<count; x++){
        let interval = setInterval(autoClicker, 1000)
        autoClickers.push(interval);
    }
});

$(document).ready(()=>{
    $('#btnCntr').click(()=>{
            i=i+j;
            iCheck();
            $('#total').text('Total: '+i.toFixed(2));
            $('#reset').attr('disabled',false);
    });
});

$(document).ready(()=>{
    
    $('#btnLft').click(()=>{
        if(i>=10){
            j*=1.2;
            i-=10;
            $('#btnCntr').text('+'+j.toFixed(2));
            $('#total').text('Total: '+i.toFixed(2));
            iCheck();
            $('#reset').attr('disabled',false);
        }
    });
});

$(document).ready(()=>{
    $('#reset').click(()=>{
        reset();
    })
})

$(document).ready(()=>{
    $('#btnRght').click(()=>{
        if(i>=100){
            i-=100;
            $('#total').text('Total: '+i.toFixed(2));
            iCheck();
            $('#reset').attr('disabled',false);
            interval =  setInterval(autoClicker, 1000);
            autoClickers.push(interval);
            $('#counter').html('&nbspAuto Clicks: '+(++count)+'&nbsp');
        }
    });
});

//Save cookies on unload
$(window).on('unload',()=>{
    setAllCookies()
});



const reset = () => {
   for(x of autoClickers){
    clearInterval(x);
   }
   autoClickers=[];
    i=0;
    j=1;
    count=0;
    $('#total').text('Total: '+i.toFixed(2));
    $('#btnCntr').text('+'+j.toFixed(2));
    $('#counter').html('&nbspAuto Clicks: '+count+'&nbsp');
    $('#btnLft').css('background', 'GREY');
    $('#btnRght').css('background', 'GREY');
    $('#reset').attr('disabled',true);
}

const autoClicker = ()=>{
    i=i+j;
    iCheck();
    $('#total').text('Total: '+i.toFixed(2));
}

const iCheck = () =>{
    if(i<10){
        $('#btnLft').css('background', 'GREY');
    }else{
        $('#btnLft').css('background', 'WHITE');
    }
    if(i<100){
        $('#btnRght').css('background', 'GREY');
    }else{
        $('#btnRght').css('background', 'WHITE');
    }
}

const setAllCookies = () =>{
    setCookie("i", i);
    setCookie("j", j);
    setCookie("count", count);

  /*  //For Muli-users
    setCookie('userId',userId);
    setCookie('usersArray', usersArray);*/
}

const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const checkCookie = (param, name, startVal=0)=> {
    let temp =getCookie(name);

    if (temp != NaN) {
        param=Number(temp);
    } else {
        $('#reset').attr('disabled',true);
        param=startVal;
           setCookie(name, param);
    }
    return param;
}

const setCookie = (paramName,val)=>{
    document.cookie = paramName +"="+val+";path=/";
}

/*
//------------------------------------------------------------------
//User Login and Re-Login
const login = (uId) => {
    $('.loginPage').css('display','none');
    $('.main').css('display','block');
    i=usersArray[uId].values[0];
    j=usersArray[uId].values[1];
    count=usersArray[uId].values[2];

    $('#total').text('Total: '+i.toFixed(2));
    $('#btnCntr').text('+'+j.toFixed(2));
    $('#counter').html('&nbspAuto Clicks: '+count+'&nbsp');
    if(i===0 && j===1 && count===0){
        $('#reset').attr('disabled',true);
    }
    iCheck();
    for(let x=0; x<count; x++){
        let interval = setInterval(autoClicker, 1000)
        autoClickers.push(interval);
    }
}

//Login
$(document).ready(() => {
    $('#sbmt').click(() => {
        let fN = $('#login').val();
        let pss = $('#password').val();
        for(let x=0; x<usersArray.length; x++){
            if(usersArray[x].login===fN && usersArray[x].password===pss){
                login(x);
                userId=x;

                return;
            }
        }
        $('#wlcm').text('Idi nahui!!!')
    });
});

//NEW
$(document).ready(()=> {
    $('#new').click(()=> {
        let fN = $('#login').val();
        let pss = $('#password').val();
        for(let x=0; x<usersArray.length; x++){
            if(usersArray[x].login===fN){
                $('#wlcm').text('Name already exist!!!');
                return;
            }
        }
        if(fN!="" && pss!=""){
            let length = usersArray.push({login:fN, password:pss, values:[]});
            userId = length - 1;
            $('.loginPage').css('display','none');
            $('.main').css('display','block');
        }
    });
});

//LOGOUT
$(document).ready(() =>{
    $('#logout').click(()=>{
        usersArray[userId].values=[i,j,count];
        userId=-1;
        reset();
        $('.main').css('display','none');
        $('.loginPage').css('display','flex');
    });
});
*/

