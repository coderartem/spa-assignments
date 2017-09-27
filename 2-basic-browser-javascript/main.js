let i, j, count, interval;

$(document).ready(()=>{
    i=checkCookie(i,"i");
    j=checkCookie(j,"j",1);
    count=checkCookie(count,"count");
    if(i===0 && j===1 && count===0){
        $('#reset').attr('disabled',true);
    }
    iCheck();
    $('#total').text('Total: '+i.toFixed(2));
    $('#btnCntr').text('+'+j.toFixed(2));
    $('#counter').html('&nbspAuto Clicks: '+count+'&nbsp');
});

$(document).ready(()=>{
    $('#btnCntr').click(()=>{
            clearInterval(interval);
            i=i+j;
            iCheck();
            $('#total').text('Total: '+i.toFixed(2));
            setAllCookies();
            $('#reset').attr('disabled',false);
    });
});

$(document).ready(()=>{
    
    $('#btnLft').click(()=>{
        clearInterval(interval);
        if(i>=10){
            j*=1.2;
            i-=10;
            $('#btnCntr').text('+'+j.toFixed(2));
            $('#total').text('Total: '+i.toFixed(2));
            iCheck();
            setAllCookies();
            $('#reset').attr('disabled',false);
        }
    });
});

$(document).ready(()=>{
    $('#reset').click(()=>{
        clearInterval(interval);
        i=0;
        j=1;
        count=0;
        $('#total').text('Total: '+i.toFixed(2));
        $('#btnCntr').text('+'+j.toFixed(2));
        $('#counter').html('&nbspAuto Clicks: '+count+'&nbsp');
        $('#btnLft').css('background', 'GREY');
        $('#btnRght').css('background', 'GREY');
        setAllCookies();
        $('#reset').attr('disabled',true);
    })
})

$(document).ready(()=>{
    $('#btnRght').click(()=>{
        if(i>=100){
            i-=100;
            clearInterval(interval);
            $('#total').text('Total: '+i.toFixed(2));
            iCheck();
            $('#reset').attr('disabled',false);
            interval =  setInterval(autoClicker, 1000);
        }
    });
});

const autoClicker = ()=>{
    i=i+j;
    iCheck();
    $('#total').text('Total: '+i.toFixed(2));
    $('#counter').html('&nbspAuto Clicks: '+(count++)+'&nbsp');
    setAllCookies();
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
    setCookie("i",i);
    setCookie("j", j);
    setCookie("count", count);
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



