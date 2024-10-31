let taste_swe = ["Smakrikt, mycket fruktigt", "Nyanserad, kryddig, balanserad", "Nyanserad, fruktig, mycket frisk, aromatisk", "Fruktig, mycket frisk", "Generöst fruktig smak med fatkaraktär", "Mycket fruktig smak med fatkaraktär och liten sötma"];
let taste_eng = ["Flavorful, very fruity", "Nuanced, spicy, balanced", "Nuanced, fruity, very fresh, aromatic", "Fruity and very fresh", "Generous fruity taste with barrel character", "Very fruity taste with barrel character and small sweetnes"];

let sort_taste_swe = [taste_swe[3], taste_swe[1],taste_swe[5],taste_swe[0],taste_swe[4],taste_swe[2]];
let sort_taste_eng = [taste_eng[3], taste_eng[1],taste_eng[5],taste_eng[0],taste_eng[4],taste_eng[2]];

taste_swe = sort_taste_swe;
taste_eng = sort_taste_eng;

let notes_swe = ["björnbär", "blåbär", "citron", "eneträ", "fat",         "gröna äpplen", "hallon", "honung", "kaffe", "krusbär", "kryddnejlika", "kryddpeppar", "lagerblad", "lakrits", "lavendel", "lime", "mintchoklad", "mjölkchoklad", "mörk choklad", "mörka körsbär", "mynta", "örter", "päron", "persika", "plommon", "rökig mineral", "rökta charkuterier", "svarta oliver", "svartpeppar", "vanilj", "vita blommor", "vitpeppar"];
let notes_eng = ['blackberry','blueberry','lemon','juniper wood','barrel','green apples','raspberry','honey','coffee','gooseberry','cloves','allspice','bayleaf',             'liquorice','lavendel','lime','mint chocolate','milk chocolate','dark chocolate','dark cherries','mint','herbs','pears','peach','plums','smoked mineral','smoky charcuteries','black olives','black pepper','vanilla','white flowers','white pepper'];
let note_container = document.getElementById("notes").children[1];
let smak_container = document.getElementById("smak").children[1];

let smak = taste_swe;
let notes = notes_swe;


let taste_facit = [5, 0, 2, 4, 1, 3];
let facit = [[5,7,9,15,21,25,30],
            [2,5,21,22,23,25],
            [0,10,13,16,19,21,29],
            [1,11,17,19,20,29],
            [0,3,4,6,12,14,26,27,31],
            [0,8,18,20,24,28,29]];
let circle_facit = [[1,1,8,9,9,10],[5,4,7,8,9,9],[10,10,9,9,9,9]];

let circle_name_swe =  [["Sötma", "Fyllighet", "Fruktsyra"],["Fyllighet", "Strävhet", "Fruktsyra"]];
let circle_name_eng =  [["Sweetness", "Fullness", "Fruit acidity"],["Fullness", "Astringency", "Fruit acidity"]];

let circle_name = circle_name_swe;

document.onload = setLang();
document.onload = initialise();

function initialise(){
    console.log("!!!");
    let boxes = document.getElementById("cirklar").getElementsByClassName("circle_container");
    for(var i = 0; i < 3; i++){
        
        paint_circles(boxes[i]);
    }
}
function change_lang(btn){
    if(btn == btn.parentNode.firstElementChild){
        smak = taste_swe;
        notes = notes_swe;
        circle_name = circle_name_swe
        setLang();
    }else{
        smak = taste_eng;
        notes = notes_eng;
        circle_name = circle_name_eng;
        setLang();
    }
}
function setLang(){
    smak_container.innerHTML = "";
    note_container.innerHTML = "";
    for(var i = 0; i < smak.length; i++){
        temp_btn = document.createElement("BUTTON");
        temp_btn.innerHTML +=smak[i];
        temp_btn.classList.add("btn", "btn-outline-primary");
        temp_btn.setAttribute("onclick","radio_toggle(this)");
        smak_container.append(temp_btn);
    }
    
    for(var i = 0; i < notes.length; i++){
        temp_btn = document.createElement("BUTTON");
        temp_btn.innerHTML +=notes[i];
        temp_btn.classList.add("btn", "btn-outline-primary");
        temp_btn.setAttribute("onclick","activeToggle(this)");
        note_container.append(temp_btn);
    }

    set_circle_names();
}

function set_circle_names(){
    let choice = document.getElementById("wine_choice").value - 1;
    let circle_titles = document.getElementById("cirklar").children[1].getElementsByTagName("h4");
    if(choice < 2){
        for(let i = 0; i < circle_titles.length; i++){
            circle_titles[i].innerHTML = circle_name[0][i];
        }
    }else if(choice >= 2){
        for(let i = 0; i < circle_titles.length; i++){
            circle_titles[i].innerHTML = circle_name[1][i];
        }
    }
}

function radio_toggle(btn){
    let all_buttons = btn.parentNode.children;
    
    for(var i = 0; i < all_buttons.length; i++){
        if(all_buttons[i].classList.contains("btn-primary")){
            all_buttons[i].classList.remove("btn-primary");
            all_buttons[i].classList.add("btn-outline-primary"); 
        }
    }
    btn.classList.remove("btn-outline-primary");
    btn.classList.add("btn-primary");
}

function activeToggle(btn){
    if(btn.classList.contains("btn-outline-primary")){
        btn.classList.remove("btn-outline-primary");
        btn.classList.add("btn-primary");
    }else{
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline-primary");
    }
}



function check_answers(){
    let choice = document.getElementById("wine_choice").value;
    points = 0;
    points += check_taste(choice);
    points += check_notes(choice);
    points += check_circles(choice);

    document.getElementById("result").innerHTML = "<p> Points: "+points+"</p>";
}


function check_taste(wine_choice){
    let button_list = smak_container.children;
    for(var i = 0; i < button_list.length; i++){
        let btn = button_list[i];
        if(btn.classList.contains("btn-primary")){
            console.log(i);
            console.log(taste_facit[wine_choice -1]);
            if(taste_facit[wine_choice -1] == i){
                return 3;
            }
        }
    }
    return 0;
}

function check_notes(wine_choice){
    let notes_points = 0;
    let button_list = note_container.children;
    let answers = [];
    for(var i = 0; i < button_list.length; i++){
        let btn = button_list[i];
        if(btn.classList.contains("btn-primary")){
            answers.push(i);
        }
    }

    let specific_facit = facit[wine_choice - 1];
    for(i = 0; i < specific_facit.length; i++){
        if(answers.includes(specific_facit[i])){
            notes_points++;
        }
    }
    return notes_points;
}
function check_circles(wine_choice){
    let circles = document.getElementById("cirklar").getElementsByClassName("circle_container");
    let taste_points = 0;
    for(var i = 0; i < circles.length; i++){
        let circle = circles[i].children[0].children[0];
        let j = 0;
        while(circle.children[j].getAttribute("fill") == "#0d6efd"){
            j++;
        }

        let diff = Math.abs(j - circle_facit[i][wine_choice-1]);
        
        taste_points +=Math.max(0,(3 - diff));
    }
    
    return taste_points;
}

function paint_circles(box){
    let circle = box.children[0].children[0];
    for(var i = 0; i < 12; i++){
        let temp_path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let start_x = Math.floor(99 * Math.cos(Math.PI/2 - i * Math.PI/6));
        let start_y = Math.floor(-99 * Math.sin(Math.PI/2 - i * Math.PI/6));
        let end_x = Math.floor(99 * Math.cos(Math.PI/2 - (i+1) * Math.PI/6));
        let end_y = Math.floor(-99 * Math.sin(Math.PI/2 - (i+1) * Math.PI/6));

        temp_path.setAttribute("d", "M0 0 L"+start_x+" "+start_y+" A99 99 0 0 1 "+ end_x + " " + end_y + " Z");
        temp_path.setAttribute("fill", "#fff");
        temp_path.setAttribute("onclick", "fill_segment(this)");
        circle.appendChild(temp_path);
    }
}

function fill_segment(segment){
    let segments = segment.parentNode.children;

    for(let i = 0; i < segments.length; i++){
        console.log("hello");
        segments[i].setAttribute("fill", "#fff");
    }

    let j = 0;
    while(true){
        console.log(j);
        segments[j].setAttribute("fill", "#0d6efd");
        if(segments[j] == segment){
            break
        }
        j++;
    }
}
