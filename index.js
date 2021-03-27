window.random = [];
let points = 0;
let flag = 10;

while(window.random.length < 10)
{
    var item = Math.floor(Math.random()*99+0);
    if(!window.random.includes(item))
    window.random.push(item);
}
console.log(window.random);

for(let i=0;i<=99;i++){
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", i);
    newDiv.classList.add("valid");
    newDiv.addEventListener("click", leftClickDone);
    newDiv.addEventListener("contextmenu", rightClickDone);
    document.getElementsByClassName("grid")[0].appendChild(newDiv);  
}
for(let i = 0 ; i < window.random.length ; i++){
    document.getElementById(window.random[i]).classList.remove("valid");
    document.getElementById(window.random[i]).classList.add("bomb");
}
for(let i = 0 ; i <= 99 ; i++){
    let data = neighbourhood(i);
    document.getElementById(i).setAttribute("data", data);
}
document.getElementById("flagsLeft").innerHTML = flag;

function DisplayBombs()
{
    for(var i = 0 ; i < 10 ; i++){
        document.getElementById(window.random[i]).style.backgroundImage = 'url("https://img.icons8.com/emoji/48/000000/bomb-emoji.png")';
        document.getElementById(window.random[i]).style.backgroundSize = "30px 30px";
    }        
}

function rightClickDone(event)
{
    event.preventDefault();
    let rightClickedCell = event.target;    
    if(rightClickedCell.classList.contains("flag"))
    {
            rightClickedCell.classList.remove("flag");
            rightClickedCell.innerHTML = '';
            flag++;
            document.getElementById("flagsLeft").innerHTML = flag;
    }
    else if(flag > 0)
    {
        rightClickedCell.innerHTML = '!';
        rightClickedCell.style.color = "red";
        flag--;
        document.getElementById("flagsLeft").innerHTML = flag;
        rightClickedCell.classList.add("flag"); 
        if(flag == 0)
        {
            let tempFlag = true;
            document.querySelectorAll(".flag").forEach((cell)=>{
                let temp = parseInt(cell.getAttribute("id"));
                if(window.random.includes(temp) == false)
                    tempFlag = false;
            })
            if(tempFlag)
            {
                document.getElementById("result").innerHTML = "YOU WIN!";
                document.getElementById("result").style.color = "green";
                document.querySelectorAll(".valid").forEach((cell) => cell.removeEventListener("click", leftClickDone) );
                document.querySelectorAll(".bomb").forEach((cell) => cell.removeEventListener("click", leftClickDone) );
                document.querySelectorAll(".valid").forEach((cell) => cell.removeEventListener("contextmenu", rightClickDone) );
                document.querySelectorAll(".bomb").forEach((cell) => cell.removeEventListener("contextmenu", rightClickDone) );        
            }
        }
    }
}


function leftClickDone(event)
{
    let clickedCell = event.target;
    let cellID = Number(clickedCell.getAttribute("id"));
    if(!window.random.includes(cellID))
    {
        points++;
        clickedCell.classList.add("checked");
        clickedCell.innerHTML = clickedCell.getAttribute("data");
        clickedCell.style.color = "black";
    }
    else
    {
        document.querySelectorAll(".bomb").forEach((cell)=>{
            cell.classList.add("checked");
        })
        DisplayBombs();
        document.getElementById("result").innerHTML = "YOU LOSE!";
        document.getElementById("result").style.color = "red";    
        document.querySelectorAll(".valid").forEach((cell) => cell.removeEventListener("click", leftClickDone) );
        document.querySelectorAll(".bomb").forEach((cell) => cell.removeEventListener("click", leftClickDone) );
        document.querySelectorAll(".valid").forEach((cell) => cell.removeEventListener("contextmenu", rightClickDone) );
        document.querySelectorAll(".bomb").forEach((cell) => cell.removeEventListener("contextmenu", rightClickDone) );
    }
    if(points == 90)
    {
        document.getElementById("result").innerHTML = "YOU WIN!";
        document.getElementById("result").style.color = "green";
        document.querySelectorAll(".bomb").forEach((cell) => cell.removeEventListener("click", leftClickDone) );
        document.querySelectorAll(".bomb").forEach((cell) => cell.removeEventListener("contextmenu", rightClickDone) );
        DisplayBombs();
    }
    clickedCell.removeEventListener("click", leftClickDone);
    clickedCell.removeEventListener("contextmenu", rightClickDone);
}


function neighbourhood(boxID)
{

    let count = 0;

    if(boxID == 0)
    {
        if(window.random.includes(1)){count++;}
        if(window.random.includes(10)){count++;}
        if(window.random.includes(11)){count++;}
    }
    else if(boxID == 9)
    {
        if(window.random.includes(8)){count++;}
        if(window.random.includes(18)){count++;}
        if(window.random.includes(19)){count++;}
    }
    else if(boxID == 90)
    {
        if(window.random.includes(80)){count++;}
        if(window.random.includes(81)){count++;}
        if(window.random.includes(91)){count++;}
    }
    else if(boxID == 99)
    {
        if(window.random.includes(88)){count++;}
        if(window.random.includes(89)){count++;}
        if(window.random.includes(98)){count++;}
    }
    else if(boxID==10||boxID==20||boxID==30||boxID==40||boxID==50||boxID==60||boxID==70||boxID==80)
    {
        if(window.random.includes(boxID-10)){count++;}
        if(window.random.includes((boxID-10)+1)){count++;}
        if(window.random.includes(boxID+1)){count++;}
        if(window.random.includes(boxID+10)){count++;}
        if(window.random.includes((boxID+10)+1)){count++;}
    }
    else if(boxID==1||boxID==2||boxID==3||boxID==4||boxID==5||boxID==6||boxID==7||boxID==8)
    {
        if(window.random.includes(boxID-1)){count++;}
        if(window.random.includes(boxID+1)){count++;}
        if(window.random.includes(boxID+9)){count++;}
        if(window.random.includes((boxID+9)+1)){count++;}
        if(window.random.includes((boxID+9)+2)){count++;}
    }
    else if(boxID==19||boxID==29||boxID==39||boxID==49||boxID==59||boxID==69||boxID==79||boxID==89)
    {
        if(window.random.includes(boxID-1)){count++;}
        if(window.random.includes(boxID-10)){count++;}
        if(window.random.includes((boxID-10)-1)){count++;}
        if(window.random.includes(boxID+10)){count++;}
        if(window.random.includes((boxID+10)-1)){count++;}
    }
    else if(boxID==91||boxID==92||boxID==93||boxID==94||boxID==95||boxID==96||boxID==97||boxID==98)
    {
        if(window.random.includes(boxID-1)){count++;}
        if(window.random.includes(boxID+1)){count++;}
        if(window.random.includes(boxID-10)){count++;}
        if(window.random.includes((boxID-10)+1)){count++;}
        if(window.random.includes((boxID-10)-1)){count++;}
    }
    else
    {
        if(window.random.includes(boxID-1)){count++;}
        if(window.random.includes(boxID-10)){count++;}
        if(window.random.includes((boxID-10)+1)){count++;}
        if(window.random.includes((boxID-10)-1)){count++;}
        if(window.random.includes(boxID+1)){count++;}
        if(window.random.includes(boxID+10)){count++;}
        if(window.random.includes((boxID+10)-1)){count++;}
        if(window.random.includes((boxID+10)+1)){count++;}        
    }
    
    return count;
}