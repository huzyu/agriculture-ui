window.addEventListener('storage',function(e){
    if(e.key === "erro") {
        var msg = JSON.parse(e.newValue);
        if ("erro" in msg) {
            var err = msg.erro;
            console.log(err);
            if(err.remote_Local_Control){
               document.getElementById("kongzhi").setAttribute("hidden", true)
               document.getElementById("local").removeAttribute("hidden");
            } else {
               document.getElementById("kongzhi").removeAttribute("hidden");
               document.getElementById("local").setAttribute("hidden", true);
            }
            
            
        }
    }
})
