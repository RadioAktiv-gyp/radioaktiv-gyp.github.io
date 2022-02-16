const input = document.getElementById("rainputverif");
const inputval = document.getElementById("rainputverif").value;
const code = "0356";


function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}
function eraseCookie() {
    createCookie("err","",-1);
}

// input.addEventListener("focusout", () =>{
//     console.log(inputval);
//     if(inputval === code){
//         document.getElementById("btrls").addEventListener("click", () =>{
//             window.location.href = "/hören.html";
//             eraseCookie("err");
//         })    
//     }else if(inputval !== code){
//         document.getElementById("btrls").addEventListener("click", () =>{
//             window.location.reload();
//             createCookie("err", "0360356", 0.0006);
//         })    
        
//     }else{
//         document.getElementById("btrls").addEventListener("click", (ev) =>{
//             ev.preventDefault();
//         })    
//     }    
// })    

$(input).change(function(){
    console.log(inputval);
    if($("#rainputverif").val() === code){
        document.getElementById("btrls").addEventListener("click", () =>{
            window.location.href = "/hören.html";
            eraseCookie("err");
            createCookie("_ra_acc_485_tk", "2849759624987564", 2)
        })    
    }else if(inputval !== code){
        document.getElementById("btrls").addEventListener("click", () =>{
            window.location.reload();
            createCookie("err", "0360356", 0.0006);
        })    
        
    }else{
        document.getElementById("btrls").addEventListener("click", (ev) =>{
            ev.preventDefault();
        })    
    }    
})
