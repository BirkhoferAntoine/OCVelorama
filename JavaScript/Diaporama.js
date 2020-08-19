class Diap {
    constructor() {
        this.im = 0;
        this.images = ["Images/velotoulouse-electrique_070915_960_720.jpg", "Images/1487932688-884584414.jpg", "Images/image.jpg"];
        this.imgEle = document.getElementById("slideshow");
        this.texts = ["Séléctionnez votre station pour obtenir ses informations", "Appuyez sur réserver, signez, envoyez votre vélo vous attends!", "Votre réservation est valable 20 minutes et un décompte vous indique le temps restant"];
        this.txtEle = document.getElementById("figContent");

        this.refreshImg = () => {
            this.imgEle.src = this.images[this.im];
            this.txtEle.innerHTML = this.texts[this.im];
        };
        this.refreshImg();

        this.slideLeft = () => {
            if (this.im <= 0) {
                this.im = this.images.length - 1;
            } else {
                this.im--;
            }
            this.refreshImg();
            this.setTimer(true, false);
        };

        this.slideRight = () => {
            if (this.im >= this.images.length -1) {
                this.im = 0;
            } else {
                this.im++;
            }
            this.refreshImg();
            this.setTimer(true, false);
        };

        this.setTimer(true, false);

        this.restart = document.getElementById("restart");
        this.stop = document.getElementById("stop");
        this.restart.disabled = true;

        document.addEventListener("keydown", e => this.onKey(e) + this.refreshImg());
        document.getElementById("prev").addEventListener("click", ev => this.slideLeft());
        document.getElementById("next").addEventListener("click", ev => this.slideRight());
        this.stop.addEventListener("click", ev => this.setTimer(false, ev) + this.disabler(false, true));
        this.restart.addEventListener("click", ev => this.setTimer(ev, false) + this.disabler(true, false));
    }

    setTimer(start, stop) {
        if (start) {
            clearTimeout(this.timerLoop);
            this.timerLoop = setInterval(this.slideRight, 5000);
        } else if (stop) {
            clearTimeout(this.timerLoop);
        }
    }

    disabler(restarter, stoper) {
        if (restarter) {
            this.restart.disabled = true;
            this.stop.disabled = false;
        } else if (stoper) {
            this.restart.disabled = false;
            this.stop.disabled = true;
        }
    }

    onKey(eventKey) {
        if (eventKey.key === "ArrowLeft") {
            if (this.im <= 0) {
                this.im = this.images.length - 1;
            } else {
                this.im--;
            }
        }
        if (eventKey.key === "ArrowRight") {
            if (this.im >= this.images.length - 1) {
                this.im = 0;
            } else {
                this.im++;
            }
        }
    }
}

new Diap();

