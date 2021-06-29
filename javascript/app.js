let is_going_at_left = true;
let limit_left = 0;
let limit_right = 520;

let current_selected_icon = 0;

let selected_stats_menu = 0;
let food_stat = 4;
let fun_stat = 4;
let discipline = 100;



let selected_food = 0;



let age_display = 0;
let weight = 0;

//5400 base value
//randomize between 0 and 3600 to add to base
let poop_timer = 5400;
let poop_count = 0;


let menu = Array();
menu[0] = "menu_food"
menu[1] = "menu_stats"
menu[2] = "menu_play"
menu[3] = "menu_toilet"
menu[4] = "menu_med"
menu[5] = "menu_sleep"
menu[6] = "menu_scold"
menu[7] = "menu_attention"

//food - 0
//status - 1

//main menu - 8
//animation - 9
let current_action = 8;

let is_light_on = true;


let is_moving = true;
function wander(){
    if(is_moving){
        setInterval(() => {
            movePet();
        }, 1000);
    }
}

function initPosition(){
    let pet = document.querySelector(".pet")
    pet.style.left = "260px"
    is_going_at_left = true;
}

function movePet(){
    let pet = document.querySelector(".pet")
    let num_values = (pet.style.left).replace("px","");
    num_values = parseInt(num_values);

    
    if(is_going_at_left){
        
        
        if(num_values > limit_left){
            num_values -= 10;
            pet.style.left = num_values + "px";
        }else{
            is_going_at_left = false;
            pet.classList.remove("left");
            pet.classList.add("right");
        }

    }else{
        
        if(num_values < limit_right){
            num_values += 10;
            pet.style.left = num_values + "px";
        }else{
            is_going_at_left = true;
            pet.classList.remove("right");
            pet.classList.add("left");
        }
    }

}

function currentTime() {
    let date = new Date(); /* creating object of Date class */
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    document.querySelector(".clock").innerText = hour + " : " + min ; /* adding time to the div */

    game_clock_tick();

    let t = setTimeout(function(){ currentTime() }, 1000); /* setting timer */
}

function game_clock_tick(){
    poop_timer--;
    console.log(poop_timer);
}

function poop_tick(){
    poop_timer--;

    if(poop_timer <= 0){

    }
}

function poop_trigger(){

}
  
function updateTime(k) {
    if (k < 10) {
        return "0" + k;
    }
    else {
        return k;
    }
}

function switchMainMenu(){
    let unselect = document.querySelector( "."+menu[current_selected_icon] );
    unselect.classList.remove("selected_icon");
    unselect.classList.add("unselected_icon");

    current_selected_icon++;
    if(current_selected_icon==7) current_selected_icon = 0;

    let select = document.querySelector( "."+menu[current_selected_icon] );
    select.classList.remove("unselected_icon");
    select.classList.add("selected_icon");

}

function openFoodMenu(){
    let menu = document.querySelector(".food_display");
    selected_food = 0;
    updateFoodArrow();
    menu.style.display = "block";
}

function changeSelectedFood(){
    selected_food++;
    if(selected_food ==2) selected_food=0;
}

function updateFoodArrow(){
    let arrow = document.querySelector(".food_menu_arrow");
    if(selected_food == 0){
        arrow.style.left = "200px"
    }

    if(selected_food == 1){
        arrow.style.left = "540px"
    }
}

function closeFoodMenu(){
    let menu = document.querySelector(".food_display");
    menu.style.display = "none";

    selectMenu(0)
    unselectMenu(1);
    unselectMenu(2);
    unselectMenu(3);
}

function openStatsMenu(){
    let menu = document.querySelector(".stats_display");
    menu.style.display = "block";
    selected_stats_menu = 0;

    selectMenu(0)
    unselectMenu(1);
    unselectMenu(2);
    unselectMenu(3);
}

function closeStatsMenu(){
    let menu = document.querySelector(".stats_display");
    menu.style.display = "none";
    selected_stats_menu = 0;
}

function changeStatsMenu(){


    let prev_selected = selected_stats_menu;
    selected_stats_menu++;
    if(selected_stats_menu == 4) selected_stats_menu = 0;


    unselectMenu(prev_selected);
    selectMenu(selected_stats_menu);

}

function selectMenu(to_select){
    let menu_list = Array();
    menu_list[0] = "stats_inner_front"
    menu_list[1] = "stats_inner_hunger"
    menu_list[2] = "stats_inner_happiness"
    menu_list[3] = "stats_inner_discipline"

    let select = document.querySelector( "."+menu_list[to_select] );
    select.classList.remove("unselected_stats_menu");
    select.classList.add("selected_stats_menu");
}

function unselectMenu(to_unselect){
    let menu_list = Array();
    menu_list[0] = "stats_inner_front"
    menu_list[1] = "stats_inner_hunger"
    menu_list[2] = "stats_inner_happiness"
    menu_list[3] = "stats_inner_discipline"

    let unselect = document.querySelector( "."+menu_list[to_unselect] );
    unselect.classList.remove("selected_stats_menu");
    unselect.classList.add("unselected_stats_menu");

}

function confirmFoodMenu(){

    if(selected_food == 0){
        displayAnimation(1);

    }
    if(selected_food == 1){
        displayAnimation(2);

    }

}

function displayAnimation(anim_index){
    let anim_array = Array();
    anim_array[0] = "blank_screen";
    anim_array[1] = "eat_meal";
    anim_array[2] = "eat_snack";
    anim_array[3] = "success";
    anim_array[4] = "fail";
    anim_array[5] = "refuse";
    anim_array[6] = "thrash";
    anim_array[7] = "vaccine";

    current_action = 9;

    let menu = document.querySelector(".animation_display");
    let image = menu.querySelector("img");
    menu.style.display = "block";
    image.src = "./images/animations/"+ anim_array[anim_index] + ".png";    

}

function closeAnimation(){
    let menu = document.querySelector(".animation_display");
    menu.style.display = "none";
    current_action = 8;
}


let minigame_score;
let minigame_try;
let guess_is_secret_greater;
let revealed_value;
let secret_value;
let minigame_stage;
/*
minigame_stage guide:
0 - reveals new revealed_value // hides secret_value
  - let player change "is_greater" until they confirm
  - Player confirm generates and reveals secret_value, game shows result
1 - wait player's click for reset

2 - Ends the game, get the result and displays animation
*/
function openMinigameMenu(){
    let menu = document.querySelector(".minigame_display");
    menu.style.display = "block";

    minigame_score = 0;
    minigame_try = 0;

    guess_is_secret_greater = false;
    let symbol_display = document.querySelector(".minigame_menu_symbol");
    symbol_display.src = "./images/objects/lesser_equal.png";


    let target_icon;
    for(let i = 1; i < 6; i++){
        target_icon = document.querySelector(".minigame_score_icon_" + i);
        target_icon.src = "./images/objects/mini_game_score_blank.png"
    }

    randomize_revealed_number();
    conceal_guessed_number();
    minigame_stage = 0;
}

function closeMinigame(){
    let menu = document.querySelector(".minigame_display");
    menu.style.display = "none";
}

//switches minigame display and variable
function switchMinigameGuess(){

    guess_is_secret_greater = !guess_is_secret_greater;

    let symbol_display = document.querySelector(".minigame_menu_symbol");

    if(guess_is_secret_greater){
        symbol_display.src = "./images/objects/greater_equal.png";  
    }else{
        symbol_display.src = "./images/objects/lesser_equal.png"; 
    }
    

}


function randomize_revealed_number(){
    let symbol_display = document.querySelector(".revealed_minigame_number");
    revealed_value = 1 + Math.floor(Math.random() * 9);
    symbol_display.innerHTML = revealed_value
}


function conceal_guessed_number(){
    let symbol_display = document.querySelector(".guessed_minigame_number");
    symbol_display.innerHTML = "x";
}

function generate_guessed_number(){
    let symbol_display = document.querySelector(".guessed_minigame_number");
    secret_value = 1 + Math.floor(Math.random() * 9);
    symbol_display.innerHTML = secret_value
}

function confirm_round_game(){
    minigame_try++;
    minigame_stage = 1;
    generate_guessed_number();

    let is_final_secret_greater = (revealed_value < secret_value);

    let is_round_won = ((is_final_secret_greater == guess_is_secret_greater)||(revealed_value==secret_value))

    if(is_round_won) minigame_score++;    
    update_minigame_display(is_round_won);

}

function update_minigame_display(is_round_won){

    let target_icon = document.querySelector(".minigame_score_icon_" + minigame_try);
    let symbol_display = document.querySelector(".minigame_menu_symbol");

    if(is_round_won){
        target_icon.src    = "./images/objects/mini_game_score_correct.png";
        symbol_display.src = "./images/objects/mini_game_correct.png"; 
    }else{
        target_icon.src    = "./images/objects/mini_game_score_wrong.png";
        symbol_display.src = "./images/objects/mini_game_wrong.png"; 
    }
}

function prepare_minigame_round(){

    if(minigame_try == 5){
        complete_minigame();
        return;
    }


    randomize_revealed_number();
    conceal_guessed_number();

    guess_is_secret_greater = false;
    let symbol_display = document.querySelector(".minigame_menu_symbol");
    symbol_display.src = "./images/objects/lesser_equal.png";

    minigame_stage = 0;
}

function complete_minigame(){
    
    if(minigame_score == 5){
        console.log("Perfect victory")
        closeMinigame();
        displayAnimation(3);
        
    }else if(minigame_score ==4 || minigame_score ==3 ){
        console.log("Victory");
        closeMinigame();
        displayAnimation(3);
    }else{
        console.log("Defeat")
        closeMinigame();
        displayAnimation(4);
    }

    current_stage = 9;

    
}


function pressA(){
    if(current_action == 8){
        switchMainMenu();
    }

    //food
    if(current_action ==0){
        changeSelectedFood();
        updateFoodArrow();
    }

    //check status
    if(current_action ==1){
        changeStatsMenu();
    }

    if(current_action == 2){
        if(minigame_stage == 0){
            switchMinigameGuess();
        }
        if(minigame_stage == 1){
            prepare_minigame_round();
        }
    }

}

function pressB(){
    if(current_action == 8){
        just_selected = true;
        if(current_selected_icon == 0){
            current_action = 0;
            openFoodMenu();
        }
        if(current_selected_icon == 1){
            current_action = 1;
            openStatsMenu();
        }
        if(current_selected_icon == 2){
            current_action = 2;
            openMinigameMenu();
        }

        setInterval(() => {
            just_selected = false;
        }, 500);
    }

    
    if(current_action == 0 && !just_selected){
        closeFoodMenu();
        confirmFoodMenu();
    }

    if(current_action == 2 && !just_selected){
        if(minigame_stage == 0){
            confirm_round_game();
        }
    }

    

}

function pressC(){
    if(current_action == 0){
        current_action = 8;
        closeFoodMenu();
    }
    if(current_action == 1){
        current_action = 8;
        closeStatsMenu();
    }

    if(current_action == 9){
        current_action = 8;
        closeAnimation();

    }
}

function start(){
    currentTime();
    initPosition();
    wander();
}

start();