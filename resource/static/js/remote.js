

window.addEventListener('storage',function(e){
    if(e.key === "erro") {
        var msg = JSON.parse(e.newValue);
        if ("erro" in msg) {
            var err = msg.erro;
            console.log(err);
            if(err.remote_Local_Control){
               var aList = document.getElementsByTagName("a");
               for(let i = 0; i <aList.length; i++) {
                   aList.disabled = true;
               }
               document.getElementById("local").removeAttribute("hidden");
            } else {
               var aList = document.getElementsByTagName("a");
               for(let i = 0; i <aList.length; i++) {
                   aList.disabled = true;
               }
               document.getElementById("local").setAttribute("hidden", true);
            }
            
            
        }
    }
})
