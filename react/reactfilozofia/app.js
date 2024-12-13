const { create } = require("domain");
//natív --> hogyan?
const btn = document.createElement('button');

btn.onclick = function()
{
alert("Ez egy natív kód");    
}
btn.innerHTML= "Natív gomb";

document.getElementById("nativ-button-container").appendChild(btn); //btn változóba létrehozunk egy gombot

appendChild(btn);
//react --> mit akarok látni?
React.createElement("button",

{
onClick: function()
{
    alert("Klikk esemény történt"); //gomb funkciója
},

},
"React gomb"
);

//első paraméter az elemet amit használni szeretnénk,
//második paramitér egy referencia egy natív DOM elemre,hivatkozáspont megadása
ReactDOM.render(gomb,document.getElementById("react-button container"));

ReactDOM.render(
<button
onClick={()=>{
alert("ok")
}}
className="btn btn-outline-primary"
>
Gomb
</button>,
document.getElementById("button1-container")

);
