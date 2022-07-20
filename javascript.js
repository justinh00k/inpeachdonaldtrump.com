//TRUMP.JS
Origami.fastclick(document.body);
var started = false;
var sound_off_to_start = true;
var dance = 0;
var start = 0;
var lights = 0;
var angry_num = 1; // Don't change 
var effect_count = 1; // ditto
var fall_count = 0;
var no_more_dancing = false;
var step_sound = true;
var walking = false;
var dancing = false;
var startup = true;
var falling = false;
var marching = false;
var jumping = false;
var konami_code = false;
var running = false;
var left_walking = false;
var right_walking = false;
var left = false;
var mouse_go = false;
var preloaded = false;
var audio_loaded = false;
var jumpcount = 0;
var fallen = false;
var user_drop = false;
var partying = false;
var still_partying = false;
let little_peach_x = 60;
let rotation = 30;
let transition = false;
let x_bonus = 50; // fading peach 
let fade_instance = 600; // fading peach
var jump_height = 50;


var reset_time = 2200;
var last_position = position = -126;
var initial_position = landing_position = 50;
var cutoff_1 = 335;
var cutoff_2 = 550;
var cutoff_3 = 300;
var cutoff_4 = 440;
var cutoff_4_bonus = 80;

var scene = 1;
var top_1 = -74;
var top_2 = -40;
var top_3 = 198;
var top_4 = 198;

var step = 10;
var volume_on = false;
var angry_count = 3; // number of heads
var buffer = .8;
var speed = 1;
var mobile = false;
var first_mobile = true;
var smoke_multiplier = 1;
var button_height = "-4px";



function load_audio() {

    step1_audio = new Audio('./assets/step_1.mp3');
    step2_audio = new Audio('./assets/step_2.mp3');
    step1_audio.volume = step2_audio.volume = step1_volume = .6;

    bg_audio_1 = new Audio('./assets/wind.mp3');
    bg_audio_1.volume = bg_volume_1 = .15;

    bg_audio_1.addEventListener('timeupdate', function() {

        if (volume_on && scene === 1 && this.currentTime > this.duration - buffer) {
            this.currentTime = 0;
            this.play();
        }
    }, false);

    // load
    bg_audio_2 = new Audio('./assets/peach/ocean.mp3');
    bg_audio_3 = new Audio('./assets/peach/lab.mp3');
    bg_audio_4 = new Audio('./assets/jungle.mp3');
    preloaded = true;
    bg_audio_2.volume = bg_volume_2 = .4;
    bg_audio_3.volume = bg_volume_3 = .2;
    bg_audio_4.volume = bg_volume_4 = .12;

    effect1_audio = new Audio('./assets/peach/impeachment_1.mp3');
    effect1_audio.volume = effect1_volume = .8;

    audio_loaded = true;


    bg_audio_2.addEventListener('timeupdate', function() {

        if (volume_on && scene === 2 && this.currentTime > this.duration - buffer) {
            this.currentTime = 0;
            this.play();
        }
    }, false);

    bg_audio_3.addEventListener('timeupdate', function() {

        if (volume_on && scene === 3 && this.currentTime > this.duration - buffer) {
            this.currentTime = 0;
            this.play();
        }
    }, false);

    bg_audio_4.addEventListener('timeupdate', function() {

        if (volume_on && scene === 4 && this.currentTime > this.duration - buffer) {
            this.currentTime = 0;
            this.play();
        }
    }, false);



}



document.getElementById("leftborder").addEventListener("touchstart", function(event) {
    event.preventDefault()
});

document.getElementById("rightborder").addEventListener("touchstart", function(event) {
    event.preventDefault()
});

document.getElementById("a").addEventListener("touchstart", function(event) {
    event.preventDefault()
});

document.getElementById("b").addEventListener("touchstart", function(event) {
    event.preventDefault()
});

document.getElementById("volume").addEventListener("touchstart", function(event) {
    event.preventDefault()
});


window.addEventListener('keydown', function(e) {
    if ((e.keyCode == 32 || e.keyCode == 37 || e.keyCode == 39) && e.target == document.body) {
        e.preventDefault();
    }
});


window.addEventListener("mouseup", function(event) {
    mouse_up();

});


window.addEventListener("touchend", function(event) {
    mouse_up();

});






$(window).focus(function() {

    $("#error").hide();

    if (volume_on)
        bg(true);
});

$(window).blur(function() {
    $("#error").show();
    started = false;
    bg(false);
});


function touch_end(action) {

    if (action === 1) {

        $("#rightborder").css('bottom', '0');
        right_walking = false;

        if (!right_walking && !left_walking)
            walking = false;
        else
            step_left();


    }
    if (action === 2) {
        $("#leftborder").css('bottom', '0');
        left_walking = false;
        if (!right_walking && !left_walking)
            walking = false;
        else
            step_right();

    }

    if (action === 3 || action === 4) {

        return;
    }

}



function bg(play) {


    if (play && volume_on) {
        if (scene === 1)
            bg_audio_1.play();
        else if (scene === 2)
            bg_audio_2.play();
        else if (scene === 3)
            bg_audio_3.play();
        else if (scene === 4)
            bg_audio_4.play();
    } else {
        bg_audio_1.pause();

        if (preloaded) {
            bg_audio_2.pause();
            bg_audio_3.pause();
            bg_audio_4.pause();
        }
    }

}


function select(x) {

    if (x === 0) {
        window.open("https://www.pushtrumpoffacliffagain.com");
        return;
    }
    if (scene === x || (falling && !mobile))
        return;

    if (!preloaded)
        load_audio();

    scene = x;

    jumpcount = 0;


    $("#scenes div").css("border-color", "#f8513d");
    $("#scene" + x).css("border-color", "#FFFFFF");
    $("#torso").css('background-image', "url('./assets/trump_torso_normal.png' )");
    //    $("#donald").css({ "transition": "left 0s, top 0s" });
    transition = false;
    $('#donald').css("transition-duration", "0");
    $('#torso').css("left", "0");
    $("#torso").css('transform', "rotate(0deg)");
    $("#donald").css('transform', "scale(1)");
    $("#torso").css('background-size', "100%");
    $("#torso").css('animation', "none");
    $("#head").hide();
    $("#spider_open").hide();
    $("#spider_closed").hide();
    $("#giantpeach").hide();
    $("#giantpeach_overlay").hide();
    $("#seagull").hide();
    //    $('#dino').css("top", "-870px");
    $('#dino').hide();

    $("#overlay").hide();
    $("#smoker").hide();


    $("#cover").hide();
    $('#leg1,#leg2').show();


    bg(false);

    party.stop();

    if (scene === 1) {

        $("#box").css("background-image", "url('./assets/peach/bg-6.jpg')");
        $("#overlay").css("background-image", "url('./assets/peach/bg-6-overlay.png')");
        $("#overlay").show();
        $("#donald").css('transform', "scale(.75)");




        if (!falling) {
            $("#donald").css({
                top: top_1 + "px"
            });

            if (position > cutoff_1) {

                position = last_position = cutoff_1 + 40;

                $("#donald").css("left", cutoff_1 + "px");
                setTimeout(function() {

                    take_step();
                }, 50);

            }
        }


    } else if (scene === 2) {

        if (!mobile) {
            party.start();



            drawSmoke();
        }

        $("#donald").css('transform', "scale(.75)rotate(30deg)");
        $("#giantpeach,#giantpeach_overlay").show();

        $("#dino").css("top", "-100px");


        party.step(2600);

        $("#dino").show();
        // $("#spider_open").show();
        $("#seagull").show();

        if (!mobile)
            $("#smoker").show();

        $("#box").css("background-image", "url('./assets/peach/bg-8.jpg')");

        if (!falling) {
            $("#donald").css({
                "top": top_2 + "px"
            });



            if (position > cutoff_2) {
                position = last_position = cutoff_2 + 40;
                $("#donald").css("left", cutoff_2 + "px");
                setTimeout(function() {

                    take_step();
                }, 50);
            }

        }



    } else if (scene === 3) {

        $("#box").css("background-image", "url('./assets/peach/bg-9.jpg')");
        $("#overlay").css("background-image", "none");
        $("#overlay").show();


        if (!falling) {
            $("#donald").css({
                "top": top_3 + "px"
            });


            if (position > cutoff_3) {
                position = last_position = cutoff_3 + 40;
                $("#donald").css("left", cutoff_3 + "px");
                setTimeout(function() {

                    take_step();
                }, 50);
            }
        }




    } else if (scene === 4) {

        $("#box").css("background-image", "url('./assets/peach/bg-7.jpg')");
        $("#dino").css("top", "-870px");
        $("#dino").show();
        $("#head").show();

        if (!falling) {
            $("#donald").css({
                "top": top_4 + "px"
            });


            if (position > cutoff_4) {
                position = last_position = cutoff_4;
                $("#donald").css("left", cutoff_4 + "px");
                setTimeout(function() {

                    take_step();
                }, 50);
            }
        }



    }

    bg(true);

}





function mouse_up() {


    $("#error").hide();

    if (!started) {
        started = true;

        volume_on = true;
        bg(true);
        $("#volume").attr('src', volumeon.src);
        sound_off_to_start = false;
    }


    if (!map[37])
        $("#leftborder").css('bottom', '0');

    if (!map[39])
        $("#rightborder").css('bottom', '0');

    if (!map[37] && !map[39])
        walking = false;

}

var hat_mouse = ["0", "1", "0", "1", "0", "1", "0", "1"];
var mouse_sequence = [];

function mouse_down(left) {

    if (left) {
        step_left();
        mouse_sequence.push("0");


    } else {
        step_right();
        mouse_sequence.push("1");
    }

    if (mouse_sequence.length > 8)
        mouse_sequence = mouse_sequence.slice(-8);

    if (mouse_sequence.length === 8) {

        var m = 0;
        for (i = 0; i < 8; i++) {
            if (mouse_sequence[i] === hat_mouse[i])
                m++;
            else
                break;

            if (m === 8 && !no_more_dancing)
                hatDance();
        }

    }
}

var sequence = [];
var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
var hatdance_sequence = [37, 39, 37, 39, 37, 39, 37, 39, 37, 39];
var map = {};

onkeydown = onkeyup = function(e) {
    e = e || event;
    map[e.keyCode] = e.type == 'keydown';





    if ((!map[16] && !map[66]) && e.type === "keyup")
        run(false);

    if ((map[16] || map[66]) && e.type === "keydown")
        run(true);

    if (map[32] || map[65]) {
        jump();
    }



    if (map[37]) {

        step_left();

    }

    if (map[39]) {

        step_right();

    }

    if (!map[39]) {
        $("#rightborder").css('bottom', '0');
    }
    if (!map[37]) {
        $("#leftborder").css('bottom', '0');
    }

    if (!map[39] && !map[37]) {
        walking = false;
    }

    if (e.type === "keydown" && e.keyCode !== 16 && e.keyCode !== 32 && !(no_more_dancing && konami_code)) {
        sequence.push(e.keyCode);


        if (sequence.length > 10)
            sequence = sequence.slice(-10);

        if (sequence.length === 10) {
            var k = 0;
            hatdance = 0;
            for (i = 0; i < 10; i++) {
                if (sequence[i] === konami[i])
                    k++;

                if (sequence[i] === hatdance_sequence[i])
                    hatdance++;

                if (sequence[i] !== hatdance_sequence[i] && sequence[i] !== konami[i])
                    break;

                if (k === 10 && !konami_code)
                    konamiCode();

                if (hatdance === 10 && !no_more_dancing)
                    hatDance();

            }

        }
    }


}

function mouse_run() {

    if (running || mouse_go) {
        mouse_go = false;
        run(false);

    } else {
        run(true);
        mouse_go = true;
    }
}


function run(go) {

    if (!go && !mouse_go) {
        running = false;
        speed = 1;
        $("#a").css("background-color", "#F57558");
        $("#a").css('bottom', '0');
    } else {
        running = true;
        speed = 2;
        $("#a").css("background-color", "#f8513d")
        $("#a").css('bottom', '-2px');

    }


}


function jump() {


    if (jumping || falling || startup)
        return;


    jumping = true;

    if (scene === 2 && volume_on)
        splash_audio.play();

    $("#b").css('bottom', '-2px');
    setTimeout(function() {
        $("#b").css('bottom', '0');
    }, 150);

    var start_ce = ce;

    direction = 1;

    if (start_ce < 0)
        direction = -1;

    if (konami_code && volume_on)
        konami_jump.play();

    $("#dino_and_donald").css({

        "transition-duration": ".25s",
        "top": "-=" + jump_height + "px"


    });

    if (scene !== 2) {

        $("#leg1").css({

            "transition-duration": ".25s",
            "transform": "rotate(" + 20 * direction + "deg)"

        });


        $("#leg2").css({

            "transition-duration": ".25s",
            "transform": "rotate(" + (-20 * direction) + "deg)"

        });

    }

    setTimeout(function() {

        if (falling)
            return;


        $("#dino_and_donald").css({

            "transition-duration": ".25s",
            "top": 0

        });

        if (scene !== 2) {

            $("#leg1").css({

                "transition-duration": ".25s",
                transform: "rotate(" + 0 + "deg)"

            });

            $("#leg2").css({

                "transition-duration": ".25s",
                transform: "rotate(" + 0 + "deg)"

            });

        }

    }, 250);

    setTimeout(function() {

        jumping = false;

        landing_position = position;

        if (scene === 2)
            return;

        if (start_ce > 0)
            landing_position = position - 100;

        if (!falling && volume_on) {
            if (scene === 4) {
                grass_step2_audio.play();
                grass_step1_audio.play();
            } else {
                step2_audio.play();
                step1_audio.play();
            }
        }
    }, 500);



}

function tablet_mode(keyboard) {


    if (keyboard) {

        $('#buttons').hide();
        $('#spaces').show();
        $('#arrows').css('font-size', '1em');
        $('#leftborder,#rightborder').css('border-width', '1px');

        $('#keyboard_icon').hide();
        $('#tablet_icon').show();
    } else {

        $('#spaces').hide();
        $('#buttons').show();
        $('#arrows').css('font-size', '1.7em');
        $('#leftborder,#rightborder').css('border-width', '0');

        $('#tablet_icon').hide();
        $('#keyboard_icon').show();
    }



}

function step_left() {



    $("#leftborder").css('bottom', button_height);

    if (startup)
        return;

    if (!falling) {
        walking = true;
        //   hatcheck(true);
        left_walking = true;
        left = true;


        if (!stepping) {

            take_step();
        }
    }



}

function step_right() {

    $("#rightborder").css('bottom', button_height);


    if (startup)
        return;



    walking = true;
    right_walking = true;
    left = false;



    if (!stepping && !falling) {

        take_step();
    }

}




function volume_toggle() {

    if (sound_off_to_start)
        sound_off_to_start = false;

    if (mobile && first_mobile && audio_loaded) {

        first_mobile = false;

        hatdance_audio.volume = konami_pipe.volume = konami_jump.volume = konami_start.volume = step2_audio.volume = step1_audio.volume = bg_audio_2.volume = bg_audio_3.volume = bg_audio_4.volume = effect1_audio.volume = effect2_audio.volume = effect3_audio.volume = effect4_audio.volume = effect6_audio.volume = effect5_audio.volume = grass_step1_audio.volume = grass_step2_audio.volume = zap_audio.volume = splash_audio.volume = bird_audio.volume = peach_squish_1_audio.volume = peach_squish_2_audio.volume = peach_squish_3_audio.volume = 0;

        step1_audio.play();
        step2_audio.play();
        bg_audio_2.play();
        bg_audio_3.play();
        bg_audio_4.play();
        hatdance_audio.play();
        zap_audio.play();
        splash_audio.play();
        bird_audio.play();
        peach_squish_1_audio.play();
        peach_squish_2_audio.play();
        peach_squish_3_audio.play();

        grass_step2_audio.play();
        grass_step1_audio.play();
        effect6_audio.play();
        effect5_audio.play();
        effect4_audio.play();
        effect3_audio.play();
        effect2_audio.play();
        effect1_audio.play();

        step1_audio.pause();
        step2_audio.pause();
        bg_audio_2.pause();
        bg_audio_3.pause();
        bg_audio_4.pause();
        hatdance_audio.pause();
        zap_audio.pause();
        splash_audio.pause();
        bird_audio.pause();
        peach_squish_1_audio.pause();
        peach_squish_2_audio.pause();
        peach_squish_3_audio.pause();
        grass_step2_audio.pause();
        grass_step1_audio.pause();
        effect5_audio.pause();
        effect4_audio.pause();
        effect3_audio.pause();
        effect2_audio.pause();
        effect1_audio.pause();

        splash_audio.volume = splash_audio_volume;
        bird_audio.volume = bird_audio_volume;
        zap_audio.volume = zap_audio_volume;
        peach_squish_1_audio.volume = peach_squish_1_audio_volume;
        peach_squish_2_audio.volume = peach_squish_2_audio_volume;
        peach_squish_3_audio.volume = peach_squish_3_audio_volume;

        bg_audio_2.volume = bg_volume_2;
        bg_audio_3.volume = bg_volume_3;
        bg_audio_4.volume = bg_volume_4;

        grass_step1_audio.volume = grass_step2_audio.volume = grass_step_volume;

        step1_audio.volume = step2_audio.volume = step1_volume;

        konami_pipe.volume = konami_jump.volume = konami_start.volume = konami_volume;

        hatdance_audio.volume = hat_dance_volume;

        effect1_audio.volume = effect1_volume;
        effect2_audio.volume = effect2_volume;
        effect3_audio.volume = effect3_volume;
        effect4_audio.volume = effect4_volume;
        effect5_audio.volume = effect5_volume;


    }


    if (volume_on) {


        hatdance_audio.volume = 0;


        volume_on = false;

        bg(false);

        $("#volume").attr('src', volumeoff.src);

    } else {

        volume_on = true;

        bg(true);

        hatdance_audio.volume = hat_dance_volume;



        if (dancing)
            hatdance_audio.play();

        $("#volume").attr('src', volumeon.src);

    }

}



function take_step() {

    if (left && position <= initial_position)
        return;

    if (falling && !marching)
        return;

    stepping = true;

    frame = function() {

        if (position >= initial_position)
            startup = false;

        if ((!marching || (scene === 4 && position > cutoff_4 + cutoff_4_bonus)) && ((scene === 4 && position > cutoff_4) || (position > cutoff_1 && scene === 1) || (position > cutoff_2 && scene === 2) || (position > cutoff_3 && scene === 3) || (left && position <= initial_position) || (startup && position >= initial_position && !walking) || (!startup && !walking && (position >= last_position + step || position <= last_position - step)))) {

            stepping = false;
            last_position = position;
            clearInterval(id);

            if ((scene === 4 && position > cutoff_4 && !falling) || (scene === 1 && position > cutoff_1 && !falling) || (scene === 2 && position > cutoff_2 && scene === 2 && !falling) || (scene === 3 && position > cutoff_3 && !falling)) {
                fall();
            }


        } else {

            if (left)
                position -= speed;
            else
                position += speed;

            if (transition)
                $("#donald").css({

                    "transition-duration": "left 0s, top 0s"

                });

            $("#donald").css({

                "left": position + "px"

            });



            if (scene === 2 && position > initial_position + x_bonus)

            {
                let x_travel = (((fade_instance - (position - (initial_position + x_bonus))) / fade_instance) || 1);

                $("#donald").css({
                    "transform": "scale(" + (.75 * x_travel) + ")rotate(30deg)",
                    "top": (top_2 + (-50 * (1 - x_travel))) + "px"
                });

            }

            ce = Math.sin(((position - landing_position) / 100) * 3.14);

            if (!jumping && scene !== 2) {

                $("#leg1").css({

                    "transition-duration": "0s",
                    transform: "rotate(" + (20 * ce) + "deg)"

                });

                $("#leg2").css({

                    "transition-duration": "0s",
                    transform: "rotate(" + (-20 * ce) + "deg)"

                });

                if (ce > .95 && step_sound && volume_on) {
                    if (scene === 4)
                        grass_step2_audio.play();
                    else
                        step2_audio.play();

                    step_sound = false;
                } else if (ce < -.95 && step_sound && volume_on) {
                    if (scene === 4)
                        grass_step1_audio.play();
                    else
                        step1_audio.play();

                    step_sound = false;
                } else if (ce > -.5 && ce < .5 && !step_sound) {
                    step_sound = true;
                } else if (startup && ce === 0 && !walking && volume_on) {
                    if (scene === 4)
                        grass_step2_audio.play();
                    else
                        step2_audio.play();
                }
            }

        }
    }

    var id = setInterval(frame, 7);

}


function fall() {

    setTimeout(function() {

        update_counter(1);

    }, 500);

    falling = true;
    no_more_dancing = false;
    jumpcount = 0;

    sequence = [];

    if (!dancing && !konami_code) {

        setTimeout(function() {

            $("#torso").css('background-image', "url('./assets/trump_torso_angry_" + angry_num + ".png' )");

            angry_num++;

            if (angry_num > angry_count)
                angry_num = 1;

            if (volume_on) {
                if (effect_count === 1)
                    effect1_audio.play();
                else if (effect_count === 2)
                    effect2_audio.play();
                else if (effect_count === 3)
                    effect3_audio.play();
                else if (effect_count === 4)
                    effect4_audio.play();
                else if (effect_count === 5)
                    effect5_audio.play();
                else if (effect_count === 6) {
                    effect6_audio.play();
                    effect_count = 0;
                }
                effect_count++;
            }
        }, 0);
    } else if (konami_code && volume_on)
        konami_pipe.play();


    if (scene === 1) {

        if (volume_on)
            playSquish(250);

    }


    if (scene === 1) {

        transition = true;

        $("#donald").css({
            "transition": ".2s top ease, .2s left ease, .8s transform ease",
            "left": "+=50px",
            "top": "-=10px",
            "transform": "rotate(" + (Math.random() * 35) + "deg)"
        });


        setTimeout(function() {

            transition = true;
            $("#donald").css({

                "transition-duration": "1s",
                "top": "490px"

            });



        }, 200);

    } else if (scene === 2) {

        var peach_falls_after = 200;
        var peach_zooms_away = peach_falls_after + 600;
        var taken_away_after = 100 + peach_zooms_away;
        var peach_reset = taken_away_after + 1000;

        if (volume_on)
            bird_audio.play();


        take_step();

        setTimeout(function() {


            // seagull swoops down
            $("#dino").css({

                "transition-duration": ".5s",
                "top": "140px",
                "left": (position + 10) + "px"


            });




        }, peach_falls_after);





        setTimeout(function() {

            // Seagull swoops up with donald and peach
            $("#dino_and_donald").css({

                "transition-duration": "1s",
                "top": "-=500px",
                "left": "+=200px"
            });


            setTimeout(function() {
                $("#giantpeach").css({

                    "transition-duration": ".3s",
                    "transform": "scale(0)"
                });
            }, 1000);


        }, taken_away_after);

        setTimeout(function() {

            // reset

            $("#dino").css({
                "transition-duration": "0s",
                "top": "-100px",
                "left": "300px"

            });


        }, peach_reset);

    } else if (scene === 3) {

        let margin = 20;

        if (volume_on)
            zap_audio.play();

        $("#overlay").css("background-color", "white");

        setTimeout(function() {

            $("#overlay").css("background-color", "transparent");



            let flashes = 10;
            let flash_length = 30;

            for (let i = 0; i <= flashes; i++) {

                setTimeout(function() {

                    $("#donald").hide();

                    if (i !== flashes) {
                        setTimeout(function() {

                            $("#donald").show();

                        }, flash_length);
                    }



                }, flash_length * 2 * i);

            }

        }, 20);

        setTimeout(function() {

            if (mobile)
                $("#little_peach").css({
                    "transition-duration": "1s",
                    "top": (document.documentElement.clientHeight + 50) + "px"
                });
            else
                $("#little_peach").css({
                    "transition-duration": "1.5s",
                    "top": (document.getElementById("wrapper").offsetHeight + 50) + "px"
                });

            playSquish(750);

        }, 1500);


        setTimeout(function() {

            $(new Image()).attr({ 'src': './assets/peach/littlepeach.png', "style": "transform: rotate(" + rotation + "deg); left:" + little_peach_x + "%" }).appendTo($("#little_peaches"));

            little_peach_x = margin + (Math.random() * (100 - (2 * margin)));

            rotation = Math.random() * 360;

            $("#little_peach").css({ "transition-duration": "0s", "top": "-100px", "transform": "rotate(" + rotation + "deg)", "left": little_peach_x + "%" });

            $("#donald").show();

        }, reset_time);

    } else if (scene === 4) {

        // take_step();

        var peach_falls_after = 100;
        var rolls_away_after = 500 + peach_falls_after;
        var peach_reset = rolls_away_after + 500;

        setTimeout(function() {

            $("#dino").css({

                "transition-duration": ".3s",
                "top": "30px"

            });

            if (volume_on)
                playSquish(0);

        }, peach_falls_after);


        setTimeout(function() {
            $("#dino_and_donald").css({

                "transition-duration": "1.5s",
                "transform": "rotate(360deg)",
                "left": "+=700px",
                "top": "+=300px"

            });

        }, rolls_away_after);

        setTimeout(function() {



            $("#dino").css({
                "transition-duration": "0s",
                "top": "-870px"
            });




        }, reset_time);

    }

    setTimeout(function() {

        var toppx = top_1;

        if (scene === 2)
            toppx = top_2;
        else if (scene === 3)
            toppx = top_3;
        else if (scene === 4)
            toppx = top_4;

        transition = false;

        $("#donald").css({

            "transition-duration": "0s",
            "transform-origin": "bottom left",
            "opacity": "1",
            "transform": "rotate(0deg)",
            "left": "-126px",
            "top": toppx

        });

        (scene === 1) ? $("#donald").css('transform', "scale(.75)"):

            (scene === 2) ? $("#donald").css('transform', "scale(.75)rotate(30deg)") :

            $("#donald").css('transform', "scale(1)");

        $("#dino_and_donald").css({

            "transition-duration": "0s",
            "transform": "rotate(0deg)",
            "left": "0",
            "top": "0"
        });


        if (dancing) {

            hatdance_audio.pause();
            hatdance_audio.currentTime = 0;

        }

        $("#torso").css('background-image', "url('./assets/trump_torso_normal.png' )");

        jumping = false;
        landing_position = initial_position;
        konami_code = false;

        position = last_position = -126;

        if (scene === 2) {
            position = last_position = -250;
            $("#donald").css({ left: "-2506px" });

        }

        falling = false;
        startup = true;

        left = false;
        take_step();

    }, reset_time);

    if (ga || false) {

        ga('send', {
            hitType: 'event',
            eventCategory: 'Action',
            eventAction: 'Inpeached',
            eventLabel: scene,
            eventValue: fall_count
        });

    }


}


function playSquish(timeout) {

    setTimeout(function() {


        var a = Math.random();
        if (a < .33)
            peach_squish_1_audio.play();
        else if (a < .67)
            peach_squish_2_audio.play();
        else
            peach_squish_3_audio.play();
    }, timeout);

}

function konamiCode() {


    console.log("Konami Code!!");

    $("#torso").css("background-image", "url('./assets/trump_torso_8bit.png')");

    konami_code = true;

    if (volume_on)
        konami_start.play();

    ga('send', {
        hitType: 'event',
        eventCategory: 'Action',
        eventAction: 'Konami Code'
    });

}

function hatDance() {


    console.log("Mexican Hat Dance!!");

    $("#torso").css("background-image", "url('./assets/trump_torso_sombrero.png')");

    dance++; // tracking so we dont take hat off during second dance due to long timeout
    no_more_dancing = true;
    dancing = true;

    if (!volume_on)
        hatdance_audio.volume = 0;
    hatdance_audio.play();

    ga('send', {
        hitType: 'event',
        eventCategory: 'Action',
        eventAction: 'Hat Dance!'
    });


    setTimeout(function() {
        dance--;

        if (dance > 0)
            return;

        dancing = false;

        if (konami_code)
            $("#torso").css("background-image", "url('./assets/trump_torso_8bit.png')");
        else if (!falling)
            $("#torso").css("background-image", "url('./assets/trump_torso_normal.png')");

    }, 7400);


}

if (!mobile) {
    var canvas = document.getElementById('smoker');
    var ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 450;
    var party = smokemachine(ctx, [225, 225, 225]);
}

function drawSmoke() {


    var x = -50 + Math.random() * 900;
    var y = 200 + Math.random() * 300;
    var t = Math.random() * 10 * smoke_multiplier;

    party.addsmoke(x, y, t);


    setTimeout(function() {
        if (scene === 2)
            drawSmoke();
    }, 100);


}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function update_counter(num) {

    fall_count += num;


    $("#hitcount_span").html(fall_count);

    if (mobile) {

        $("#hitcount_span").css({

            'font-weight': 'bold'
        });

    } else {
        $("#hitcount_span").css({

            'opacity': '1'
        });
    }

    setTimeout(function() {
        if (mobile)
            $("#hitcount_span").css('font-weight', 'normal');
        else
            $("#hitcount_span").css('opacity', '.5');

    }, 1000);


    //    user_drop = true;


};

message1 = message2 = "";

var next_b = true;

// ON START //

volumeoff = new Image();
volumeon = new Image();
volumeoff.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkVEOUU3MzY2NkFEMTFFN0FEM0NCRkI2NEMyMzk3NTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkVEOUU3Mzc2NkFEMTFFN0FEM0NCRkI2NEMyMzk3NTAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGRUQ5RTczNDY2QUQxMUU3QUQzQ0JGQjY0QzIzOTc1MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGRUQ5RTczNTY2QUQxMUU3QUQzQ0JGQjY0QzIzOTc1MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtTrw2EAAAKrSURBVHja7JvBixJxFMdn1AZ0Lra1WakH6aKiNVPtJkJ6KYRAGCsCC08KmiD4X6R0EvoHREQPWoet1a27EHSQ/gDD8GoImpKk0xuYhWVZctl1nJ15vweDA7/D+P3Mb96872MeLYoihTkMFPIwlUolVf8Az/NUKBTCewfS6TQlPYZqHao/AmazmeQAVXPAJi9ms9lYQRCi8/n8T6PR2BuPx39pmsZB2u/3O3q93jdRjk6n855hmEu5XE7VHLAp8fbBYPBdPBaBQGA3mUzqOwmC+JutVmvfbrf7j6+xLLuldiFmUFj8DVn87ZPWlxC6rQRB/HVZ/B10pfAR8Rw6LwDibSD+E4jn0ZkhEH9NFn8XnRt0u93bsvh76OwwiN5uNpuS+Pvo+gEg+mq73f7o9Xp30DVEQPwVSbzP59tF1xE6Iv6Blj3KmQA4HI7LIH4PxAc0b4ctFoshlUq9DAaDO+DOJCCrinOR47iHLpeLp3QQpnq9/i4ajb7G2hAxgPgM5o6QtOVp7AAoAoAAIAAIAAKAACAACAACgAAgAAgAAoAAIABwAej3+18xAzAJgvCiWCy+8Xg8nLwjVn6x4HQ6b8EPowsA3W73ZyQSeSV1h6lTtsdisdijcrncNBqNrOYBHJ5Mp9NTf61RrVYPlstlrFKpfNA6hDMnwVqt9iWRSDxdLBa/0b4FAMJnrUM492tQ6xDWUgfIEJ5pEcLaCiGAcCBDmKKtBLUIYe2lMEBoawmCIl5ASxAUM0MyhOcXHYKibhAgtGQIs5PW6QswLKC4Hf4fBCin52hsZzwefyLVCYezAsPh8IfVat3KZrOqzgtsbGQGdsL+ZDJ5nMlkstLITKFQeDsajX4xDEOhjnw+j3tsTvdJcFXMZjN1GyLSFlQzwuGwqtenyfQ48vgnwAAcTfJMqvJP7wAAAABJRU5ErkJggg==';
volumeon.src = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDYxMS45ODEgNjExLjk4MSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNjExLjk4MSA2MTEuOTgxOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTI4NC41NCw2NC4wN2MtOC4yNzgtMy40MjEtMTcuODEyLTEuNTExLTI0LjIzNSw0Ljg5NEwxMjUuODMyLDIwNC4yOTJIMjIuMjUxQzkuOTE2LDIwNC4yOTIsMCwyMTQuMjQ1LDAsMjI2LjU0NHYxNjAuNjAxICAgIGMwLDEyLjI5OSw5LjkxNiwyMi4yNTEsMjIuMjUxLDIyLjI1MUgxMjUuMzRsMTM1LjAzOCwxMzUuMzI5YzQuMjU3LDQuMjc1LDkuOTg5LDYuNTMyLDE1LjczOCw2LjUzMiAgICBjMi44MzgsMCw1Ljc4Ni0wLjU0Niw4LjQ5Ny0xLjY5MmM4LjM1MS0zLjQyMSwxMy43NTUtMTEuNTU0LDEzLjc1NS0yMC41NDFWODQuNjI4QzI5OC4zNDksNzUuNjIzLDI5Mi44OTEsNjcuNDksMjg0LjU0LDY0LjA3eiIgZmlsbD0iI0ZGRkZGRiIvPgoJCTxwYXRoIGQ9Ik01MTYuMTE2LDMwNi4yMTZjMC04My4zNjUtNDkuNTQzLTE1OC40NTMtMTI2LjI1LTE5MS4zNjdjLTExLjI5OS00LjgzOS0yNC40MTYsMC4zODMtMjkuMjIsMTEuNjk5ICAgIGMtNC44NTcsMTEuMjgsMC4zNjQsMjQuMzYyLDExLjY2MiwyOS4yMDJjNjAuNDA1LDI1Ljg3Miw5OS4zMjMsODQuOTMxLDk5LjMyMywxNTAuNDY2YzAsNjUuMjQ1LTM4Ljc3MiwxMjQuMTU4LTk4LjgzMiwxNTAuMDQ5ICAgIGMtMTEuMjYyLDQuODc2LTE2LjQ4MywxNy45NTctMTEuNjI2LDI5LjIyYzMuNjIxLDguNDI0LDExLjgyNiwxMy40NDUsMjAuNTA1LDEzLjQ0NWMyLjg3NSwwLDUuODk2LTAuNTgyLDguNzctMS44MzggICAgQzQ2Ni44MjgsNDY0LjE3OSw1MTYuMTE2LDM4OS4yNTUsNTE2LjExNiwzMDYuMjE2eiIgZmlsbD0iI0ZGRkZGRiIvPgoJCTxwYXRoIGQ9Ik00MTcuNjg2LDMwNi4xOGMwLTQ0LjA0OC0yNi4xODItODMuNjIxLTY2Ljc3My0xMDAuODMyYy0xMS4yNjItNC43MTMtMjQuMzQ0LDAuNDczLTI5LjExLDExLjgwOCAgICBjLTQuODc2LDExLjMxNiwwLjQxOCwyNC4zOCwxMS43MTcsMjkuMTg0YzI0LjA5LDEwLjE4OCwzOS42MjcsMzMuNjk1LDM5LjYyNyw1OS44NDFjMCwyNS44MzYtMTUuMzkyLDQ5LjIzNC0zOS4xNTMsNTkuNTg3ICAgIGMtMTEuMjk5LDQuODc2LTE2LjQ0OCwxNy45NzYtMTEuNTksMjkuMjU2YzMuNjU3LDguMzg4LDExLjgyNiwxMy4zNzMsMjAuNDMyLDEzLjM3M2MyLjk0NywwLDYuMDA0LTAuNTgyLDguODc5LTEuODU2ICAgIEMzOTEuNzc2LDM4OS4xNDYsNDE3LjY4NiwzNDkuNzM4LDQxNy42ODYsMzA2LjE4eiIgZmlsbD0iI0ZGRkZGRiIvPgoJCTxwYXRoIGQ9Ik00MjcuNjc0LDI2LjgwN2MtMTEuMjk5LTQuODk0LTI0LjQ1MywwLjM0Ni0yOS4yMiwxMS42NjNjLTQuODc2LDExLjI5OSwwLjM0NiwyNC4zOCwxMS42NjIsMjkuMjAxICAgIGM5NS41OTMsNDEuMDI4LDE1Ny4zNDUsMTM0LjY1NiwxNTcuMzQ1LDIzOC41ODJjMCwxMDMuNTQzLTYxLjUxNiwxOTYuOTg5LTE1Ni44MTYsMjM4LjA5ICAgIGMtMTEuMjk5LDQuODc2LTE2LjUyMSwxNy45MzktMTEuNjk5LDI5LjIyYzMuNjU3LDguNDI0LDExLjgyNiwxMy40NDUsMjAuNDMyLDEzLjQ0NWMyLjk0OCwwLDYuMDA1LTAuNTgyLDguODc5LTEuODM3ICAgIGMxMTEuNTg2LTQ4LjEwNSwxODMuNzI2LTE1Ny42MTcsMTgzLjcyNi0yNzguOTM3QzYxMiwxODQuNTM0LDUzOS42NzgsNzQuODQsNDI3LjY3NCwyNi44MDd6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==';


$(document).ready(function() {

    $("#error").show();

    if ($("#buttons").is(":visible")) {
        mobile = true;
        smoke_multiplier = .7;
        button_height = "-2px";

        $("#volume").attr("src", volumeoff.src);
        volume_on = false;
        // chief.volume = 0;

    } else if (!document.hasFocus()) {
        $("#volume").attr("src", volumeoff.src);
        volume_on = false;
        //  chief.volume = 0;
    } else {
        $("#volume").attr("src", volumeoff.src);
        // bg(true);
    }

    $("#donald").css("top", top_1 + "px");

    img5 = new Image();
    img6 = new Image();
    img7 = new Image();
    img5.src = './assets/trump_torso_normal.png';
    img6.src = './assets/trump_left_leg.png';
    img7.src = './assets/trump_right_leg.png';

    // update_it();





    setTimeout(function() {

        img1 = new Image();
        img1.src = './assets/trump_torso_angry_1.png';

        bg2 = new Image();
        bg3 = new Image();
        bg4 = new Image();
        bg2.src = './assets/peach/bg-7.jpg';
        bg3.src = './assets/peach/bg-9.jpg';
        bg4.src = './assets/peach/bg-8.jpg';


        zap_audio = new Audio('./assets/peach/zap.mp3');
        zap_audio.volume = splash_audio_volume = 1;

        splash_audio = new Audio('./assets/peach/splash.mp3');
        splash_audio.volume = splash_audio_volume = .25;

        bird_audio = new Audio('./assets/peach/bird.mp3');
        bird_audio.volume = bird_audio_volume = 1;




        peach_squish_1_audio = new Audio('./assets/peach/squish1.mp3');
        peach_squish_1_audio.volume = peach_squish_1_audio_volume = 1;

        peach_squish_2_audio = new Audio('./assets/peach/squish2.mp3');
        peach_squish_2_audio.volume = peach_squish_2_audio_volume = 1;

        peach_squish_3_audio = new Audio('./assets/peach/squish3.mp3');
        peach_squish_3_audio.volume = peach_squish_3_audio_volume = 1;

        grass_step1_audio = new Audio('./assets/grass_step_1.mp3');
        grass_step2_audio = new Audio('./assets/grass_step_2.mp3');
        grass_step1_audio.volume = grass_step2_audio.volume = grass_step_volume = .4;

        img2 = new Image();
        img3 = new Image();
        img2.src = './assets/trump_torso_angry_2.png';
        img3.src = './assets/trump_torso_angry_3.png';

        effect2_audio = new Audio('./assets/peach/impeachment_2.mp3');
        effect2_audio.volume = effect2_volume = 1;

        effect3_audio = new Audio('./assets/peach/impeachment_3.mp3');
        effect3_audio.volume = effect3_volume = 1;
        effect4_audio = new Audio('./assets/peach/impeachment_4.mp3');
        effect4_audio.volume = effect4_volume = 1;

        effect5_audio = new Audio('./assets/peach/impeachment_5.mp3');
        effect5_audio.volume = effect5_volume = 1;

        effect6_audio = new Audio('./assets/peach/impeachment_6.mp3');
        effect6_audio.volume = effect6_volume = 1;



        if (!preloaded) {
            load_audio();
        }


        setTimeout(function() {

            hatdance_audio = new Audio('./assets/hatdance.mp3');
            hatdance_audio.volume = hat_dance_volume = .9;

            img4 = new Image();
            img4.src = './assets/trump_torso_sombrero.png';

            img8bit = new Image();
            img8bit.src = "./assets/trump_torso_8bit.png";

            konami_pipe = new Audio('./assets/pipe.mp3');
            konami_jump = new Audio('./assets/jump.mp3');
            konami_start = new Audio('./assets/powerup.mp3');
            konami_pipe.volume = konami_jump.volume = konami_start.volume = konami_volume = .8;









        }, 4000);

    }, 0);

    setTimeout(function() {

        take_step();


    }, 2000);


}); // on ready