class Ticker {
    interval;
    #text;
    #selector;
    #textColor;
    #fontSize;
    #tickSpeed;
    #tickTime;
    #wrapper;
    #element;
    #position;

    constructor(options) {
        this.#text = options.text;
        this.#selector = options.selector;
        this.#textColor = options.textColor;
        this.#fontSize = options.fontSize;
        this.#tickSpeed = options.tickSpeed;
        this.#tickTime = options.tickTime;
        this.#wrapper = () => $(this.#selector);
        this.#element = () => $(this.#selector + ' .ticker');

        this.#position = 100;

        this.#wrapper().addClass('flex-column flex-justify-center pos-relative');
        this.#wrapper().append('<p class="ticker m-0 pos-absolute">' + this.#text + '</p>');
        this.#wrapper().append(`
            <div class="ticker-controls flex-row flex-justify-center flex-align-center pos-absolute t-2 l-50" style="transform: translateX(-50%);">
				<input type="text" class="form-control ticker-text">
				<input type="color" class="form-control ticker-text-color w-em-30 ml-10" title="Choose ticker color">
            </div>
			<div class="ticker-controls flex-row flex-justify-center flex-align-center pos-absolute b-2 l-50" style="transform: translateX(-50%);">
                <button type="button" class="ticker-toggle btn btn-dark mr-10">&#x23EF;</button>
				<button type="button" class="ticker-decrease-speed btn btn-dark mr-10">-</button>
                <h2 class="ticker-speed">` + this.#tickSpeed + `</h2>
                <button type="button" class="ticker-increase-speed btn btn-dark ml-10">+</button>
                <button type="button" class="ticker-stop btn btn-dark ml-10">&#x23F9</button>
            </div>
		`);

		$(this.#selector + ' .ticker-text').val(this.#text);
		$(this.#selector + ' .ticker-text-color').val(this.#textColor);

        $(window).on('load', () => {
            $(this.#selector + ' .ticker-decrease-speed').on('click', () => {
                if (this.#tickSpeed > 1) {
                    this.#tickSpeed--;
                    this.update();
                }
            })
            $(this.#selector + ' .ticker-increase-speed').on('click', () => {
                if (this.#tickSpeed < 20) {
                    this.#tickSpeed++;
                    this.update();
                }
            })
            $(this.#selector + ' .ticker-toggle').on('click', () => this.toggle());
            $(this.#selector + ' .ticker-stop').on('click', () => this.stop());
			$(this.#selector + ' .ticker-text').on('input', () => this.Text = $(this.#selector + ' .ticker-text').val())
			$(this.#selector + ' .ticker-text-color').on('input', () => this.TextColor = $(this.#selector + ' .ticker-text-color').val())
        });

        this.#wrapper().css('overflow', 'hidden');
        this.#wrapper().css('min-height', this.#element().height() * 2);

        this.#element().addClass('white-space-nowrap tr-linear-1');
        this.#element().css('color', this.#textColor);
        this.#element().css('font-size', this.#fontSize);

        this.#element().css('left', this.#position + "%");
    }

    get #MaxPosition() { return Math.round(this.#element().width() / this.#wrapper().width() * 100); }

    get Text() { return this.#text }
    set Text(t) {
        this.#text = t;
        this.#element().html(this.#text);
    }
    get TickSpeed() { return this.#tickSpeed }
    set TickSpeed(ts) { this.#tickSpeed = ts }
    get TickTime() { return this.#tickSpeed }
    set TickTime(tt) { this.#tickTime = tt }
    get TextColor() { return this.#textColor }
    set TextColor(tc) {
        this.#textColor = tc;
        this.update();
    }
    get Position() { return this.#position }
    set Position(pos) {
        if (this.#position < -this.#MaxPosition || pos >= 100) {
            this.#element().removeClass('tr-linear-1');
            this.#position = 100;
        } else {
            this.#element().addClass('tr-linear-1');
            this.#position = pos;
        }
        this.update();
    }
    get Selector() { return this.#selector }

    update() {
        this.#element().css('color', this.#textColor);
        this.#element().css('font-size', this.#fontSize);
        this.#element().css('left', this.#position + "%");
        $(this.#selector + ' .ticker-speed').html(this.#tickSpeed);
    }

    start() {
        this.interval = setInterval(() => {
            this.Position -= this.#tickSpeed;
        }, this.#tickTime);
    }

    pause() {
        this.interval = clearInterval(this.interval);
    }

    toggle() {
        if (this.interval !== undefined) this.pause();
        else this.start();
    }

    stop() {
        this.interval = clearInterval(this.interval);
        this.Position = 100;
    }
}

export { Ticker };