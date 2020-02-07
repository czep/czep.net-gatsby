
// anim module
var Splash = (function() {

    var angle = 0;
    var timex;
    var fps = 30.0;
    var frame = 0;
    var angle_incr = 360.0 / fps;
    var timer_incr = 1000.0 / fps;
    var duration = 3.0 * fps;
    var counter = 5;

    var Div = $("#splash");

    function setup() {
        
        $("<div/>", {"class": "quadrant q1 dark"}).css("z-index", 1).appendTo(Div);
        $("<div/>", {"class": "quadrant q2 dark"}).css("z-index", 1).appendTo(Div);
        $("<div/>", {"class": "quadrant q3 dark"}).css("z-index", 1).appendTo(Div);
        $("<div/>", {"class": "quadrant q4 dark"}).css("z-index", 1).appendTo(Div);
        $("<div/>", {"class": "quadrant q1 light"}).css("z-index", 2).appendTo(Div);
        $("<div/>", {"class": "quadrant q2 light"}).css("z-index", 4).appendTo(Div);
        $("<div/>", {"class": "quadrant q3 light"}).css("z-index", 4).appendTo(Div);
        $("<div/>", {"class": "quadrant q4 light"}).css("z-index", 4).appendTo(Div);
        $("<div/>", {"class": "quadrant sweep"}).css("z-index", 3).appendTo(Div);

        $("<div/>", {"class": "circle"}).appendTo(Div);        
        $("<div/>", {"class": "crosshair"}).appendTo(Div);
        $("<div/>", {"class": "counter"}).html(counter).appendTo(Div);
        $("<div/>", {"class": "screen"}).appendTo(Div);

    }

    function sweep() {

        frame++;
        angle = (angle + angle_incr) % 360;
        //console.log('New angle: ' + angle);

        // set z-index based on which quadrant is being swept
        if (angle == 0) {
            counter--;
            $(".counter").html(counter);
            $(".quadrant.q1.dark").css("z-index", 1);
            $(".quadrant.q2.dark").css("z-index", 1);
            $(".quadrant.q3.dark").css("z-index", 1);
            $(".quadrant.q4.dark").css("z-index", 1);
            $(".quadrant.q1.light").css("z-index", 2);
            $(".quadrant.q2.light").css("z-index", 4);
            $(".quadrant.q3.light").css("z-index", 4);
            $(".quadrant.q4.light").css("z-index", 4);
        }
        else if (angle == 96) {
            $(".quadrant.q1.dark").css("z-index", 4);
            $(".quadrant.q2.light").css("z-index", 2);
        }
        else if (angle == 180) {
            $(".quadrant.q2.dark").css("z-index", 4);
            $(".quadrant.q3.light").css("z-index", 2);    
        }
        else if (angle == 276) {
            $(".quadrant.q3.dark").css("z-index", 4);
            $(".quadrant.q4.light").css("z-index", 2);    
        }

        var transform = 'rotate('+angle+'deg)';
            
        $('.sweep').css({
            '-webkit-transform':  transform,
            '-moz-transform':     transform,
            'transform':          transform
        });

        if (frame >= duration) {
            clearInterval(timex);
            $(".screen").css("background", "#010101");
        }
    }

    function run() {
        //console.log("Splash screen initialization.");
        setup();
        $('.sweep').show();
        timex = setInterval(sweep, timer_incr);
        //console.log("Splash scren has completed.");
    }

    // interface
    return {
        run: run
    };

})();



$( document ).ready(function() {
 
    Splash.run();
 
});
