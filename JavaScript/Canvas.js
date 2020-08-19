class CanvasHandler {
    constructor() {
        this.prevX = 0;
        this.currX = 0;
        this.prevY = 0;
        this.currY = 0;
        this.flag = false;
        this.dot_flag = false;
        this.canvas = document.getElementById('myCanvas');
        this.ctx = this.canvas.getContext("2d");

        this.w = this.canvas.width;
        this.h = this.canvas.height;

        let is_touch_device = 'ontouchstart' in document.documentElement;
        if (is_touch_device) {
            this.canvas.addEventListener("touchmove", function (e) {
                event.preventDefault();
                CanvasHandler.getXY('move', e);
            }, false);
            this.canvas.addEventListener("touchstart", function (e) {
                CanvasHandler.getXY('down', e);
                sendButton.disabled = false;
            }, false);
            this.canvas.addEventListener("touchend", function (e) {
                CanvasHandler.getXY('up', e)
            }, false);

        } else {
            this.canvas.addEventListener("mousemove", function (e) {
                CanvasHandler.getXY('move', e)
            }, false);
            this.canvas.addEventListener("mousedown", function (e) {
                CanvasHandler.getXY('down', e);
                sendButton.disabled = false;
            }, false);
            this.canvas.addEventListener("mouseup", function (e) {
                CanvasHandler.getXY('up', e)
            }, false);
            this.canvas.addEventListener("mouseout", function (e) {
                CanvasHandler.getXY('out', e)
            }, false);
        }

        CanvasHandler.sign();
        CanvasHandler.getName();
        CanvasHandler.getStation();
        lname.value = localStorage.getItem("lastname");
        fname.value = localStorage.getItem("firstname");
        sendButton.addEventListener('click', (event) => {
            this.send()
        });
        deleteButton.addEventListener('click', (event) => {
            this.del()
        });
    };

    static getXY(res, e) {
		let context;
        if(!(context = myCanvas.getContext("2d")))
            console.log("pas de contexte récupéré");

        let is_touch_device = 'ontouchstart' in document.documentElement;
        if (res === 'down') {
            this.prevX = this.currX;
            this.prevY = this.currY;

            if (is_touch_device) {
                this.currX = e.targetTouches[0].pageX - myCanvas.offsetLeft;
                this.currY = e.targetTouches[0].pageY - myCanvas.offsetTop;
            } else {
                this.currX = e.clientX - myCanvas.getBoundingClientRect().left;
                this.currY = e.clientY - myCanvas.getBoundingClientRect().top;
            }

            this.flag = true;
            this.dot_flag = true;
            if (this.dot_flag) {
                context.beginPath();
                context.fillStyle = "black";
                context.fillRect(this.currX, this.currY, 2, 2);
                context.closePath();
                this.dot_flag = false;
            }
        }

        if (res === 'up' || res === "out") {
            this.flag = false;
        }

        if (res === 'move') {
            if (this.flag) {
                this.prevX = this.currX;
                this.prevY = this.currY;

                if (is_touch_device) {
                    this.currX = e.targetTouches[0].pageX - myCanvas.offsetLeft;
                    this.currY = e.targetTouches[0].pageY - myCanvas.offsetTop;
                } else {
                    this.currX = e.clientX - myCanvas.getBoundingClientRect().left;
                    this.currY = e.clientY - myCanvas.getBoundingClientRect().top;
                }
                CanvasHandler.draw();
            }
        }
    };

    static draw() {
        let context;
        if(!(context = myCanvas.getContext("2d")))
            console.log("pas de contexte récupéré");

        context.beginPath();
        context.moveTo(this.prevX, this.prevY);
        context.lineTo(this.currX, this.currY);
        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.stroke();
        context.closePath();
        }

    static sign() {
        return sessionStorage.signature === "" ? document.getElementById("ticketInfo").style.visibility = "hidden" : document.getElementById("canvasGet").src = sessionStorage.getItem("signature");
    }

    static getName() {
        return sessionStorage.name === "" ? document.getElementById("clientID").textContent = "Nom" : document.getElementById("clientID").textContent = sessionStorage.getItem("name");
    }

    static getStation() {
        return sessionStorage.station === "" ? document.getElementById("clientST").textContent = "Station" : document.getElementById("clientST").textContent = sessionStorage.getItem("station");
    }

    del() {
        this.ask = confirm("Voulez-vous tout effacer ?");
        if (this.ask) {
            this.ctx.clearRect(0, 0, this.w, this.h);
            sendButton.disabled = true;
            clientHelp.textContent = "Veuillez signer pour pouvoir valider votre commande";
        }
    }

    send() {
        sessionStorage.signature = this.canvas.toDataURL();
        document.getElementById("canvasGet").src = sessionStorage.signature;
        document.getElementById("ticketInfo").style.visibility = "visible";
        localStorage.setItem("lastname", document.getElementById("lname").value);
        localStorage.setItem("firstname", document.getElementById("fname").value);
        sessionStorage.setItem("name", localStorage.getItem("lastname") + " " + localStorage.getItem("firstname"));
        sessionStorage.setItem("station", document.getElementById("stationName").textContent);
        sessionStorage.setItem("ticket", "hasTicket");
        CanvasHandler.getName();
        CanvasHandler.getStation();
    }
};

new CanvasHandler();

