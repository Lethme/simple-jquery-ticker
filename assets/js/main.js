import { Ticker } from './ticker.js';

$(() => {
    let ticker = new Ticker({
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia assumenda quis, vero ab quas expedita ipsum, laborum labore magnam repellat ratione iste fugiat? Sequi, unde. Fugiat id magnam minus eligendi.",
        selector: ".page .ticker-wrapper",
        textColor: "#95afc0",
        fontSize: "26px",
        tickTime: 100,
        tickSpeed: 3
    });

    $(window).on('load', () => {
        ticker.start();
    });
});