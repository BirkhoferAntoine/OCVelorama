class TimerHandler {
    constructor() {
        this.deadline = this.deadlineCheck();
        this.t = () => this.clock(this.deadline);
        this.timer = () => setInterval(this.t, 1000);

        this.ticketHandler = () => {
            return sessionStorage.getItem("ticket") === "hasTicket" ? this.timer() : document.getElementById("ticketInfo").style.visibility = "hidden";
        };
        this.ticketHandler();

        document.getElementById("cancelButton").addEventListener('click', (event) => {this.cancel()});

        document.getElementById("sendButton").addEventListener('click', (event) => {
            this.makeDeadline();
            this.ticketHandler();
            this.deadlineCheck();
            ticketInfo.style.visibility = "visible";
        });

        $("#reservation").click(function (event) {
            event.preventDefault();
            $("#ticketData").toggle("easing")
        });
    }

    makeDeadline() {
        this.newDeadline = new Date(Date.parse(new Date()) + 1200000);
        sessionStorage.setItem("time", this.newDeadline);
        sessionStorage.setItem("ticket", "hasTicket");
    }

    deadlineCheck() {
        this.deadline = sessionStorage.getItem("time");
        this.parsedLine = Date.parse(this.deadline);
        this.date = Date.parse(new Date());
        return (this.parsedLine - this.date) >= 0 ? this.deadline : 0;
    }

    clock(deadLine) {
        this.timeID = Date.parse(deadLine) - Date.parse(new Date());
        if (this.timeID === "0") {
            alert("Temps écoulé, votre réservation est annulée");
            sessionStorage.clear();
            ticketInfo.style.visibility = "hidden";
        }
        if (isNaN(this.timeID)) {
            ticketInfo.style.visibility = "hidden";
        }
        this.secondsSpan = document.getElementById("seconds");
        this.minutesSpan = document.getElementById("minutes");
        this.secondsSpan.textContent = Math.floor((this.timeID / 1000) % 60);
        this.minutesSpan.textContent = Math.floor((this.timeID / 1000 / 60) % 60);
    }

    cancel() {
    this.canc = confirm("Voulez vous annuler votre réservation ?");
    if (this.canc) {
        event.preventDefault();
        sessionStorage.clear();
        this.ticketHandler();
    }}
}

new TimerHandler();