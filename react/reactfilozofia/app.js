const { create } = require("domain");

const btn = document.createElement('button');

btn.onclick = function()
{
alert("Ez egy natív kód");    
}
btn.innerHTML= "Natív gomb";

document.getElementById("nativ-button-container").appendChild(btn);

appendChild(btn);

React.createElement("button",

{
onClick: function()
{
    alert("Klikk esemény történt");
},

},
"React gomb"
);
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
